/**
 * MC Enhancer — Selector Health Check
 * ─────────────────────────────────────────────────────────────
 * Run this in the browser DevTools console while on SFMC,
 * or save as a DevTools Snippet (Sources → Snippets → New).
 *
 * It tests every CSS selector the extension relies on and
 * reports which ones are still live in the DOM vs broken.
 *
 * Usage:
 *   1. Open SFMC in Chrome (Content Builder recommended)
 *   2. Open DevTools → Console
 *   3. Paste this script and hit Enter
 *   4. Review the results table
 * ─────────────────────────────────────────────────────────────
 */

const SELECTORS = [

  // ── LAYER 1: DARK MODE ─────────────────────────────────────
  { group: "Dark Mode — Base",
    selector: "body",                                           critical: true  },
  { group: "Dark Mode — Header",
    selector: ".mc-header-region",                             critical: true  },
  { group: "Dark Mode — Header",
    selector: ".mc-header-navigation",                         critical: false },
  { group: "Dark Mode — App Switcher",
    selector: ".mc-app-switcher-list",                         critical: false },
  { group: "Dark Mode — App Switcher",
    selector: ".mc-app-switcher-group",                        critical: false },
  { group: "Dark Mode — App Switcher Labels",
    selector: ".mc-app-name",                                  critical: false },
  { group: "Dark Mode — Nav",
    selector: ".top-level-nav a",                              critical: false },
  { group: "Dark Mode — Nav",
    selector: ".mc-header-current-app-name",                   critical: false },
  { group: "Dark Mode — Dropdowns",
    selector: ".dropdown-menu",                                critical: false },
  { group: "Dark Mode — Dropdowns",
    selector: ".mc-app-group-dropdown",                        critical: false },
  { group: "Dark Mode — Dropdowns",
    selector: ".mc-user-info-menu",                            critical: false },
  { group: "Dark Mode — Account Menu",
    selector: ".mc-account-switcher-name",                     critical: false },

  // ── LAYER 2: READABILITY ───────────────────────────────────
  { group: "Readability — Content Grid",
    selector: ".fuelux .contentitem-table-name",               critical: true  },
  { group: "Readability — Content Grid",
    selector: ".contentitem-table-name",                       critical: true  },
  { group: "Readability — Content Grid",
    selector: ".contentitem-table-type",                       critical: false },
  { group: "Readability — Tree",
    selector: ".fuelux .tree .tree-label",                     critical: true  },
  { group: "Readability — Tree",
    selector: ".fuelux .tree li.tree-item",                    critical: true  },
  { group: "Readability — Tree",
    selector: ".fuelux .tree li.tree-branch",                  critical: false },
  { group: "Readability — Tables",
    selector: ".fuelux table th",                              critical: false },
  { group: "Readability — Tables",
    selector: ".fuelux table td",                              critical: false },
  { group: "Readability — Buttons",
    selector: ".fuelux .btn",                                  critical: false },
  { group: "Readability — Inputs",
    selector: ".fuelux input[type='text']",                    critical: false },

  // ── LAYER 3: CODE EDITOR ───────────────────────────────────
  { group: "Editor — Shell",
    selector: ".CodeMirror",                                   critical: true  },
  { group: "Editor — Shell",
    selector: ".CodeMirror-lines",                             critical: true  },
  { group: "Editor — Gutter",
    selector: ".CodeMirror-gutters",                           critical: true  },
  { group: "Editor — Gutter",
    selector: ".CodeMirror-linenumber",                        critical: false },
  { group: "Editor — Syntax (HTML)",
    selector: ".cm-tag",                                       critical: true  },
  { group: "Editor — Syntax (HTML)",
    selector: ".cm-attribute",                                 critical: true  },
  { group: "Editor — Syntax (HTML)",
    selector: ".cm-string",                                    critical: true  },
  { group: "Editor — Syntax (HTML)",
    selector: ".cm-comment",                                   critical: false },
  { group: "Editor — Syntax (JS)",
    selector: ".cm-keyword",                                   critical: true  },
  { group: "Editor — Syntax (JS)",
    selector: ".cm-def",                                       critical: false },
  { group: "Editor — Syntax (JS)",
    selector: ".cm-variable",                                  critical: false },
  { group: "Editor — Fold",
    selector: ".CodeMirror-foldgutter-open",                   critical: false },

  // ── MESSAGE PREVIEW ────────────────────────────────────────
  { group: "Preview — iframe",
    selector: "iframe.messagepreview-content",                 critical: true  },
  { group: "Preview — iframe",
    selector: "iframe.messagepreview-html",                    critical: true  },
  { group: "Preview — iframe",
    selector: "iframe[src*='sfmc-content.com']",               critical: true  },

  // ── IFRAME (inner SFMC app) ────────────────────────────────
  { group: "Dark Mode — App iframe",
    selector: ".mc-app-iframe",                                critical: false },
];

// ─────────────────────────────────────────────────────────────
// Runner
// ─────────────────────────────────────────────────────────────

const results = SELECTORS.map(({ group, selector, critical }) => {
  let found = 0;
  try {
    found = document.querySelectorAll(selector).length;
  } catch (e) {
    // invalid selector — shouldn't happen but guard anyway
  }
  return { group, selector, critical, found, pass: found > 0 };
});

const total    = results.length;
const passed   = results.filter(r => r.pass).length;
const failed   = results.filter(r => !r.pass);
const critFail = failed.filter(r => r.critical);

// ─────────────────────────────────────────────────────────────
// Output
// ─────────────────────────────────────────────────────────────

console.clear();
console.log(
  `%c MC Enhancer — Selector Health Check`,
  'font-size:15px; font-weight:bold; color:#7C7CE8'
);
console.log(
  `%c ${passed}/${total} selectors found   |   ${critFail.length} critical failures`,
  critFail.length > 0
    ? 'color:#F44747; font-weight:bold'
    : 'color:#4ecdc4; font-weight:bold'
);
console.log('─'.repeat(72));

// Group output
const groups = [...new Set(results.map(r => r.group))];
groups.forEach(group => {
  const rows = results.filter(r => r.group === group);
  const allPass = rows.every(r => r.pass);
  console.groupCollapsed(
    `%c ${allPass ? '✓' : '✗'} ${group}`,
    allPass ? 'color:#4ecdc4' : 'color:#F44747; font-weight:bold'
  );
  rows.forEach(r => {
    const icon    = r.pass ? '✓' : (r.critical ? '✗ CRITICAL' : '○ missing');
    const color   = r.pass ? '#858585' : (r.critical ? '#F44747' : '#CE9178');
    const count   = r.pass ? `(${r.found} el)` : '— not found';
    console.log(`%c  ${icon}   ${r.selector}  ${count}`, `color:${color}`);
  });
  console.groupEnd();
});

console.log('─'.repeat(72));

// Summary table
console.table(
  failed.map(r => ({
    Critical : r.critical ? '🔴 YES' : '🟡 no',
    Group    : r.group,
    Selector : r.selector,
  }))
);

if (critFail.length === 0) {
  console.log('%c ✓ All critical selectors are present. Extension should be working.', 'color:#4ecdc4; font-weight:bold');
} else {
  console.warn(`⚠ ${critFail.length} critical selector(s) missing — extension rules for these will have no effect.`);
  console.log('%c → Update content.js to match the new SFMC class names before releasing.', 'color:#CE9178');
}
