/*
  MC Enhancer — content.js  v2.1
  ─────────────────────────────────────────────────────────────────────
  Color philosophy (Chrome DevTools / VS Code Dark+):
    General UI text  → solid #D4D4D4  (near-white, not pastel)
    Bright text      → #FFFFFF         (labels, active, titles)
    Dim/secondary    → #858585         (metadata — still readable)
    Syntax tags      → #569CD6  blue
    Syntax attrs     → #9CDCFE  light cyan
    Syntax strings   → #CE9178  muted orange
    Syntax keywords  → #C586C0  purple
    Syntax numbers   → #B5CEA8  light green
    Syntax comments  → #6A9955  grey-green
    Syntax defs      → #DCDCAA  yellow (var / function names)
    Syntax operators → #D4D4D4  near white
  ─────────────────────────────────────────────────────────────────────
*/

/* ════════════════════════════════════════════════════
   LAYER 1 · DARK MODE
════════════════════════════════════════════════════ */
const DARK_CSS = `
  :root {
    --mc-bg:         #1e1e1e;
    --mc-bg-raised:  #252526;
    --mc-bg-menu:    #2d2d2d;
    --mc-bg-hover:   rgba(255,255,255,0.07);
    --mc-bg-active:  rgba(255,255,255,0.12);
    --mc-text:       #D4D4D4;
    --mc-text-hi:    #FFFFFF;
    --mc-text-dim:   #858585;
    --mc-accent:     #7C7CE8;
    --mc-border-dim: rgba(255,255,255,0.09);
    --mc-border:     rgba(255,255,255,0.16);
  }

  body, .fuel-page, .mc-layout,
  .mc-canvas-container, .mc-canvas-region,
  .modal-content, .mc-modal-region {
    background-color: var(--mc-bg) !important;
    color: var(--mc-text) !important;
  }

  /* ── WELCOME / ONBOARDING MODAL
     Selector: .mc-modal-region.modal.in > div > div > div > div
     Problem:  Uses SLDS CSS vars (--slds-g-color-neutral-base-*) which are
               all light-mode values — our base rule doesn't remap them.
     Fix:      1. Remap every SLDS neutral/brand token to dark equivalents
               2. Dark bg + solid text on every inner layer
               3. Buttons, inputs, headings, links all adjusted
  ── */
  .mc-modal-region.modal,
  .mc-modal-region.modal.in {
    background: rgba(0,0,0,0.75) !important; /* overlay backdrop */
  }

  /* Remap SLDS neutral scale to dark equivalents on the modal container */
  .mc-modal-region.modal.in > div,
  .mc-modal-region.modal.in > div > div,
  .mc-modal-region.modal.in > div > div > div,
  .mc-modal-region.modal.in > div > div > div > div,
  .mc-modal-region .modal-dialog,
  .mc-modal-region .modal-content {
    /* Flip SLDS neutral scale: 100=white→dark, 10=dark→light */
    --slds-g-color-neutral-base-100: #1e1e1e;
    --slds-g-color-neutral-base-95:  #252526;
    --slds-g-color-neutral-base-90:  #2d2d2d;
    --slds-g-color-neutral-base-80:  #3c3c3c;
    --slds-g-color-neutral-base-70:  #555555;
    --slds-g-color-neutral-base-65:  #636363;
    --slds-g-color-neutral-base-60:  #717171;
    --slds-g-color-neutral-base-50:  #858585;
    --slds-g-color-neutral-base-40:  #a0a0a0;
    --slds-g-color-neutral-base-30:  #b8b8b8;
    --slds-g-color-neutral-base-20:  #D4D4D4;
    --slds-g-color-neutral-base-15:  #e0e0e0;
    --slds-g-color-neutral-base-10:  #FFFFFF;
    /* Brand blues — keep readable on dark */
    --slds-g-color-brand-base-100:   #1e1e1e;
    --slds-g-color-brand-base-95:    #1a2840;
    --slds-g-color-brand-base-90:    #1f3a5c;
    --slds-g-color-brand-base-80:    #2a5a8c;
    --slds-g-color-brand-base-70:    #4a8ac4;
    --slds-g-color-brand-base-65:    #569CD6;
    --slds-g-color-brand-base-60:    #6aacde;
    --slds-g-color-brand-base-50:    #7CBCE8;
    --slds-g-color-brand-base-40:    #9CDCFE;
    --slds-g-color-brand-base-30:    #aee6ff;
    --slds-g-color-brand-base-20:    #c8f0ff;
    --slds-g-color-brand-base-15:    #d8f4ff;
    --slds-g-color-brand-base-10:    #eafaff;
    /* Links */
    --slds-g-link-color:       #9CDCFE;
    --slds-g-link-color-hover: #FFFFFF;
    --slds-g-link-color-focus: #FFFFFF;
    --slds-g-link-color-active:#FFFFFF;
    /* Border tokens */
    --slds-g-color-border-base-1: rgba(255,255,255,0.09);
    --slds-g-color-border-base-2: rgba(255,255,255,0.13);
    --slds-g-color-border-base-3: rgba(255,255,255,0.18);
    --slds-g-color-border-base-4: rgba(255,255,255,0.25);
    /* Hard overrides */
    background-color: #1e1e1e !important;
    color: #D4D4D4 !important;
    border-color: rgba(255,255,255,0.12) !important;
  }

  /* All text elements inside the modal */
  .mc-modal-region h1, .mc-modal-region h2, .mc-modal-region h3,
  .mc-modal-region h4, .mc-modal-region h5, .mc-modal-region h6 {
    color: #FFFFFF !important;
  }

  .mc-modal-region p, .mc-modal-region span, .mc-modal-region li,
  .mc-modal-region label, .mc-modal-region td, .mc-modal-region th {
    color: #D4D4D4 !important;
  }

  .mc-modal-region a {
    color: #9CDCFE !important;
  }
  .mc-modal-region a:hover { color: #FFFFFF !important; }

  /* Modal header / footer bars */
  .mc-modal-region .modal-header,
  .mc-modal-region [class*="modal-header"] {
    background-color: #252526 !important;
    border-bottom: 1px solid rgba(255,255,255,0.1) !important;
    color: #FFFFFF !important;
  }

  .mc-modal-region .modal-footer,
  .mc-modal-region [class*="modal-footer"] {
    background-color: #252526 !important;
    border-top: 1px solid rgba(255,255,255,0.1) !important;
  }

  /* Buttons inside modal */
  .mc-modal-region .btn,
  .mc-modal-region button:not(.close) {
    background-color: #2d2d2d !important;
    color: #D4D4D4 !important;
    border: 1px solid rgba(255,255,255,0.16) !important;
  }
  .mc-modal-region .btn:hover,
  .mc-modal-region button:not(.close):hover {
    background-color: rgba(255,255,255,0.1) !important;
    color: #FFFFFF !important;
  }
  .mc-modal-region .btn-primary,
  .mc-modal-region [class*="btn-brand"] {
    background-color: #7C7CE8 !important;
    color: #FFFFFF !important;
    border-color: #7C7CE8 !important;
  }
  .mc-modal-region .btn-primary:hover,
  .mc-modal-region [class*="btn-brand"]:hover {
    background-color: #9494ec !important;
  }

  /* Close button */
  .mc-modal-region .close,
  .mc-modal-region [class*="modal-close"] {
    color: #858585 !important;
    opacity: 1 !important;
  }
  .mc-modal-region .close:hover,
  .mc-modal-region [class*="modal-close"]:hover {
    color: #FFFFFF !important;
  }

  /* Inputs / selects inside modal */
  .mc-modal-region input, .mc-modal-region select,
  .mc-modal-region textarea {
    background-color: #252526 !important;
    color: #D4D4D4 !important;
    border: 1px solid rgba(255,255,255,0.16) !important;
  }

  /* Dividers */
  .mc-modal-region hr {
    border-color: rgba(255,255,255,0.1) !important;
  }

  /* SLDS illustration / graphic area (welcome art) */
  .mc-modal-region [class*="illustration"],
  .mc-modal-region [class*="welcome"],
  .mc-modal-region [class*="onboarding"] {
    background-color: #252526 !important;
    border-radius: 6px !important;
  }

  /* ── SPINNER & PAGE PRELOADER
     Problem: .slds-spinner_container uses rgba(255,255,255,0.75) white overlay.
     Also: html.fuelux root is white — visible as a flash during page load.
     Fix: dark semi-transparent overlay, remap SLDS opacity token,
          spinner dots forced white so they show on dark bg.
  ── */

  /* html root — kill white flash on initial page load */
  html.fuelux,
  html.fuelux body {
    background-color: #1e1e1e !important;
  }

  /* Spinner overlay — dark semi-transparent instead of rgba(255,255,255,0.75) */
  .slds-spinner_container,
  div.insights-loading.slds-spinner_container,
  div.insights-loading {
    --slds-g-color-neutral-100-opacity-75: rgba(30,30,30,0.85) !important;
    background-color: rgba(30,30,30,0.85) !important;
  }

  /* App-level and header preloaders */
  .mc-app-preloader,
  .mc-header-insights-preloader {
    background-color: #1e1e1e !important;
  }

  /* Remap brand token used for spinner dot color */
  .slds-spinner_brand {
    --slds-g-color-brand-base-50: #FFFFFF;
  }

  /* Spinner dots — explicit white so visible on dark overlay */
  .slds-spinner__dot-a::before,
  .slds-spinner__dot-a::after,
  .slds-spinner__dot-b::before,
  .slds-spinner__dot-b::after {
    background-color: #FFFFFF !important;
  }

  /* Generic SFMC loader used inside content regions */
  .loader, .repeater-loader, div.loader {
    background-color: #1e1e1e !important;
    color: #D4D4D4 !important;
  }

  .mc-header-region, .mc-header, .mc-header-main,
  .mc-header-current-app-region, .mc-header-user-and-account,
  .mc-header-navigation, .mc-header-actions-region {
    background-color: #1a1a1a !important;
    border-color: var(--mc-border-dim) !important;
  }

  .mc-header-all-apps-container, nav.mc-header-app-switcher-region,
  .mc-app-switcher-list, .mc-app-switcher-outer {
    background-color: #1e1e1e !important;
    border-bottom: 1px solid var(--mc-border-dim) !important;
  }

  /* ── APP SWITCHER — full tile treatment
     Each li inside the app switcher group: dark bg, solid text, full-width hover.
     Selector confirmed: nav.mc-header-app-switcher-region ul li ul li ── */

  /* Individual app tiles — wipe SFMC's white background */
  nav.mc-header-app-switcher-region ul li,
  nav.mc-header-app-switcher-region ul li ul li,
  .mc-app-switcher-group,
  .mc-app-switcher-group li {
    background-color: #1e1e1e !important;
    color: #D4D4D4 !important;
  }

  /* Name container — kill white bg that causes white-on-white */
  .mc-app-name-container,
  .mc-app-switcher-group .mc-app-name-container {
    background-color: transparent !important;
  }

  /* Label text — solid and readable at rest */
  .mc-app-name-container span,
  .mc-app-switcher-group .mc-app-name-container span,
  .mc-app-switcher-group .mc-app-name,
  .mc-app-group-name {
    color: #D4D4D4 !important;
    font-weight: 500 !important;
    font-size: 11px !important;
    background-color: transparent !important;
    opacity: 1 !important;
  }

  /* Hover — full tile highlight + white text */
  nav.mc-header-app-switcher-region ul li ul li:hover,
  .mc-app-switcher-group:hover,
  .mc-app-switcher-group li:hover {
    background-color: rgba(255,255,255,0.1) !important;
    border-radius: 4px !important;
  }

  .mc-app-switcher-group:hover .mc-app-name-container span,
  .mc-app-switcher-group:hover .mc-app-name,
  nav.mc-header-app-switcher-region ul li ul li:hover .mc-app-name-container span {
    color: #FFFFFF !important;
  }

  /* Icons — lift brightness so they are not muddy */
  .mc-app-group-icon, .mc-app-switcher-group svg, .mc-app-switcher-group img {
    filter: brightness(1.8) saturate(0.8) !important;
  }
  .mc-app-switcher-group:hover .mc-app-group-icon,
  .mc-app-switcher-group:hover svg, .mc-app-switcher-group:hover img,
  nav.mc-header-app-switcher-region ul li ul li:hover .mc-app-group-icon {
    filter: brightness(2.4) saturate(1) !important;
  }

  .mc-header-current-app-name {
    color: #FFFFFF !important;
    font-weight: 700 !important;
  }

  /* ── TOP NAV — tool-level links (Overview, Emails, etc.)
     XPath: //*[@id="body"]/div/div[1]/div/nav[1]/div/div/div[2]/div/div[1]/div/ul/li/a
     Always show solid readable text, not just on hover ── */
  .mc-header-navigation-app,
  .mc-header-current-app-menu-region ul li a,
  .mc-header-current-app-menu-region ul li span,
  .top-level-nav a,
  .top-level-nav span,
  .mc-header-menu-value .value,
  .username {
    color: #D4D4D4 !important;
    font-weight: 500 !important;
    background-color: transparent !important;
    opacity: 1 !important;
    visibility: visible !important;
  }

  /* Hover — brighten to white */
  .mc-header-current-app-menu-region ul li a:hover,
  .mc-header-current-app-menu-region ul li:hover > a,
  .top-level-nav a:hover,
  .mc-header-navigation-item:hover {
    background-color: var(--mc-bg-hover) !important;
    color: #FFFFFF !important;
    border-radius: 3px !important;
  }

  /* Active / selected tab */
  .top-level-nav.selected a.selected,
  .top-level-nav a.selected,
  .mc-header-current-app-menu-region ul li.selected > a,
  .mc-header-current-app-menu-region ul li.active > a {
    color: #FFFFFF !important;
    font-weight: 600 !important;
    border-bottom: 2px solid var(--mc-accent) !important;
  }

  /* ── CURRENT APP SUB-MENU DROPDOWN (3rd panel, e.g. "More" overflow menu)
     XPath: nav[1]/div/div/div[2]/div/div[3]/div/ul
     Match style of: nav.mc-header-app-switcher-region .mc-app-group-dropdown
     ── */
  .mc-header-current-app-menu-region div ul,
  .mc-header-current-app-menu-region .mc-app-group-dropdown,
  .mc-header-current-app-menu-region .mc-app-group-dropdown ul,
  .mc-header-current-app-menu-region .top-level-nav-container,
  .mc-header-current-app-menu-region .top-level-nav-container ul {
    background-color: var(--mc-bg-menu) !important;
    border: 1px solid var(--mc-border) !important;
    box-shadow: 0 8px 32px rgba(0,0,0,0.7) !important;
  }

  /* Row items — same pattern as .mc-app-group-dropdown-app */
  .mc-header-current-app-menu-region div ul li,
  .mc-header-current-app-menu-region .mc-app-group-dropdown ul li {
    background-color: var(--mc-bg-menu) !important;
    border-bottom: 1px solid var(--mc-border-dim) !important;
  }

  /* Link and span text inside — solid #D4D4D4 at rest */
  .mc-header-current-app-menu-region div ul li a,
  .mc-header-current-app-menu-region div ul li a span,
  .mc-header-current-app-menu-region .mc-app-group-dropdown ul li a,
  .mc-header-current-app-menu-region .mc-app-group-dropdown ul li a span.mc-app-name,
  .mc-header-current-app-menu-region .mc-app-group-dropdown ul li a .more-info-copy {
    color: #D4D4D4 !important;
    font-weight: 400 !important;
    background-color: transparent !important;
    opacity: 1 !important;
  }

  /* Hover row */
  .mc-header-current-app-menu-region div ul li:hover,
  .mc-header-current-app-menu-region .mc-app-group-dropdown ul li:hover {
    background-color: var(--mc-bg-active) !important;
  }

  /* Hover text */
  .mc-header-current-app-menu-region div ul li:hover a,
  .mc-header-current-app-menu-region div ul li:hover a span,
  .mc-header-current-app-menu-region .mc-app-group-dropdown ul li:hover a,
  .mc-header-current-app-menu-region .mc-app-group-dropdown ul li:hover a span {
    color: #FFFFFF !important;
  }

  .mc-user-info-menu, .mc-accounts-menu, .mc-app-group-dropdown,
  .mc-app-group-dropdown-apps, ul.mc-app-group-dropdown-apps,
  .mc-header-current-app-menu, .top-level-nav-container,
  .dropdown-menu, .popover, .popover-body {
    background-color: var(--mc-bg-menu) !important;
    border: 1px solid var(--mc-border) !important;
    box-shadow: 0 8px 32px rgba(0,0,0,0.7) !important;
  }

  .mc-app-group-dropdown-app {
    background-color: var(--mc-bg-menu) !important;
    border-bottom: 1px solid var(--mc-border-dim) !important;
  }
  .mc-app-group-dropdown-app:hover { background-color: var(--mc-bg-active) !important; }

  .mc-app-group-dropdown-app a, .mc-app-group-dropdown-app span,
  .mc-app-name, .more-info-copy,
  .mc-user-info-menu-item-list li a, .mc-account-switcher-name {
    color: #D4D4D4 !important;
    font-weight: 400 !important;
    background-color: transparent !important;
  }

  .mc-app-group-dropdown-app:hover a,
  .mc-app-group-dropdown-app:hover span { color: #FFFFFF !important; }

  .mc-user-info-menu-item-header, .mc-app-group-name {
    color: var(--mc-accent) !important;
    font-weight: 700 !important;
    font-size: 10px !important;
    letter-spacing: 0.08em !important;
    text-transform: uppercase !important;
    border-bottom: 1px solid var(--mc-border-dim) !important;
    background-color: var(--mc-bg-menu) !important;
    padding: 6px 10px !important;
  }

  .mc-user-info-menu a { color: #D4D4D4 !important; }
  .mc-account-switcher-current-account, .mc-accounts li {
    background-color: var(--mc-bg) !important;
    border-color: var(--mc-border-dim) !important;
    color: #D4D4D4 !important;
  }
  .mc-account:hover { background-color: var(--mc-bg-hover) !important; }
  .mc-account-switcher-mid { color: #858585 !important; font-size: 10px !important; }
  .mc-account-switcher-view-hierarchy { color: var(--mc-accent) !important; }

  /* ── ACCOUNT SWITCHER FILTER BUTTONS (All / Favourites / Recent)
     These buttons use icon-fonts with sr-only label spans — never touch sr-only.
     Style only: background of the row, icon color, and active/hover states. ── */
  .mc-account-switcher-filter {
    background-color: var(--mc-bg-raised) !important;
    border-bottom: 1px solid var(--mc-border-dim) !important;
  }

  /* Icon-button shell — dim at rest */
  .mc-account-switcher-filter-option {
    background-color: transparent !important;
    color: #858585 !important;
    border-color: transparent !important;
    opacity: 1 !important;
    transition: color 0.15s ease, background 0.15s ease !important;
  }

  /* Hover — brighten icon */
  .mc-account-switcher-filter-option:hover {
    background-color: var(--mc-bg-hover) !important;
    color: #D4D4D4 !important;
  }

  /* Active / current — accent highlight */
  .mc-account-switcher-filter-option.current {
    color: #FFFFFF !important;
    background-color: rgba(124,124,232,0.25) !important;
    border-color: var(--mc-accent) !important;
  }

  .btn-link, .mc-header-feedback-button { color: #D4D4D4 !important; }
  .btn-link:hover { color: #FFFFFF !important; }

  .mc-user-info-menu-item-list, hr { border-color: var(--mc-border-dim) !important; }

  .mc-app-iframe {
    filter: invert(88%) hue-rotate(155deg) saturate(0.65) brightness(0.92) !important;
  }

  /* ═══════════════════════════════════════════════════════
     MESSAGE PREVIEW PANE — full light-mode isolation
     Target: <iframe class="messagepreview-content messagepreview-html"
              src="https://user-content.s7.sfmc-content.com/" …>
     Strategy:
       1. Reset all --mc-* CSS vars so none bleed into this context.
       2. Hard-reset every visual property dark mode sets.
       3. Same reset on every known parent wrapper.
       4. force color-scheme: light throughout.
  ═══════════════════════════════════════════════════════ */

  /* The iframe element — match by class and by src origin */
  iframe.messagepreview-content,
  iframe.messagepreview-html,
  iframe[class*="messagepreview"],
  iframe[src*="sfmc-content.com"] {
    --mc-bg:         initial !important;
    --mc-bg-raised:  initial !important;
    --mc-bg-menu:    initial !important;
    --mc-bg-hover:   initial !important;
    --mc-bg-active:  initial !important;
    --mc-text:       initial !important;
    --mc-text-hi:    initial !important;
    --mc-text-dim:   initial !important;
    --mc-accent:     initial !important;
    --mc-border-dim: initial !important;
    --mc-border:     initial !important;
    filter:           none    !important;
    background:       #ffffff !important;
    background-color: #ffffff !important;
    color:            #000000 !important;
    color-scheme:     light   !important;
    opacity:          1       !important;
    mix-blend-mode:   normal  !important;
    border:           none    !important;
    outline:          none    !important;
    box-shadow:       none    !important;
  }

  /* Parent wrappers — prevent inherited color/bg leaking in */
  .messagepreview-wrapper,
  .messagepreview-container,
  .message-preview-region,
  [class*="messagepreview-wrap"],
  [class*="preview-panel"],
  [class*="preview-container"] {
    background:       #ffffff !important;
    background-color: #ffffff !important;
    color:            #000000 !important;
    color-scheme:     light   !important;
    filter:           none    !important;
  }

  /* ── CONTENT PROPERTIES PREVIEW PANEL
     Selector: #index-entry .contentproperties-preview .contentitem-preview
     XPath:    //*[@id="index-entry"]/…/div[3]/div[2]/div/div[2]/div/div[2]
     This is a native DOM panel (not an iframe) that renders the asset
     thumbnail in the right-side properties drawer. SFMC sets:
       color: #16325c  (navy — invisible on dark bg)
       background: white (from inherited Salesforce Sans stylesheet)
     Fix: dark bg, solid readable text, remap Salesforce color tokens.
  ── */

  /* Outer property panel shells */
  #index-entry,
  .contentproperties-body,
  .contentproperties-preview,
  .property-item,
  .contentitem-preview {
    background-color: #1e1e1e !important;
    background:       #1e1e1e !important;
    color:            #D4D4D4 !important;
    border-color:     rgba(255,255,255,0.1) !important;
  }

  /* Kill the Salesforce navy (#16325c) that comes from their font/color stylesheet */
  .contentitem-preview,
  .contentitem-preview *,
  .contentproperties-preview,
  .contentproperties-preview *,
  .contentproperties-body,
  .contentproperties-body * {
    color: #D4D4D4 !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter',
                 'Helvetica Neue', Arial, sans-serif !important;
  }

  /* Headings inside the panel */
  .contentproperties-preview h1,
  .contentproperties-preview h2,
  .contentproperties-preview h3,
  .contentproperties-preview h4,
  .contentproperties-body h1,
  .contentproperties-body h2,
  .contentproperties-body h3,
  .contentproperties-body h4 {
    color: #FFFFFF !important;
  }

  /* Labels / meta text */
  .contentproperties-preview .property-label,
  .contentproperties-preview .property-name,
  .contentproperties-body .property-label,
  .contentproperties-body .property-name {
    color: #858585 !important;
    font-size: 10px !important;
    font-weight: 700 !important;
    letter-spacing: 0.05em !important;
    text-transform: uppercase !important;
  }

  /* Values / content */
  .contentproperties-preview .property-value,
  .contentproperties-body .property-value {
    color: #D4D4D4 !important;
  }

  /* Dividers between property rows */
  .contentproperties-body .property-item {
    border-bottom: 1px solid rgba(255,255,255,0.07) !important;
    background-color: transparent !important;
  }

  /* Any thumbnail/image container — keep bg dark so images have a proper backdrop */
  .contentitem-preview img,
  .contentproperties-preview img {
    background-color: #2d2d2d !important;
    border: 1px solid rgba(255,255,255,0.1) !important;
    border-radius: 3px !important;
  }

  /* Links inside the preview panel */
  .contentproperties-preview a,
  .contentproperties-body a {
    color: #9CDCFE !important;
  }
  .contentproperties-preview a:hover,
  .contentproperties-body a:hover {
    color: #FFFFFF !important;
  }

  * { scrollbar-color: #424242 #1e1e1e !important; }
  ::-webkit-scrollbar { width: 8px !important; background: transparent !important; }
  ::-webkit-scrollbar-thumb {
    background: #424242 !important;
    border-radius: 4px !important;
    border: 2px solid #1e1e1e !important;
  }
  ::-webkit-scrollbar-thumb:hover { background: #5a5a5a !important; }
  ::-webkit-scrollbar-track { background: transparent !important; }
`;

