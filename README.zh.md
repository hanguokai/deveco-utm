# DEVECO UTM Link Copier — Chrome Extension

一个轻量级 Chrome 扩展，帮助 DEVECO / GDE 社区成员快速复制带有 UTM 追踪参数的页面链接。

## 功能简介

- **右键菜单（Context Menu）**：在任意页面右键，选择 **Copy UTM Link (DEVECO)**，将当前页面 URL 附加 UTM 参数后复制到剪切板，并通过系统通知提示复制成功。
- **扩展弹窗（Popup）**：点击工具栏中的扩展图标，弹窗实时预览带 UTM 的完整链接，点击按钮一键复制。

### 追加的 UTM 参数

```
utm_campaign=DEVECO_GDEMembers
utm_source=deveco
```

最终链接示例：

```
https://example.com/page?utm_campaign=DEVECO_GDEMembers&utm_source=deveco
```

> 若原始 URL 已包含同名参数，扩展不会重复添加。

---

## 项目结构

```
deveco-utm/
├── README.md
└── src/
    ├── manifest.json      # 扩展清单（Manifest V3）
    ├── background.js      # Service Worker：右键菜单注册与复制逻辑
    ├── popup.html         # 弹窗页面
    ├── popup.js           # 弹窗交互逻辑
    └── icons/
        ├── icon48.png
        └── icon128.png
```

---

## 安装方式（开发者模式）

1. 打开 Chrome，进入 `chrome://extensions/`
2. 右上角开启 **开发者模式**
3. 点击 **加载已解压的扩展程序**，选择本项目的 `src/` 目录
4. 安装完成，工具栏出现扩展图标即可使用

---

## 权限说明

| 权限 | 用途 |
|---|---|
| `activeTab` | 访问当前激活标签页的 URL（按需临时授权，无需 host_permissions） |
| `contextMenus` | 注册右键菜单项目 |
| `notifications` | 右键菜单复制成功后显示系统通知 |

---

## 开发

本扩展为纯静态项目，无需任何构建工具或依赖安装：

```bash
# 直接编辑 src/ 下的文件，然后在 chrome://extensions/ 点击刷新即可生效
```

---

## License

MIT
