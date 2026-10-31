# 锦绣陕西 · 陕西文化数字图志

一个纯静态的陕西文化导览网站：以真实地理底图为骨架，把**风景、民俗、美食**三类内容按经纬度放回地图上，中英双语，无需后端，双击即可运行。

> 在线访问：部署完成后为 `https://chengjingxuan2007.github.io/jinxiu-shaanxi-site/`

---

## 一、站点结构

| 页面 | 文件 | 内容 |
| --- | --- | --- |
| 登录（首页） | `index.html` | 账号登录、游客模式进入 |
| 注册 | `register.html` | 创建账号（用户名 + 不少于 8 位密码） |
| 主页 | `main.html` | 形象视频、全域概览、城市缩影地图 |
| 探索陕西 | `portal.html` | 3D 旋转展厅，进入各板块 |
| 特色风景 | `scenic.html` | 24 处风景，按城市索引 |
| 民俗文化 | `culture.html` | 31 项非遗、AI 漫剧、宣传海报、时光轴 |
| 特色美食 | `food.html` | 30 道地方风味，部分附制作视频 |

## 二、核心特性

- **真实地图**：OpenLayers 10 渲染，底图接天地图 WMTS（影像 / 矢量 / 地形三种可切换），并按真实经纬度标注 10 市 + 城固县。
- **省域聚焦**：用陕西省行政边界做遮罩，省外区域不再显示，只留陕西轮廓与金色省界。
- **条目级定位**：点开任意一处景点 / 非遗 / 美食，地图会自动飞到它的位置并打上红色定位点；关闭面板自动回到全省视野。共收录 85 个定位点。
- **点击城市跳转**：地图上的城市光点与右上角下拉菜单都能直接打开对应城市。
- **双语切换**：右上角 `EN / 中`，全站文案、菜单、地图标签同步切换。
- **全站搜索**：按城市、风景、非遗、美食检索，直达详情。
- **响应式**：1100 / 900 / 800 / 700 / 650 / 560 / 480 多档断点，适配手机、平板与桌面。

## 三、技术栈

- 原生 HTML + CSS + JavaScript 静态站点，无框架、无构建步骤
- [OpenLayers 10](https://openlayers.org/)（本地 `vendor/ol/`，不依赖 CDN）
- 天地图瓦片服务（需联网；密钥在 `js/map.js`）
- 登录 / 注册对接 Django 后端（`backend/jiuxiu_shannxi`，MySQL + JWT）

## 四、本地运行

1. 先启动后端（提供登录、注册接口）：

```bash
cd backend/jiuxiu_shannxi
python manage.py runserver 127.0.0.1:8000
```

> 数据库口令通过环境变量 `SX_DB_PASSWORD` 传入，仓库中不保存明文密码。

2. 再启动前端静态服务（推荐，避免个别浏览器对本地文件的限制）：

```bash
cd 锦绣陕西前端
python -m http.server 8140
# 浏览器打开 http://127.0.0.1:8140
```

不启动后端时，登录页仍可用「游客模式进入」浏览全部内容。

## 五、目录说明

```
├─ index.html（登录）/ register.html / main.html / portal.html / scenic.html / culture.html / food.html
├─ css/          common.css 全站通用；其余按页面拆分
├─ js/           data.js（内容仓库）、map.js（地图模块）、auth.js（登录注册）、其余按页面拆分
├─ vendor/       ol/（OpenLayers 库）、geo/（陕西省行政边界数据）
├─ backend/      Django 后端（jiuxiu_shannxi：登录 / 注册接口，MySQL + JWT）
├─ image/        图片素材
├─ video/        视频素材
└─ 使用教程.txt   面向非技术同学的操作说明
```

## 六、内容维护

- 文字、图片路径、条目增删：改 `js/data.js`
- 条目地图定位：`js/data.js` 里的 `D.geo`（`[经度, 纬度]`）
- 地图底图与密钥：`js/map.js` 顶部 `CONFIG`

```js
const CONFIG = {
  token: '你的天地图密钥',   // 留空则使用备用路网底图
  layer: 'vec',              // img 影像 | vec 矢量 | ter 地形
  bounds: [105.35, 31.55, 111.35, 39.75]
};
```

## 七、部署

本站是纯静态站点，可直接托管在 GitHub Pages：仓库 `Settings → Pages → Deploy from a branch → main / (root)`，约 1 分钟后生效。

## 八、说明

- 地图瓦片来自天地图，查看地图需要联网；其余内容均为本地静态资源。
- 图片与视频素材由项目组提供，仅用于本项目展示。
- 浏览器端地图密钥会随代码公开，属天地图的正常机制；如需限制可配置域名白名单。