/* ════════════════════════════════════════════════════
   LAYER 2 · READABILITY
════════════════════════════════════════════════════ */
const READ_CSS = `
  body, .fuelux, .fuelux *, .mc-layout, .mc-canvas-region {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter',
                 'Helvetica Neue', Arial, sans-serif !important;
    -webkit-font-smoothing: antialiased !important;
    text-rendering: optimizeLegibility !important;
  }

  .fuelux .contentitem-table-name {
    font-size: 13px !important;
    line-height: 1.3 !important;
    word-break: break-word !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    font-weight: 600 !important;
    color: #D4D4D4 !important;
    letter-spacing: -0.01em !important;
  }

  .fuelux .contentitem-table-type,
  .fuelux .contentitem-table-meta,
  .fuelux .contentitem-table-modified {
    font-size: 11px !important;
    line-height: 1.4 !important;
    color: #858585 !important;
  }

  .fuelux .tree .tree-label {
    line-height: 24px !important;
    font-weight: 600 !important;
    font-size: 13px !important;
    color: #D4D4D4 !important;
    letter-spacing: -0.01em !important;
  }

  .fuelux .tree li.tree-item,
  .fuelux .tree li.tree-branch { min-height: 28px !important; }

  .fuelux .tree .icon-folder,
  .fuelux .tree .glyphicon,
  .fuelux .tree [class^="icon-"] {
    font-size: 14px !important;
    vertical-align: middle !important;
    margin-right: 4px !important;
  }

  .fuelux table th, .fuelux .datagrid-header th {
    font-size: 11px !important;
    font-weight: 700 !important;
    letter-spacing: 0.06em !important;
    text-transform: uppercase !important;
    padding: 10px 12px !important;
    color: #858585 !important;
  }

  .fuelux table td, .fuelux .datagrid td {
    font-size: 13px !important;
    line-height: 1.45 !important;
    padding: 9px 12px !important;
    vertical-align: middle !important;
    color: #D4D4D4 !important;
  }

  .fuelux table tbody tr:nth-child(even),
  .fuelux .datagrid tbody tr:nth-child(even) {
    background-color: rgba(255,255,255,0.03) !important;
  }

  .fuelux table tbody tr:hover,
  .fuelux .datagrid tbody tr:hover {
    background-color: rgba(124,124,232,0.08) !important;
  }

  .fuelux .btn, .btn.btn-default, .btn.btn-primary, .btn.btn-sm {
    font-size: 12px !important;
    font-weight: 600 !important;
    padding: 6px 14px !important;
    line-height: 1.4 !important;
    border-radius: 4px !important;
  }

  .fuelux input[type="text"], .fuelux input[type="search"],
  .fuelux input[type="email"], .fuelux input[type="password"],
  .fuelux textarea, .fuelux select {
    font-size: 13px !important;
    padding: 6px 10px !important;
    border-radius: 4px !important;
    color: #D4D4D4 !important;
  }

  .fuelux input:focus, .fuelux textarea:focus, .fuelux select:focus {
    outline: 2px solid #7C7CE8 !important;
    outline-offset: 1px !important;
    box-shadow: 0 0 0 3px rgba(124,124,232,0.18) !important;
  }

  .modal-title, .fuelux .modal-title {
    font-size: 16px !important;
    font-weight: 700 !important;
    color: #FFFFFF !important;
  }

  .modal-body, .fuelux .modal-body {
    font-size: 13px !important;
    line-height: 1.6 !important;
    color: #D4D4D4 !important;
  }

  .fuelux .dropdown-menu > li > a, .dropdown-menu > li > a {
    font-size: 13px !important;
    padding: 7px 16px !important;
    color: #D4D4D4 !important;
  }

  .tooltip-inner, .fuelux .tooltip-inner {
    font-size: 12px !important;
    font-weight: 500 !important;
    padding: 6px 10px !important;
    max-width: 260px !important;
    background: #3c3c3c !important;
    color: #FFFFFF !important;
    border-radius: 4px !important;
  }

  .fuelux .thumbnail:hover, .contentitem-tile:hover,
  .content-item-thumbnail:hover {
    transform: translateY(-1px) !important;
    box-shadow: 0 6px 20px rgba(0,0,0,0.3) !important;
    transition: all 0.15s ease !important;
  }
`;

