<!--
 * @Description: 这是***页面
 * @Date: 2021-07-06 15:39:37
 * @Author: gaorongsheng
 * @LastEditors: mazexin
-->

# kz-helper（chrome 浏览器拓展）

- 该项目基于 Vue-cli、chrome-ext 等构建。
- 主要用途：chrome 浏览器拓展，提供各种小功能方便开发等。

## 如何使用

<!-- 一、安装加载介绍 -->

一、安装与使用

1. 可以从“右上角菜单（┇）->更多工具->扩展程序”可以进入 插件管理页面。也可以直接在地址栏输入 chrome://extensions 访问。
2. 把拓展压缩包 kz-helper-dist-.zip 拖进这个界面，即可加载安装。
3. 可以把扩展程序固定到浏览器地址栏右边，方便使用。亦可在网页中，通过鼠标右键菜单使用。

二、开发与调试

1. 安装依赖
   `yarn`
2. 本地运行
   `yarn dev`
3. 将根目录生成的 dist 文件夹，拖拽添加到浏览器扩展
4. 改动代码后，如有必要，在浏览器扩展程序页面，点击重新加载按钮

## 目录结构

```
src
  |-- dist 生成拓展压缩包、本地开发文件
  |-- src
    |-- background background页面，默认生成html（全局权限最高）
    |-- options 选项配置页面
    |-- popup 弹出页面，鼠标左键单击扩展程序图标时弹出
    |-- utils 工具函数
    |-- manifest.demo.json 浏览器拓展必备配置demo
    |-- manifest.production.json 浏览器拓展必备配置 生产环境
```

## 构建命令

- `yarn dev`
  本地开发 （把 src 文件编译、copy 到 dist 下，利用 hot-reload.js 实现浏览器自动更新）
- `yarn build`
  打包 生产 成 kz-helper-dist.zip 压缩包（可在浏览器本地加载使用或者发布 google 应用商店（https://chrome.google.com/webstore/developer/dashboard/）
  ）

---

<!-- ## 分支

- dev->开发环境
- test->测试环境
- master->正式环境

--- -->

<!-- ## jenkins 部署项目

- dev
- test
- master -->
