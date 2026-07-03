# Blood of Dawnwalker 攻略站 GitHub 部署包

这是一个可直接部署到 GitHub Pages 的静态站点包，已包含 GSC 所需的 `sitemap.xml` 和 `robots.txt`。

## 文件说明

- `index.html`：攻略站首页
- `styles.css`：页面样式
- `app.js`：攻略搜索、筛选、清单本地保存
- `sitemap.xml`：Google Search Console 可提交的站点地图
- `robots.txt`：搜索引擎抓取规则，已声明 sitemap
- `404.html`：GitHub Pages 404 页面
- `.nojekyll`：避免 GitHub Pages 使用 Jekyll 处理静态文件
- `site.webmanifest`：基础 Web App 元信息
- `configure-site-url.ps1`：替换正式站点 URL 的脚本

## 部署到 GitHub Pages

1. 新建 GitHub 仓库，例如 `blood-dawnwalker-guide`。
2. 上传本包内所有文件到仓库根目录。
3. 进入仓库 `Settings` -> `Pages`。
4. `Build and deployment` 选择 `Deploy from a branch`。
5. Branch 选择 `main` 和 `/root`，保存。
6. 等待 GitHub Pages 生成站点。

如果仓库名为 `blood-dawnwalker-guide`，默认 URL 通常是：

```text
https://YOUR_GITHUB_USERNAME.github.io/blood-dawnwalker-guide/
```

## 上线前替换站点 URL

在 PowerShell 中进入本目录，执行：

```powershell
.\configure-site-url.ps1 -SiteUrl "https://你的用户名.github.io/blood-dawnwalker-guide"
```

如果你绑定了自定义域名，例如：

```powershell
.\configure-site-url.ps1 -SiteUrl "https://example.com"
```

脚本会同步更新：

- `index.html` 的 canonical、Open Graph URL、结构化数据
- `sitemap.xml` 的页面 URL
- `robots.txt` 的 sitemap 地址

## GSC 提交流程

1. 打开 Google Search Console。
2. 添加网址前缀资源，填写你的 GitHub Pages URL 或自定义域名。
3. 按 GSC 指引完成验证。
4. 进入 `站点地图`，提交：

```text
sitemap.xml
```

完整 sitemap 地址示例：

```text
https://你的用户名.github.io/blood-dawnwalker-guide/sitemap.xml
```

## 内容说明

The Blood of Dawnwalker 目前仍属于发售前阶段，本站把未实测内容标注为“待实测 / 待公布 / 框架”，避免误导玩家。后续可继续扩展任务页、Boss 页、构筑页、地图页，并把它们加入 sitemap。
