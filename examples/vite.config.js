import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [visualizer()],
  server: {
    port: 3000,
    open: true,
    cors: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
  },
  publicDir: "public",
  assetsInclude: [
    "**/*.skel",
    "**/*.atlas.txt",
    "**/*.atlas",
    "**/*.png",
    "**/*.jpg",
    "**/*.jpeg",
  ],
});
