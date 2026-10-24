# Deploy Ashni Optometrists to Cloudflare Workers

Production domain: `ashnioptometrists.com` (registered with Spaceship).
Source: `nkabi-ende/ashnioptometrists` (private GitHub repo, synced from Lovable).

> **Production gate:** This branch is a deployment configuration proposal, not an approved site launch. The code last reviewed on 24 October 2026 is still a client-presentation preview (old logo, placeholder contact information, WhatsApp previews and draft privacy/terms). Update these before enabling the custom domain.

## Cloudflare Workers Git deployment

1. Cloudflare Dashboard → **Workers & Pages** → **Create application** → **GitHub**. Authorize the private `nkabi-ende/ashnioptometrists` repository.
2. Set Worker name to **ashnioptometrists** (must match `wrangler.jsonc`) and select the release branch. Use Node.js 22 and Bun for this repo's `bun.lock`.
3. Install/build with `bun install --frozen-lockfile && bun run build`. Deploy with `npx --yes wrangler@latest deploy --config wrangler.jsonc`.
4. Verify the Workers preview URL *before* pointing the domain: check direct loads of `/`, `/eye-care`, `/shop`, `/lenses`, `/about` and `/contact`; test mobile navigation, asset loading and WhatsApp actions. Check logs for SSR 500 responses.
5. Once approved, set the production branch to the reviewed release branch or merge this branch into the selected production branch and deploy.

## DNS and domain

1. Cloudflare → **Add domain** → `ashnioptometrists.com` → Free plan; note the **two nameservers Cloudflare assigns to this specific zone**.
2. Spaceship → **Advanced DNS** → `ashnioptometrists.com` → **Nameservers / Change** → **Custom nameservers**; enter exactly those Cloudflare values and save.
3. Confirm Cloudflare shows the domain as **Active**, then open the Worker → **Settings** → **Domains & Routes** → **Add** → **Custom Domain** and enter `ashnioptometrists.com`. Add `www.ashnioptometrists.com` separately and configure a single canonical redirect.
4. Preserve any existing email MX, SPF, DKIM, DMARC and other required DNS records when changing nameservers. Do not guess Cloudflare's assigned nameservers or manually point an A record at an arbitrary IP.
5. Verify HTTPS, canonical host, metadata, sitemap/robots, and Google Business Profile link after domain cutover.

## Notes

- This is a **TanStack Start SSR** app, not a static Pages export. Deploy both the generated server bundle and assets via **Cloudflare Workers**.
- Do not commit Cloudflare API tokens or personal registrar credentials.
- Leave Lovable previews available; GitHub remains the source of truth after sync.
- If the standalone build disagrees with these paths, inspect generated `.output/server/wrangler.json` and Workers logs, then adjust this configuration before production launch.

References: https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/ and https://www.spaceship.com/knowledgebase/connect-domain-custom-nameservers/
