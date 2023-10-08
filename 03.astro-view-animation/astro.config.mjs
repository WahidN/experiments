import nodejs from "@astrojs/node";
import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  adapter: nodejs({
    mode: "middleware", // or 'standalone'
  }),
  output: "hybrid",
});