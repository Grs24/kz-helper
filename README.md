# kz-helper（chrome 浏览器拓展）

- 该项目基于 Vue-cli、chrome-ext 等构建。
- 主要用途：公司客户成功部同事等对客户进行数据统计、分析等的管理应用。

## Project Setup

一、安装加载介绍

- 1.从右上角菜单->更多工具->扩展程序可以进入 插件管理页面，也可以直接在地址栏输入 chrome://extensions 访问。
- 2.把拓展压缩包 kz-helper-dist-.zip 拖进这个界面，即可加载安装。
- 3.把拓展显示在顶部菜单栏，方便使用。

## Project Struct

```
src
	|-- dist 生成拓展压缩包、本地开发文件
	|-- src
    |-- background background页面，默认生成html（全局权限最高）
    |-- options 选项配置页面
    |-- popup 弹出页面
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
