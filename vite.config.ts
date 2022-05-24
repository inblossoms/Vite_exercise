import { defineConfig, normalizePath } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer'; // PostCss
import windi from 'vite-plugin-windicss'; // css 原子化
import viteEslint from 'vite-plugin-eslint';
import viteStylelint from '@amatlash/vite-plugin-stylelint';
import svgr from 'vite-plugin-svgr';

const variablePath = normalizePath(path.resolve('./src/variable.scss'));

// https://vitejs.dev/config/
export default defineConfig({
  // 手动指定项目根目录位置
  // root: path.join(__dirname, "src"),
  plugins: [
    react(
      {
        babel: {
          // 加入 babel 插件
          // 以下插件包都需要提前安装
          // 当然，通过这个配置你也可以添加其它的 Babel 插件
          plugins: [
            // 适配 styled-component
            'babel-plugin-styled-components',
            // 适配 emotion
            '@emotion/babel-plugin'
          ]
        },
        // 注意: 对于 emotion，需要单独加上这个配置
        // 通过 `@emotion/react` 包编译 emotion 中的特殊 jsx 语法
        jsxImportSource: '@emotion/react'
      } // Css in Js
    ),
    windi(), // Css 原子化框架
    viteEslint(),
    viteStylelint({
      exclude: /windicss|node_modules/
    }),
    svgr()
  ],

  // scss 相关配置
  css: {
    preprocessorOptions: {
      // 进行 PostCSS 配置
      postcss: {
        plugins: [
          autoprefixer({
            // 指定目标浏览器
            overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
          })
        ]
      },
      // 配置 CSS Modules 功能
      modules: {
        // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
        // 其中，name 表示当前文件名，local 表示类名
        generateScopedName: '[header]__[index.modules.scss]___[hash:base64:5]'
      },
      // 全局scss文件路径
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    }
  },
  resolve: {
    alias: {
      '@assets': path.join(__dirname, 'src/assets')
    }
  },
  assetsInclude: ['mp4', 'mp3', '.gitf'] // vite 对常见资源进行了内部支持，通过配置将类型文件当做一个 ES 模块进行加载
});
