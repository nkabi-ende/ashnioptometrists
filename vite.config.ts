// Lovable's wrapper already registers TanStack Start, React, Tailwind and Nitro.
// Do not add duplicate Vite plugins or replace the Lovable development setup.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Keep Lovable's hosted editor/preview configuration unchanged. Explicitly
// build the standalone GitHub release for Cloudflare Workers via Nitro.
const isLovableSandbox =
  process.env.LOVABLE_SANDBOX === "1" ||
  Boolean(process.env.DEV_SERVER__PROJECT_PATH);

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  ...(isLovableSandbox
    ? {}
    : {
        nitro: {
          preset: "cloudflare-module",
          output: {
            dir: ".output",
            serverDir: ".output/server",
            publicDir: ".output/public",
          },
          cloudflare: {
            nodeCompat: true,
            deployConfig: true,
          },
        },
      }),
});