/* ════════════════════════════════════════════════════
   LAYER 3 · CODE EDITOR — Chrome DevTools / VS Code Dark+ palette
   Prefix every token with both bare and .cm-s-default
   so specificity beats SFMC's own cm-s-default theme rules.
════════════════════════════════════════════════════ */
const EDITOR_CSS = `

  /* Shell */
  .CodeMirror, .CodeMirror-scroll, .CodeMirror-sizer, .CodeMirror-lines {
    background-color: #1e1e1e !important;
    color: #D4D4D4 !important;
    font-family: 'Cascadia Code', 'Fira Code', 'Consolas',
                 'Menlo', 'Courier New', monospace !important;
    font-size: 13px !important;
    line-height: 1.65 !important;
    caret-color: #AEAFAD !important;
  }

  /* Gutter / line numbers */
  .CodeMirror-gutters {
    background-color: #1e1e1e !important;
    border-right: 1px solid #2d2d2d !important;
  }
  .CodeMirror-linenumber {
    color: #858585 !important;
    font-size: 12px !important;
    padding-right: 10px !important;
    padding-left: 6px !important;
    min-width: 26px !important;
  }

  .CodeMirror-activeline-background { background: rgba(255,255,255,0.04) !important; }
  .CodeMirror-cursor { border-left: 2px solid #AEAFAD !important; }

  .CodeMirror-selected,
  .CodeMirror-focused .CodeMirror-selected { background: rgba(38,79,120,0.7) !important; }

  .CodeMirror-matchingbracket {
    background: rgba(255,255,255,0.1) !important;
    color: #FFFFFF !important;
    font-weight: bold !important;
    border-bottom: 1px solid #AEAFAD !important;
  }

  .CodeMirror-foldgutter-open, .CodeMirror-foldgutter-folded { color: #858585 !important; }
  .CodeMirror-foldgutter-open:hover, .CodeMirror-foldgutter-folded:hover { color: #D4D4D4 !important; }

  /* ── HTML TOKENS — bare + .cm-s-default for full specificity ── */
  .cm-tag.cm-bracket,
  .cm-s-default .cm-tag.cm-bracket    { color: #808080 !important; }
  .cm-tag,
  .cm-s-default .cm-tag               { color: #569CD6 !important; }
  .cm-attribute,
  .cm-s-default .cm-attribute         { color: #9CDCFE !important; }
  .cm-string,
  .cm-s-default .cm-string            { color: #CE9178 !important; }
  .cm-string-2,
  .cm-s-default .cm-string-2          { color: #CE9178 !important; }
  .cm-operator,
  .cm-s-default .cm-operator          { color: #D4D4D4 !important; }
  .cm-comment,
  .cm-s-default .cm-comment           { color: #6A9955 !important; font-style: italic !important; }

  .cm-tag.CodeMirror-matchingtag,
  .cm-attribute.CodeMirror-matchingtag,
  .cm-string.CodeMirror-matchingtag,
  .CodeMirror-matchingtag {
    background: rgba(255,255,255,0.07) !important;
    outline: 1px solid rgba(255,255,255,0.18) !important;
    border-radius: 2px !important;
  }

  /* ── JS TOKENS ── */
  .cm-keyword,
  .cm-s-default .cm-keyword           { color: #C586C0 !important; font-weight: 600 !important; }
  .cm-def,
  .cm-s-default .cm-def               { color: #DCDCAA !important; }
  .cm-variable,
  .cm-s-default .cm-variable          { color: #9CDCFE !important; }
  .cm-variable-2,
  .cm-s-default .cm-variable-2        { color: #9CDCFE !important; }
  .cm-variable-3,
  .cm-s-default .cm-variable-3        { color: #9CDCFE !important; }
  .cm-property,
  .cm-s-default .cm-property          { color: #9CDCFE !important; }
  .cm-number,
  .cm-s-default .cm-number            { color: #B5CEA8 !important; }
  .cm-atom,
  .cm-s-default .cm-atom              { color: #569CD6 !important; }
  .cm-meta,
  .cm-s-default .cm-meta              { color: #569CD6 !important; }
  .cm-error,
  .cm-s-default .cm-error             { color: #F44747 !important; background: transparent !important; }

  .cm-searching {
    background: rgba(234,92,0,0.3) !important;
    outline: 1px solid rgba(234,92,0,0.6) !important;
  }

  .CodeMirror-vscrollbar::-webkit-scrollbar,
  .CodeMirror-hscrollbar::-webkit-scrollbar { width: 8px !important; height: 8px !important; }
  .CodeMirror-vscrollbar::-webkit-scrollbar-thumb,
  .CodeMirror-hscrollbar::-webkit-scrollbar-thumb {
    background: #424242 !important; border-radius: 4px !important;
  }
  .CodeMirror-vscrollbar::-webkit-scrollbar-track,
  .CodeMirror-hscrollbar::-webkit-scrollbar-track { background: #1e1e1e !important; }

  .sfmc-editor-toolbar, .editor-toolbar,
  .codemirror-toolbar, [class*="editor-header"],
  [class*="code-editor-toolbar"] {
    background: #252526 !important;
    border-bottom: 1px solid #333 !important;
    color: #D4D4D4 !important;
  }
  .mc-app-switcher-container{
    background-color: #000000 !important;
  }
`;

