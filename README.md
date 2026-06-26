# Unofficial — Dark Mode + Readability for SFMC

> A Chrome extension that makes Salesforce Marketing Cloud easier to work in — dark mode, readable typography, proper syntax highlighting, and a smart schedule so it switches automatically.

---

## Why this exists

SFMC's default UI is bright white, uses low-contrast text throughout, and the built-in code editor renders strings in a dark red (`#a11`) that's nearly invisible at night. If you spend long hours in Content Builder or Email Studio, your eyes pay for it.

Unofficial Dark Mode + Readability for SFMC fixes that with three independent layers you can toggle separately:

| Layer | What it does |
|---|---|
| 🌙 **Dark Mode** | Replaces the white shell with a VS Code–style dark palette (`#1e1e1e`). Covers the header, nav, dropdowns, account switcher, modals, spinner, and preview panels. Preview iframes are explicitly excluded so email previews still render as-is. |
| 📖 **Readability** | Improves typography across Content Builder's grid, folder tree, tables, inputs, and tooltips. Asset names get proper weight and ellipsis handling. Table rows get zebra striping and hover highlights. Focus rings are visible. |
| 💻 **Code Editor** | Applies Chrome DevTools / VS Code Dark+ syntax colours to the CodeMirror WYSIWYG editor — including a specificity fix that overrides SFMC's own `cm-s-default` theme. |

---

## Features

- **Three independent toggles** — enable any combination
- **Dark mode schedule** with three modes:
  - *Manual* — you control the toggle
  - *System* — follows your OS `prefers-color-scheme`
  - *Custom* — set your own "dark from / light from" times, overnight windows supported (e.g. 22:00 → 07:00)
- **Live countdown** in the popup when using custom schedule
- **Background alarm** (via `chrome.alarms`) — schedule works even when the popup is closed; all open SFMC tabs switch at exactly the right minute
- **MutationObserver enforcer** — counters SFMC's JavaScript which sets inline `color` styles after page load, overriding normal CSS rules
- **Selector health-check script** — paste into DevTools to verify all CSS rules are still hitting live elements after an SFMC update

---

## Installation

### From the Chrome Web Store
*Coming soon — link will appear here once published.*

### Manual (developer mode)
1. Download the latest `.zip` from [Releases](../../releases)
2. Unzip it
3. Open Chrome → `chrome://extensions`
4. Enable **Developer mode** (top right)
5. Click **Load unpacked** → select the unzipped `content_enhanced` folder
6. Navigate to any SFMC URL — the extension activates automatically

---

## Supported URLs

```
https://mc.s7.exacttarget.com/*
https://*.exacttarget.com/*
https://*.marketingcloud.com/*
```

Tested in Content Builder, Email Studio, and Journey Builder.

---

## File structure

```
content_enhanced/
├── manifest.json       Extension manifest (v3)
├── content.js          CSS injection + MutationObserver + schedule engine
├── background.js       Service worker — alarm-based schedule broadcaster
├── popup.html          Extension popup UI
├── popup.js            Popup logic — toggles, schedule, countdown
├── health-check.js     DevTools snippet — selector regression testing
└── icon.png            Extension icon
```

---

## Maintaining it after SFMC updates

SFMC occasionally renames CSS classes, which silently breaks rules. Before each release:

1. Open SFMC in Chrome → Content Builder
2. Open DevTools → **Sources** → **Snippets**
3. Create a new snippet, paste the contents of `health-check.js`, run it
4. Green `✓` = still live · Yellow `○` = non-critical miss · Red `✗ CRITICAL` = must fix before shipping

Critical selectors to watch:
- `.CodeMirror` — editor theming
- `.fuelux .contentitem-table-name` — Content Builder asset names
- `.fuelux .tree .tree-label` — folder sidebar
- `iframe.messagepreview-content` — preview iframe isolation

---

## Contributing

PRs welcome. A few things that would be valuable:

- **New SFMC surface areas** — if you find a panel or modal still rendering in light mode, open an issue with the CSS selector and a screenshot
- **Selector fixes** — if an SFMC update broke a rule, a PR with the updated selector is the fastest fix
- **Journey Builder / Automation Studio coverage** — currently under-tested in those tools
- **Icon** — the current icon is a placeholder; a proper SVG icon would be a great contribution

### Adding a new dark rule

All CSS lives in three template literals inside `content.js`:

```
DARK_CSS    → palette overrides (backgrounds, text, borders)
READ_CSS    → typography and spacing
EDITOR_CSS  → CodeMirror syntax tokens
```

Add your rule in the right layer, following the existing comment structure. If SFMC's JS overrides your rule with inline styles, add the selector to `INLINE_TARGETS` in the MutationObserver section.

### Running the health check after changes

```
# In DevTools console on any SFMC page:
# Sources → Snippets → health-check.js → Run (Ctrl+Enter)
```

---

## Permissions used

| Permission | Why |
|---|---|
| `activeTab` | Inject CSS/JS into the current SFMC tab |
| `storage` | Persist toggle states and schedule preferences across sessions |
| `alarms` | Fire the schedule check every minute in the background |

No data is collected. No network requests are made. Everything runs locally.

---

## License

MIT — do whatever you want with it, a credit or a star is appreciated.

---

## Disclaimer

This is an **unofficial community project** and is not affiliated with, endorsed by, or supported by Salesforce. Salesforce Marketing Cloud, ExactTarget, and related marks are trademarks of Salesforce, Inc.
