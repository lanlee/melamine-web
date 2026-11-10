import assert from "node:assert/strict";
import { test } from "node:test";
import { POST } from "../app/api/contact/route.ts";

const valid = {
  name: "Test Buyer", company: "Test Company", email: "buyer@example.com",
  country: "Singapore", product: "Melamine 20 MT", message: "Please send a quote.", website: "",
};
function request(data = valid, origin = "https://www.hanchengmaterial.com") {
  return new Request("https://www.hanchengmaterial.com/api/contact", {
    method: "POST", headers: { "Content-Type": "application/json", Origin: origin },
    body: JSON.stringify(data),
  });
}

test("contact submission validation and delivery", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalConfig = process.env.MICROSOFT_MAIL_CONFIG;
  process.env.MICROSOFT_MAIL_CONFIG = JSON.stringify({ tenantId: "tenant", clientId: "client", clientSecret: "secret" });
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return url.includes("/token")
      ? Response.json({ access_token: "test-token" })
      : new Response(null, { status: 202 });
  };
  t.after(() => {
    globalThis.fetch = originalFetch;
    if (originalConfig === undefined) delete process.env.MICROSOFT_MAIL_CONFIG;
    else process.env.MICROSOFT_MAIL_CONFIG = originalConfig;
  });

  await t.test("rejects invalid, cross-origin, oversized and honeypot requests without sending", async () => {
    for (const body of [null, [], { ...valid, name: "" }, { ...valid, email: "invalid" }, { ...valid, company: "Header\r\ninjection" }, { ...valid, website: "spam" }]) {
      assert.equal((await POST(request(body))).status, 400);
    }
    assert.equal((await POST(request(valid, "https://unrelated.example"))).status, 403);
    assert.equal((await POST(request({ ...valid, message: "x".repeat(13000) }))).status, 413);
    assert.equal(calls.length, 0);
  });

  await t.test("sends only to sales and uses the visitor as Reply-To", async () => {
    const response = await POST(request({ ...valid, to: "attacker@example.com", message: "<script>text only</script>" }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(calls.length, 2);
    const payload = JSON.parse(calls[1].options.body);
    assert.deepEqual(payload.message.toRecipients, [{ emailAddress: { address: "sales@hanchengmaterial.com" } }]);
    assert.equal(payload.message.replyTo[0].emailAddress.address, valid.email);
    assert.equal(payload.message.body.contentType, "Text");
    assert.match(payload.message.body.content, /Melamine 20 MT/);
    assert.match(payload.message.body.content, /<script>text only<\/script>/);
  });

  await t.test("does not report success when the email provider rejects delivery", async () => {
    const successFetch = globalThis.fetch;
    globalThis.fetch = async (url) => url.includes("/token")
      ? Response.json({ access_token: "test-token" })
      : new Response(null, { status: 403 });
    const response = await POST(request({ ...valid, email: "failure@example.com" }));
    assert.equal(response.status, 502);
    assert.equal((await response.json()).ok, undefined);
    globalThis.fetch = successFetch;
  });

  await t.test("fails safely when credentials are missing", async () => {
    const config = process.env.MICROSOFT_MAIL_CONFIG;
    delete process.env.MICROSOFT_MAIL_CONFIG;
    const before = calls.length;
    assert.equal((await POST(request({ ...valid, email: "missing@example.com" }))).status, 503);
    assert.equal(calls.length, before);
    process.env.MICROSOFT_MAIL_CONFIG = config;
  });

  await t.test("limits repeat inquiries without sending the excess request", async () => {
    for (let i = 0; i < 5; i++) assert.equal((await POST(request({ ...valid, email: "repeated@example.com" }))).status, 200);
    const before = calls.length;
    assert.equal((await POST(request({ ...valid, email: "repeated@example.com" }))).status, 429);
    assert.equal(calls.length, before);
  });
});
