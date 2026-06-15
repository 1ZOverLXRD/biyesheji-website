# biyesheji-website learnings

- 本次仅做脚手架补充：根目录已有 package.json 与部分源码，保留原文件不做覆盖。
- 前端新增/补齐：index.html、	sconfig.json、	sconfig.build.json；同时调整 src/main.ts 的字体引入与全局样式入口。
- 后端新增独立 ackend/ 工程：package.json、	sconfig.json、src/index.ts、.gitignore、.env.example。
- 两端均按最小可用原则搭建，不做业务逻辑与额外 CSS/组件扩展。
- 依赖安装：前端 
pm install，后端独立 
pm install。
- 约束：不引入 Docker 配置，不覆盖已有 package.json，路由使用 vue-router v4。
