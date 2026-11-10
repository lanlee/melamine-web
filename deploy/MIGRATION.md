# Google Cloud migration

Source: production commit `b7312bd86a3e046081d5a248c582cf62b6827a9b`.
All six articles and their assets are preserved.

## DNS preparation (GoDaddy)

Add these records first and keep them for automatic certificate renewal:

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `_acme-challenge` | `05aef02c-b786-4d9a-a8b8-6520b6ae0951.15.authorize.certificatemanager.goog` |
| CNAME | `_acme-challenge.www` | `a8bfb102-7913-4ec3-b2ca-7d0493ce9061.4.authorize.certificatemanager.goog` |

Wait for `hancheng-web-cert` to become ACTIVE:

```sh
gcloud certificate-manager certificates describe hancheng-web-cert \
  --project=hancheng-melamine --format='value(managed.state)'
```

Then verify HTTPS against the Google load balancer before changing traffic:

```sh
curl --fail --resolve www.hanchengmaterial.com:443:8.233.129.178 https://www.hanchengmaterial.com/
curl --head --resolve hanchengmaterial.com:443:8.233.129.178 https://hanchengmaterial.com/blog
```

## Cutover

Replace the web records only, keeping mail, verification, and unrelated records:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `8.233.129.178` |
| A | `www` | `8.233.129.178` |

Remove the old www CNAME when adding the www A record, and any old A/AAAA records
for these two web hostnames. Use a 600-second TTL if available.

Verify public DNS, HTTPS, redirects, home page, all blog articles, assets,
robots.txt, and sitemap.xml. Keep the old deployment available through the old
DNS TTL so clients with cached DNS continue to work.

## Retirement

After the cutover is verified, delete only the old `melamine-web` project
(`prj_U8C3qgInIu0Q0E1P6Z83tVdM5KSD`) from the `lanli-projects` Vercel team,
including its deployments, custom domain associations, and Git deployment link.
Other projects in that account are outside this migration's scope.
Remove local `.vercel` metadata after retirement. Framework-internal packages
such as Next.js's bundled file tracer do not require Vercel hosting.

Rollback before retirement: restore the former `@` A record `216.198.79.1`
and `www` CNAME `7cbfee289b65a38a.vercel-dns-017.com`.

## Status

Cloud Run is deployed at https://hancheng-web-koh3rlnupq-as.a.run.app.
The homepage, blog index, all six articles, public assets, JavaScript, and CSS
returned HTTP 200. The global load balancer's HTTP redirect returned HTTP 301
and preserved the request path and query. The HTTPS URL map passed validation.
Lint passed with five pre-existing image optimization warnings.

The Vercel Git integration has been disconnected. Its existing production
deployment currently responds with HTTP 402 / DEPLOYMENT_DISABLED.
The Google Cloud copy is available at the URL above.

The certificate is ACTIVE for both hostnames. Its two DNS validation CNAMEs
are present in GoDaddy and must remain for renewal. A Cloud Build check against
the reserved load balancer IP verified valid HTTPS, HTTP 200 for the homepage
and an article, and the apex-to-www HTTP 301 redirect with path/query preserved.
Verification build: `de363b60-0096-4282-b914-a3ef9a0bb414`.
GitHub deployment run `42773900126` passed authentication, build, deploy, and
all page checks; Cloud Run revision `hancheng-web-00002-c5j` serves that build.

Migration completed on 2026-11-10. Both apex and www A records resolve to
`8.233.129.178`; the public HTTPS site returns HTTP 200 from Google Frontend.
The old Vercel project was deleted (HTTP 204), and a subsequent lookup confirmed
HTTP 404. Local `.vercel` metadata was removed. The old Vercel rollback described
above is no longer available; use Cloud Run revision rollback instead.
Browser automation was unavailable; verification used HTTP checks and Google
Cloud service/log checks.
