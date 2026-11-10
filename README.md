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
all Markdown articles. No production environment variables are currently needed.
The runtime identity has no project-level data access roles.

Pushes to `main` deploy through `.github/workflows/deploy-google-cloud.yml`.
GitHub authenticates using Workload Identity Federation restricted to this
repository's numeric ID and `main` branch; no service-account key is stored.
The workflow builds an immutable commit-tagged image, deploys it, and checks the
homepage, blog index, and every article.

Manual deployment using an authenticated Google Cloud CLI:

```sh
gcloud run deploy hancheng-web --source=. --project=hancheng-melamine \
  --region=asia-southeast1 --port=8080 --memory=512Mi --cpu=1 \
  --min-instances=0 --max-instances=5 \
  --service-account=hancheng-web@hancheng-melamine.iam.gserviceaccount.com
```

Load balancer routing definitions are in `deploy/`. See
`deploy/MIGRATION.md` for DNS cutover and migration status.