/* ─────────────────────────────────────────────
   INJECTION HELPERS
───────────────────────────────────────────── */
function inject(id, css) {
  if (!document.getElementById(id)) {
    const s = document.createElement('style');
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
  }
}
function eject(id) { const el = document.getElementById(id); if (el) el.remove(); }

function applyDarkMode()     { inject('__mc_darkmode__', DARK_CSS); }
function removeDarkMode()    { eject('__mc_darkmode__'); }
function applyReadability()  { inject('__mc_readability__', READ_CSS); }
function removeReadability() { eject('__mc_readability__'); }
function applyEditor()       { inject('__mc_editor__', EDITOR_CSS); }
function removeEditor()      { eject('__mc_editor__'); }

/* ─────────────────────────────────────────────
   SCHEDULE ENGINE
   ─────────────────────────────────────────────
   Modes:
     'manual' — toggles controlled by the user directly
     'system' — follows OS prefers-color-scheme
     'custom' — active between scheduleStart and scheduleEnd (HH:MM)
               handles overnight windows, e.g. 22:00 → 07:00
───────────────────────────────────────────── */

function minutesNow() {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}

function parseHHMM(str) {
  const [h, m] = (str || '22:00').split(':').map(Number);
  return h * 60 + (m || 0);
}

function isInDarkWindow(start, end) {
  const s   = parseHHMM(start);
  const e   = parseHHMM(end);
  const now = minutesNow();
  // Overnight window (e.g. 22:00→07:00): active if now ≥ s OR now < e
  // Same-day window (e.g. 08:00→20:00): active if s ≤ now < e
  return s <= e ? (now >= s && now < e) : (now >= s || now < e);
}

