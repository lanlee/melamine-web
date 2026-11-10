# HanCheng Material website

Next.js website for https://www.hanchengmaterial.com, including articles in
`content/blog`. Requires Node.js 24 and npm.

## Development

```sh
npm ci
npm run dev
```

## Google Cloud hosting

- Project: `hancheng-melamine`
- Cloud Run service: `hancheng-web`, region `asia-southeast1`
- Runtime service account: `hancheng-web@hancheng-melamine.iam.gserviceaccount.com`
- Global load balancer address: `8.233.129.178` (`hancheng-web-ip`)
- HTTPS certificate: `hancheng-web-cert` in Certificate Manager
- Certificate map: `hancheng-web-map`
- Canonical hostname: `www.hanchengmaterial.com`; apex and HTTP redirect to HTTPS www.

The Dockerfile builds Next.js standalone output and includes public assets and
all Markdown articles. Contact inquiries use the existing Microsoft 365 sales
mailbox through Microsoft Graph. `MICROSOFT_MAIL_CONFIG` is injected from Google
Secret Manager's `hancheng-web-mail` secret; it is never included in the image or
GitHub. The runtime identity can access only that secret and has no project-level
data access roles.

Pushes to `main` deploy through `.github/workflows/deploy-google-cloud.yml`.
GitHub authenticates using Workload Identity Federation restricted to this
repository's numeric ID and `main` branch; no service-account key is stored.
The workflow builds an immutable commit-tagged image, deploys it, and checks the
homepage, blog index, and every article.

## Contact form

`POST /api/contact` validates and bounds input, sends plain-text inquiries only to
`sales@hanchengmaterial.com`, and sets the visitor's address as Reply-To. Success
is returned only after Microsoft accepts the message. Failed submissions keep
the visitor's entered fields and offer a direct email link.

The form includes a honeypot, origin checks, and per-instance limits of five
attempts per email and fifty total per hour. These are basic abuse controls, not
a distributed rate limiter; limits reset with instances and scale across them.
No visitor form contents or provider credentials are written to application logs.

Run `npm test` with Node.js 24 to check validation, delivery failure handling,
fixed-recipient behavior, Reply-To, and rate limiting. The Docker build also runs
these tests before building the application. Tests do not send real mail.

Manual deployment using an authenticated Google Cloud CLI:

```sh
gcloud run deploy hancheng-web --source=. --project=hancheng-melamine \
  --region=asia-southeast1 --port=8080 --memory=512Mi --cpu=1 \
  --min-instances=0 --max-instances=5 \
  --service-account=hancheng-web@hancheng-melamine.iam.gserviceaccount.com
```

Load balancer routing definitions are in `deploy/`. See
`deploy/MIGRATION.md` for DNS cutover and migration status.
