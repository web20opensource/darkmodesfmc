/* ── Elements ── */
const tDark    = document.getElementById('toggle-dark');
const tRead    = document.getElementById('toggle-read');
const tEditor  = document.getElementById('toggle-editor');
const rowDark  = document.getElementById('row-dark');
const dotD     = document.getElementById('dot-d');
const dotR     = document.getElementById('dot-r');
const dotE     = document.getElementById('dot-e');
const dotS     = document.getElementById('dot-s');
const statusEl = document.getElementById('status-text');
const schedBadge = document.getElementById('sched-badge');

const modeBtns  = ['manual','system','custom'].map(id => document.getElementById('mode-'+id));
const systemInfo = document.getElementById('system-info');
const customPanel = document.getElementById('custom-panel');
const timeStart  = document.getElementById('time-start');
const timeEnd    = document.getElementById('time-end');
const schedText  = document.getElementById('sched-text');
const schedIco   = document.getElementById('sched-ico');

/* ── Schedule helpers ── */
function parseHHMM(str) {
  const [h, m] = (str || '22:00').split(':').map(Number);
  return h * 60 + (m || 0);
}

function minutesNow() {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}

function isInDarkWindow(start, end) {
  const s = parseHHMM(start), e = parseHHMM(end), n = minutesNow();
  return s <= e ? (n >= s && n < e) : (n >= s || n < e);
}

function minutesUntil(targetHHMM) {
  const t = parseHHMM(targetHHMM);
  const n = minutesNow();
  return t >= n ? t - n : 1440 - n + t;
}

function fmtDuration(mins) {
  if (mins < 60)  return `${mins}m`;
  const h = Math.floor(mins / 60), m = mins % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

/* ── Load saved prefs ── */
chrome.storage.sync.get(
  ['darkModeEnabled','readabilityEnabled','editorEnabled',
   'scheduleMode','scheduleStart','scheduleEnd'],
  (r) => {
    tDark.checked   = r.darkModeEnabled    !== false;
    tRead.checked   = r.readabilityEnabled !== false;
    tEditor.checked = r.editorEnabled      !== false;

    timeStart.value = r.scheduleStart || '22:00';
    timeEnd.value   = r.scheduleEnd   || '07:00';

    setMode(r.scheduleMode || 'manual', false);
    updateStatus();
    updateScheduleInfo();
  }
);

/* ── Toggle handlers ── */
tDark.addEventListener('change', () => {
  const v = tDark.checked;
  chrome.storage.sync.set({ darkModeEnabled: v });
  send('toggleDark', v);
  updateStatus();
});

tRead.addEventListener('change', () => {
  const v = tRead.checked;
  chrome.storage.sync.set({ readabilityEnabled: v });
  send('toggleReadability', v);
  updateStatus();
});

tEditor.addEventListener('change', () => {
  const v = tEditor.checked;
  chrome.storage.sync.set({ editorEnabled: v });
  send('toggleEditor', v);
  updateStatus();
});

/* ── Mode pill handlers ── */
modeBtns.forEach((btn, i) => {
  const modes = ['manual','system','custom'];
  btn.addEventListener('click', () => setMode(modes[i], true));
});

function setMode(mode, save) {
  // Highlight active pill
  ['manual','system','custom'].forEach((m, i) => {
    modeBtns[i].classList.toggle('active', m === mode);
  });

  // Show/hide panels
  systemInfo.classList.toggle('visible', mode === 'system');
  customPanel.classList.toggle('visible', mode === 'custom');

  // Dim the manual dark toggle when schedule is controlling it
  const scheduleControlled = mode !== 'manual';
  rowDark.classList.toggle('disabled', scheduleControlled);
  schedBadge.style.display = scheduleControlled ? '' : 'none';

  if (save) {
    chrome.storage.sync.set({ scheduleMode: mode });
    // Trigger immediate schedule evaluation on SFMC tabs
    send('checkSchedule', true);
  }

  updateScheduleInfo();
  updateStatus();
}

/* ── Time input handlers ── */
timeStart.addEventListener('change', () => {
  chrome.storage.sync.set({ scheduleStart: timeStart.value });
  send('checkSchedule', true);
  updateScheduleInfo();
});

timeEnd.addEventListener('change', () => {
  chrome.storage.sync.set({ scheduleEnd: timeEnd.value });
  send('checkSchedule', true);
  updateScheduleInfo();
});

/* ── Schedule info line ── */
function updateScheduleInfo() {
  const mode  = getCurrentMode();
  const start = timeStart.value || '22:00';
  const end   = timeEnd.value   || '07:00';

  if (mode !== 'custom') return;

  const dark = isInDarkWindow(start, end);

  if (dark) {
    const mins = minutesUntil(end);
    schedIco.textContent = '🌙';
    schedText.innerHTML  =
      `<span class="s-dark">Dark mode active</span> · ` +
      `light in <strong>${fmtDuration(mins)}</strong> (at ${end})`;
  } else {
    const mins = minutesUntil(start);
    schedIco.textContent = '☀️';
    schedText.innerHTML  =
      `<span class="s-light">Light mode active</span> · ` +
      `dark in <strong>${fmtDuration(mins)}</strong> (at ${start})`;
  }

  // Refresh every 30 seconds while popup is open
  clearTimeout(updateScheduleInfo._t);
  updateScheduleInfo._t = setTimeout(updateScheduleInfo, 30_000);
}

/* ── Status bar ── */
function updateStatus() {
  const mode = getCurrentMode();
  const dark = tDark.checked;

  dotD.className = 'dot' + (dark              ? ' d-on' : '');
  dotR.className = 'dot' + (tRead.checked     ? ' r-on' : '');
  dotE.className = 'dot' + (tEditor.checked   ? ' e-on' : '');
  dotS.className = 'dot' + (mode !== 'manual' ? ' s-on' : '');

  const parts = [];
  if (dark)            parts.push('<span style="color:#ae8fd4">Dark</span>');
  if (tRead.checked)   parts.push('<span style="color:#4ecdc4">Read</span>');
  if (tEditor.checked) parts.push('<span style="color:#569CD6">Editor</span>');
  if (mode !== 'manual') parts.push(`<span style="color:#f0a050">${mode}</span>`);

  statusEl.innerHTML = parts.length
    ? parts.join(' · ') + ' <span style="color:#2a2836">on</span>'
    : '<span style="color:#2a2836">All off</span>';
}

function getCurrentMode() {
  if (modeBtns[1].classList.contains('active')) return 'system';
  if (modeBtns[2].classList.contains('active')) return 'custom';
  return 'manual';
}

/* ── Send message to active tab ── */
function send(action, enabled) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { action, enabled }).catch(() => {});
    }
  });
}
