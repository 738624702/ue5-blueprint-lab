# UE5 Blueprint Lab — 独立网站 v0.2

纯静态 HTML/CSS/JavaScript，**独立于 ChatGPT** 运行，部署到 Vercel 或其他静态托管服务后，访客不需要 GPT 登录。不使用任何第三方 JS 包或密钥。

## 本次升级

- 课程从 5 节扩展为 **8 节**。人物系统形成连续路线：角色移动 → 第三人称摄像机 → 跳跃 → 按住 Shift 奔跑 → 生命值。
- **每一节课都能在安卓手机上做交互式逻辑模拟**：点击 BeginPlay、调整输入轴、滑动镜头距离、测试跳跃状态和奔跑速度、扣血、调整血条、验证开门前置条件。
- 每节课新增一道可即时判分的自测题。
- 首页增加「继续学习」面板，读取当前浏览器中的学习进度。
- 保留原来的 `blueprintlab:v1:<课程 ID>` 本地进度键，新版本不会因升级清空已有的勾选记录。
- 为 CSS/JS 加载添加 `?v=2` 查询参数，降低网站升级后旧缓存滞留的风险。

**重要**：网页的逻辑实验台是 **教学概念模拟，不是真实 UE5 引擎运行**。实际蓝图步骤仍需要在 Windows PC 上的 UE5 项目中搭建及测试。教学逻辑示意图也不是 UE5 编辑器的节点截图。

## 文件结构

全部放在仓库根目录：

```
index.html
courses.html
lesson.html
style.css
data.js
app.js
lab.js
favicon.svg
README.md
```

## 更新已部署的网站

1. **备份当前 GitHub 仓库**或至少保留之前的源码 ZIP。
2. 将本 ZIP 解压后的 **9 个文件**复制到原来的 `ue5-blueprint-lab` 仓库**根目录**，替换已有的同名文件。`lab.js` 是新增文件。不要只上传 ZIP，也不要多套一层目录。
3. 提交到 `main` 分支。若 Vercel 已连接该仓库，新的提交一般会自动触发生产部署。浏览器不需要再次创建 Vercel 项目。
4. 在 Vercel Dashboard → Deployments 查看是否 Ready，打开原来的 `.vercel.app` 域名即可查看最新版本。

**安卓手机更新提醒**：GitHub 网页端的 `Add file → Upload files` 可以批量添加文件，但如果同名文件替换受限，可以在 `github.dev` 在线编辑器中打开仓库上传并逐一确认替换，或通过 GitHub 的应用连接功能更新仓库。**不要删除仓库或重建 Vercel 项目。**

## 本地验证

- Windows/Mac/Linux 浏览器直接打开 `index.html` 可以看到内容。
- 更建议在本目录启动 `python -m http.server 8080` 后在浏览器访问 `http://localhost:8080`。
- 测试教程路由：`lesson.html?id=character-sprint`、`lesson.html?id=health-variables`。
- 课程数据全部在 `data.js`；互动演示和自测题在 `lab.js`；页面渲染在 `app.js`。

## 后续方向

- 把每节教程补齐 UE5 实际蓝图节点截图与逐引脚连接图；素材必须是自己绘制或有权使用的资源。
- 添加基于 Paper2D 的 2D 横版人物系统，逐步衔接十二生肖像素 Demo。
- 为课程加入学习笔记的导出与导入，解决换手机时本地进度不自动同步的问题。

## 开发原则

保留静态独立网站，不将 ChatGPT Sites 或 GPT 登录作为运行依赖。只有在后续明确要求添加 AI 教学问答时，才另行设计安全的后端服务，不得把 API Key 存进前端脚本。
