/**
 * cypress自身使用的ts-node配置有问题
 * 这个文件暂时只能用js作为后缀
 */
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
