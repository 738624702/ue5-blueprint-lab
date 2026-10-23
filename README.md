# UE5 Blueprint Lab — 独立网站初始版

这是一个**普通静态网站**，由 `HTML + CSS + JavaScript` 组成。不使用 ChatGPT Sites、不依赖 ChatGPT 登录，也不调用任何 OpenAI API。

## 主要功能

- 独立首页（灵感：专业文档网站 + 清晰的教程目录；不复刻参考站品牌或内容）
- 课程列表，支持分类筛选和关键词搜索
- 5 节 UE5 入门课程：第一个 Actor 蓝图、人物移动、E 键开门、生命值、血条 UI
- 蓝图逻辑示意、逐步操作、参数表、常见错误、课程验收条件
- 浏览器本地保存步骤勾选进度 (`localStorage`)
- 手机与电脑响应式布局，页面不需要第三方依赖或后台服务器

注意：节点图是教学逻辑示意，不是 UE5 编辑器中的完整蓝图截图；教程内容适用于典型 UE5 蓝图项目，不同引擎版本的节点名称/菜单可能略有不同。

## 本地打开

解压文件，打开 `index.html` 即可浏览。或者运行 `python3 -m http.server 8080` 并打开 `http://localhost:8080`。教程链接都是相对路径，放在同一个目录即可运行。

## 手机上独立发布（GitHub + Vercel）

1. 用手机浏览器登录 GitHub： https://github.com/new ，创建 `ue5-blueprint-lab` 仓库。
2. 上传 `index.html`、`courses.html`、`lesson.html`、`style.css`、`data.js`、`app.js`、`favicon.svg` 到仓库根目录。上传的是解压后的文件，而不只是 ZIP 文件本身。
3. 登录 https://vercel.com/new ，连接自己的 GitHub 仓库并选择这个项目。
4. Framework Preset 可以选择 `Other`，没有构建命令；使用仓库根目录作为输出目录，部署。
5. 部署成功后会获得独立的 `*.vercel.app` URL，可以直接在安卓手机 Chrome 等浏览器打开。之后可以在 Vercel 的 Domains 设置绑定你购买的域名。

也可以发布在 Netlify / Cloudflare Pages / 其他静态托管平台，源码不会锁定到某家服务商。

## 后续开发请交给 Codex 的任务

请在当前 GitHub 仓库继续开发：
1. 保持它是独立部署的普通网站，不接入 ChatGPT Sites，不添加强制 GPT 登录。
2. 先检查现有静态页面并运行网站，避免重建项目或丢掉已有内容。
3. 加强教程：为每一步补充真实 UE5 蓝图节点截图、接口和逐引脚连接说明（图片素材需要用户提供或经授权制作）。
4. 增加模块：首页 / 新手基础 / 人物系统 / 交互系统 / UI 系统 / 系统策划拆解。
5. 增强课程导航、站内搜索、移动端适配与功能测试。
6. 每次开发完成后运行检查，提交到 GitHub；未获明确许可不要更新生产部署。

## 部署与 AI 的区别

Codex 可以用于**编写代码**，但访客打开本网站时完全不需要 GPT。若未来添加 AI 问答，那将是可选、单独实现的服务端功能；不得把 API Key 写入前端文件。