function applySchedule(prefs) {
  const mode  = prefs.scheduleMode  || 'manual';
  const start = prefs.scheduleStart || '22:00';
  const end   = prefs.scheduleEnd   || '07:00';

  if (mode === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    prefersDark ? applyDarkMode() : removeDarkMode();
    prefersDark ? startInlineEnforcer() : stopInlineEnforcer();

  } else if (mode === 'custom') {
    const shouldBeDark = isInDarkWindow(start, end);
    shouldBeDark ? applyDarkMode() : removeDarkMode();
    shouldBeDark ? startInlineEnforcer() : stopInlineEnforcer();
  }
  // 'manual': do nothing — user toggles control it
}

/* ─────────────────────────────────────────────
   BOOT
───────────────────────────────────────────── */
chrome.storage.sync.get(
  ['darkModeEnabled', 'readabilityEnabled', 'editorEnabled',
   'scheduleMode', 'scheduleStart', 'scheduleEnd'],
  (r) => {
    // Always apply readability + editor from saved prefs
    if (r.readabilityEnabled !== false) applyReadability();
    if (r.editorEnabled      !== false) applyEditor();

    const mode = r.scheduleMode || 'manual';

    if (mode === 'manual') {
      // Respect the stored manual toggle
      if (r.darkModeEnabled !== false) { applyDarkMode(); startInlineEnforcer(); }
    } else {
      // Let the schedule decide
      applySchedule(r);
    }

    // Watch for OS theme changes when in system mode
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        chrome.storage.sync.get(['scheduleMode'], (s) => {
          if ((s.scheduleMode || 'manual') === 'system') applySchedule(s);
        });
      });
  }
);

