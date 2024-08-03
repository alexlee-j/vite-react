import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: "visualizer.html", // 分析图生成的文件名
    }) as any,
    viteCompression({
      algorithm: "gzip",
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {},
        additionalData: `@import "@/styles/global.less";`,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          echarts: ["echarts"],
          antd: ["antd"],
        },
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
});
