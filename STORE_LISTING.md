# Chrome Web Store — Listing Copy
# Unofficial: Dark Mode + Readability for SFMC
# ─────────────────────────────────────────────────────────────


## NAME  (45 chars max)
Unofficial: Dark Mode for SFMC


## SHORT DESCRIPTION  (132 chars max)
Dark mode, readable typography, and syntax highlighting for Salesforce Marketing Cloud. Easy on the eyes after long sessions.


## FULL DESCRIPTION  (max ~16,000 chars — paste into the Description field)

---

If you spend hours every day inside Salesforce Marketing Cloud, you know the problem: a bright white interface, low-contrast text in the navigation, and a code editor that renders strings in near-black on dark grey. Your eyes pay for it by mid-afternoon.

Unofficial  Dark Mode + Readability for SFMC fixes that with three independent layers you can switch on or off individually:


🌙 DARK MODE

Replaces the entire SFMC shell with a VS Code-style dark palette. Covers:
• Header, navigation bar, and app switcher
• Dropdowns, account switcher, and user menu
• Modals, welcome dialogs, and onboarding panels
• Loading spinner and page preloader
• Content properties and asset preview panels
• CodeMirror inline editor background

Email preview iframes are deliberately excluded — your email previews always render as the recipient would see them.


📖 READABILITY

Typography improvements across Content Builder, Email Studio, and other tools:
• Asset names in the grid: proper font weight, ellipsis on overflow, readable size
• Folder tree: taller rows, clear label hierarchy
• Tables: zebra striping, better column spacing, uppercase column headers
• Form inputs: larger tap zones, visible focus rings
• Tooltips and modals: improved text hierarchy
• Smooth micro-transitions on interactions

Works independently — you can use readability improvements in light mode too.


💻 CODE EDITOR

The built-in WYSIWYG editor gets Chrome DevTools / VS Code Dark+ syntax colours:
• HTML tags → blue
• Attribute names → light cyan
• String values → muted orange (fixes the near-invisible dark red default)
• JavaScript keywords → purple
• Variable names → yellow
• Comments → grey-green italic
• Numbers → light green


⏱ AUTOMATIC SCHEDULE

Set dark mode to switch on and off automatically:
• Manual — you control the toggle
• System — follows your OS dark/light preference
• Custom — set your own "dark from / light from" times

The schedule works even when the popup is closed. A background alarm fires every minute so all your SFMC tabs switch at exactly the right time. Overnight windows work correctly (e.g. dark from 22:00, light from 07:00).


PRIVACY

This extension collects no data, makes no network requests, and sends nothing anywhere. Your toggle preferences and schedule are stored locally in Chrome sync storage. That's it.

Permissions used:
• activeTab — inject styles into the current SFMC tab
• storage — save your preferences
• alarms — power the automatic schedule


OPEN SOURCE

The full source code is on GitHub. If SFMC updates break a rule, you can fix it yourself or open an issue. PRs welcome.


NOT AFFILIATED WITH SALESFORCE

This is an unofficial community tool. Salesforce, Marketing Cloud, and ExactTarget are trademarks of Salesforce, Inc.

---


## CATEGORY
Productivity


## LANGUAGE
English


## KEYWORDS  (for store search — add these in the "Additional fields" section)
salesforce marketing cloud, sfmc, dark mode, email studio, content builder,
journey builder, exacttarget, sfmc dark theme, readability, developer tools


## PRIVACY POLICY  (required — host this text at a public URL, e.g. GitHub Pages)

---

Unofficial Privacy Policy

Last updated: [DATE]

Unofficial is a Chrome browser extension that modifies the visual appearance of Salesforce Marketing Cloud web pages.

DATA COLLECTED
This extension does not collect, transmit, or share any personal data. The only data stored is your extension preferences (which toggles are on/off, your schedule settings) and this data is stored locally in Chrome's sync storage — it never leaves your browser.

PERMISSIONS
• activeTab: Used to inject CSS and JavaScript into Salesforce Marketing Cloud pages you visit.
• storage: Used to save your display preferences and schedule settings locally.
• alarms: Used to fire a timer every minute to check your dark mode schedule.

No data is sent to any external server. No analytics, no tracking, no advertising.

THIRD-PARTY SERVICES
None. The extension makes no network requests of any kind.

CONTACT
For questions or concerns, open an issue at: [YOUR GITHUB REPO URL]

---


## SCREENSHOTS GUIDANCE  (1280×800 or 640×400 — upload at least 2, up to 5)

Screenshot 1 — Content Builder grid in dark mode
  Show: asset grid with folder tree on left, dark shell, readable asset names
  Caption: "Content Builder with dark mode and readability improvements"

Screenshot 2 — Code editor with syntax highlighting
  Show: CodeMirror editor open with HTML/AMPscript, syntax colours visible
  Caption: "Built-in code editor with VS Code-style syntax highlighting"

Screenshot 3 — Popup with schedule UI
  Show: Extension popup open, Custom schedule mode selected, countdown visible
  Caption: "Automatic dark mode schedule — works even when the popup is closed"

Screenshot 4 — Email preview pane
  Show: Side-by-side of the dark SFMC shell with a light email preview iframe
  Caption: "Email previews always render as-is — the dark mode stops at the iframe border"

Screenshot 5 — Before / after comparison (optional)
  Show: Split view of the same SFMC page in default vs enhanced mode
  Caption: "Before and after — same page, much easier to work in all day"


## PROMOTIONAL TILE  (440×280 — optional but recommended)
Dark background (#1e1e1e), extension icon centred, tagline below:
"Unofficial · Dark mode for SFMC"
Use the purple accent (#7C7CE8) for the tagline.