/* ─────────────────────────────────────────────
   INLINE STYLE ENFORCER + MutationObserver
   ─────────────────────────────────────────────
   Problem: SFMC's JavaScript sets inline style="color: ..."
   on nav <a> elements AFTER the page renders, overriding
   even !important stylesheet rules.

   Solution: Use element.style.setProperty(..., 'important')
   to write our own inline !important — same weapon, we win.
   A MutationObserver re-runs whenever SFMC mutates the header
   so dynamic re-renders are caught immediately.
───────────────────────────────────────────── */

// Targets: selector → [property, value] pairs to force
const INLINE_TARGETS = [
  {
    // Top nav links: Overview, Emails, Subscribers, etc.
    // Covers both the flat link bar AND the overflow dropdown (div:nth-child(3))
    selector: [
      'nav.mc-header-current-app-region a',
      'nav.mc-header-current-app-region .title',
      '.mc-header-current-app-menu-region ul li a',
      '.mc-header-current-app-menu-region ul li span.title',
      '.mc-header-current-app-menu-region div ul li a',
      '.mc-header-current-app-menu-region div ul li a span',
      '.mc-header-current-app-menu-region .mc-app-group-dropdown ul li a',
      '.mc-header-current-app-menu-region .mc-app-group-dropdown ul li a span',
      '.top-level-nav a',
    ].join(', '),
    styles: { color: '#D4D4D4' },
    hoverStyles: { color: '#FFFFFF' },
  },
  {
    // App switcher tile labels
    selector: [
      'nav.mc-header-app-switcher-region .mc-app-name-container span',
      'nav.mc-header-app-switcher-region .mc-app-name',
      '.mc-app-switcher-group .mc-app-name-container span',
    ].join(', '),
    styles: { color: '#D4D4D4', 'background-color': 'transparent' },
    hoverStyles: { color: '#FFFFFF' },
  },
];

