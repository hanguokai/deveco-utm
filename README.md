# DEVECO UTM Link Copier — Chrome Extension

A lightweight Chrome extension that helps DEVECO / GDE community members quickly copy page links with UTM tracking parameters.

## Features

- **Context Menu**: Right-click on any page and select **Copy UTM Link (DEVECO)** to append UTM parameters to the current page URL, copy it to the clipboard, and display a system notification confirming the copy.
- **Extension Popup**: Click the extension icon in the toolbar to open a popup that previews the full UTM-appended link in real time. Copy it with a single button click.

### Appended UTM Parameters

```
utm_campaign=DEVECO_GDEMembers
utm_source=deveco
```

Example output URL:

```
https://example.com/page?utm_campaign=DEVECO_GDEMembers&utm_source=deveco
```

> If the original URL already contains a parameter with the same name, the extension will not add it again.

---

## Project Structure

```
deveco-utm/
├── README.md
└── src/
    ├── manifest.json      # Extension manifest (Manifest V3)
    ├── background.js      # Service Worker: context menu registration & copy logic
    ├── popup.html         # Popup page
    ├── popup.js           # Popup interaction logic
    └── icons/
        ├── icon48.png
        └── icon128.png
```

---

## Installation (Developer Mode)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** in the top-right corner
3. Click **Load unpacked** and select the `src/` directory of this project
4. The extension icon will appear in the toolbar once installed

---

## Permissions

| Permission | Purpose |
|---|---|
| `activeTab` | Access the URL of the currently active tab (temporary, on-demand grant — no `host_permissions` required) |
| `contextMenus` | Register the right-click context menu item |
| `notifications` | Show a system notification after a successful copy via the context menu |

---

## Development

This extension is a purely static project — no build tools or dependency installation required:

```bash
# Edit the files under src/, then click the refresh button on chrome://extensions/ to apply changes
```

---

## License

MIT
