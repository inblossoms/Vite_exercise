import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  // 开启 attributify 属性化（用props的方式去定义样式属性）
  attributify: true,
  // shortcuts 用来封装一系列的原子化能力，尤其是一些常见的类名集合
  shortcuts: {
    "flex-c": "flex justify-center items-center",
  },
});