function forceInlineStyles() {
  INLINE_TARGETS.forEach(({ selector, styles, hoverStyles }) => {
    document.querySelectorAll(selector).forEach(el => {
      // Apply base styles as inline !important
      Object.entries(styles).forEach(([prop, val]) => {
        el.style.setProperty(prop, val, 'important');
      });

      // Attach hover listeners once (guard with a flag)
      if (!el.__mcEnhanced) {
        el.__mcEnhanced = true;
        el.addEventListener('mouseenter', () => {
          Object.entries(hoverStyles).forEach(([prop, val]) => {
            el.style.setProperty(prop, val, 'important');
          });
        });
        el.addEventListener('mouseleave', () => {
          Object.entries(styles).forEach(([prop, val]) => {
            el.style.setProperty(prop, val, 'important');
          });
        });
      }
    });
  });
}

let _observer = null;

function startInlineEnforcer() {
  // Run immediately and after a short delay (catches late SFMC renders)
  forceInlineStyles();
  setTimeout(forceInlineStyles, 800);
  setTimeout(forceInlineStyles, 2000);

  // Watch the header for any DOM / attribute mutations
  const header = document.querySelector('.mc-header-region') || document.body;
  _observer = new MutationObserver(() => forceInlineStyles());
  _observer.observe(header, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class'],
  });
}

function stopInlineEnforcer() {
  if (_observer) { _observer.disconnect(); _observer = null; }
}

/* ─────────────────────────────────────────────
   MESSAGE BUS
───────────────────────────────────────────── */
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'toggleDark') {
    if (msg.enabled) { applyDarkMode(); startInlineEnforcer(); }
    else             { removeDarkMode(); stopInlineEnforcer(); }
  }
  if (msg.action === 'toggleReadability') { msg.enabled ? applyReadability() : removeReadability(); }
  if (msg.action === 'toggleEditor')      { msg.enabled ? applyEditor()      : removeEditor(); }

  // Fired by background.js alarm every minute
  if (msg.action === 'checkSchedule') {
    chrome.storage.sync.get(
      ['scheduleMode', 'scheduleStart', 'scheduleEnd'],
      (r) => { if ((r.scheduleMode || 'manual') !== 'manual') applySchedule(r); }
    );
  }
});
