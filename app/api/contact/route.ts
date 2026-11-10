import { createHash } from "node:crypto";

const SALES_EMAIL = "sales@hanchengmaterial.com";
const MAX_BYTES = 12_000;
const WINDOW_MS = 60 * 60 * 1000;
// Best-effort per-instance limits; no visitor addresses are retained here.
const attempts = new Map<string, { count: number; expires: number }>();
let total = { count: 0, expires: 0 };

function error(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigins = new Set([
    "https://hanchengmaterial.com",
    "https://www.hanchengmaterial.com",
    "https://hancheng-web-koh3rlnupq-as.a.run.app",
    "https://hancheng-web-327627621427.asia-southeast1.run.app",
  ]);
  if (process.env.NODE_ENV !== "production") allowedOrigins.add("http://localhost:3000");
  if (!origin || !allowedOrigins.has(origin)) return error("Invalid origin", 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return error("Expected JSON", 415);
  }

  let data: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) return error("Missing form data", 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) {
        await reader.cancel();
        return error("Message is too large", 413);
      }
      chunks.push(value);
    }
    data = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!data || typeof data !== "object" || Array.isArray(data)) return error("Invalid form data", 400);
  } catch {
    return error("Invalid form data", 400);
  }

  if (data.website) return error("Unable to submit this inquiry", 400);
  const limits = { name: 100, company: 200, email: 254, country: 100, product: 500, message: 4000 };
  const fields: Record<string, string> = {};
  for (const [key, limit] of Object.entries(limits)) {
    const value = data[key];
    if (typeof value !== "string" || value.trim().length > limit || (key !== "message" && !value.trim())) {
      return error("Please check the form fields", 400);
    }
    fields[key] = value.trim();
    if (key !== "message" && /[\r\n\u0000]/.test(fields[key])) return error("Invalid field value", 400);
  }
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fields.email)) return error("Invalid email address", 400);

  const now = Date.now();
  for (const [key, entry] of attempts) if (entry.expires <= now) attempts.delete(key);
  const emailKey = createHash("sha256").update(fields.email.toLowerCase()).digest("hex");
  const entry = attempts.get(emailKey) ?? { count: 0, expires: now + WINDOW_MS };
  if (total.expires <= now) total = { count: 0, expires: now + WINDOW_MS };
  if (entry.count >= 5 || total.count >= 50) {
    return Response.json({ error: "Too many inquiries. Please email sales directly." }, {
      status: 429, headers: { "Retry-After": "3600" },
    });
  }
  entry.count++;
  total.count++;
  attempts.set(emailKey, entry);

  try {
    const config = JSON.parse(process.env.MICROSOFT_MAIL_CONFIG || "{}");
    if (!config.tenantId || !config.clientId || !config.clientSecret) {
      console.error("Contact email configuration is missing");
      return error("Email is temporarily unavailable", 503);
    }
    const tokenResponse = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(config.tenantId)}/oauth2/v2.0/token`, {
      method: "POST",
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!tokenResponse.ok) throw new Error(`Email authentication failed (${tokenResponse.status})`);
    const token = await tokenResponse.json();
    if (typeof token.access_token !== "string") throw new Error("Missing email access token");

    const response = await fetch(`https://graph.microsoft.com/v1.0/users/${SALES_EMAIL}/sendMail`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token.access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: {
          subject: `Website inquiry: ${fields.company}`,
          body: {
            contentType: "Text",
            content: [
              "New inquiry from the HanCheng Material website", "",
              `Name: ${fields.name}`, `Company: ${fields.company}`,
              `Email: ${fields.email}`, `Country: ${fields.country}`,
              `Product & quantity: ${fields.product}`, "", "Message:", fields.message || "(No additional message)",
            ].join("\n"),
          },
          toRecipients: [{ emailAddress: { address: SALES_EMAIL } }],
          replyTo: [{ emailAddress: { address: fields.email, name: fields.name } }],
        },
        saveToSentItems: true,
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (response.status !== 202) throw new Error(`Email submission failed (${response.status})`);
    return Response.json({ ok: true });
  } catch (cause) {
    // Do not log credentials, provider response bodies, or visitor details.
    console.error("Contact email failed", cause instanceof Error ? cause.name : "UnknownError");
    return error("Unable to send your inquiry. Please email sales directly.", 502);
  }
}
