// Lovable's wrapper already supplies TanStack Start, React, Tailwind, aliases,
// and Nitro. Do not register these Vite plugins a second time.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Keep Lovable's own sandbox configuration untouched.
const isLovableSandbox =
  process.env.LOVABLE_SANDBOX === "1" || !!process.env.DEV_SERVER__PROJECT_PATH;

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    // Nitro's Cloudflare module output is served at request time; avoid the
    // incompatible temporary prerender preview server in this preset.
    ...(!isLovableSandbox ? { prerender: { enabled: false } } : {}),
  },
  // Outside Lovable, explicitly enable Nitro: the wrapper may otherwise skip
  // Nitro entirely, leaving only an un-deployable client bundle.
  ...(!isLovableSandbox
    ? {
        nitro: {
          preset: "cloudflare-module",
          output: {
            dir: "dist",
            serverDir: "dist/server",
            publicDir: "dist/client",
          },
          cloudflare: { nodeCompat: true, deployConfig: true },
        },
      }
    : {}),
});
