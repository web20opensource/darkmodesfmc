/**
 * MC Enhancer — background.js (service worker)
 * ─────────────────────────────────────────────────────────────
 * Runs a chrome.alarm every minute to check the dark mode
 * schedule and broadcast to all active SFMC tabs.
 * Works even when the popup is closed.
 */

const SFMC_PATTERNS = [
  'https://mc.s7.exacttarget.com/*',
  'https://*.exacttarget.com/*',
  'https://*.marketingcloud.com/*',
];

/* ── Setup alarm on install / browser startup ── */
chrome.runtime.onInstalled.addListener(setupAlarm);
chrome.runtime.onStartup.addListener(setupAlarm);

function setupAlarm() {
  chrome.alarms.get('mcScheduleCheck', (a) => {
    if (!a) {
      chrome.alarms.create('mcScheduleCheck', { periodInMinutes: 1 });
    }
  });
}

/* ── Alarm fires every minute ── */
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name !== 'mcScheduleCheck') return;
  broadcastScheduleCheck();
});

/* ── Query all SFMC tabs and send checkSchedule message ── */
function broadcastScheduleCheck() {
  chrome.tabs.query({ url: SFMC_PATTERNS }, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, { action: 'checkSchedule' })
        .catch(() => {}); // tab may not have content script ready — ignore
    });
  });
}
