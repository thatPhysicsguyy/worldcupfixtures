/* ============================================================
   World Cup 2026 Predictor — app.js
   ============================================================ */

// ── DATA ────────────────────────────────────────────────────

const FLAGS = {
  'Mexico': '🇲🇽', 'South Africa': '🇿🇦', 'South Korea': '🇰🇷', 'Czechia': '🇨🇿',
  'Canada': '🇨🇦', 'Bosnia and Herzegovina': '🇧🇦', 'Qatar': '🇶🇦', 'Switzerland': '🇨🇭',
  'Brazil': '🇧🇷', 'Morocco': '🇲🇦', 'Haiti': '🇭🇹', 'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  'United States': '🇺🇸', 'Paraguay': '🇵🇾', 'Australia': '🇦🇺', 'Türkiye': '🇹🇷',
  'Germany': '🇩🇪', 'Curaçao': '🇨🇼', 'Ivory Coast': '🇨🇮', 'Ecuador': '🇪🇨',
  'Netherlands': '🇳🇱', 'Japan': '🇯🇵', 'Tunisia': '🇹🇳', 'Uzbekistan': '🇺🇿',
  'Spain': '🇪🇸', 'Cape Verde': '🇨🇻', 'Belgium': '🇧🇪', 'Egypt': '🇪🇬',
  'Saudi Arabia': '🇸🇦', 'Uruguay': '🇺🇾', 'Iran': '🇮🇷', 'New Zealand': '🇳🇿',
  'France': '🇫🇷', 'Senegal': '🇸🇳', 'Norway': '🇳🇴', 'Sweden': '🇸🇪',
  'Argentina': '🇦🇷', 'Algeria': '🇩🇿', 'Austria': '🇦🇹', 'Jordan': '🇯🇴',
  'Portugal': '🇵🇹', 'Ghana': '🇬🇭', 'Croatia': '🇭🇷', 'DR Congo': '🇨🇩',
  'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Colombia': '🇨🇴', 'Panama': '🇵🇦', 'Iraq': '🇮🇶',
};

const GROUPS = [
  {
    id: 'A', teams: ['Mexico', 'South Africa', 'South Korea', 'Czechia'],
    fixtures: [
      ['Jun 11', 'Mexico', 'South Africa'], ['Jun 11', 'South Korea', 'Czechia'],
      ['Jun 17', 'Mexico', 'South Korea'],  ['Jun 17', 'South Africa', 'Czechia'],
      ['Jun 24', 'Mexico', 'Czechia'],      ['Jun 24', 'South Korea', 'South Africa'],
    ],
  },
  {
    id: 'B', teams: ['Canada', 'Bosnia and Herzegovina', 'Qatar', 'Switzerland'],
    fixtures: [
      ['Jun 12', 'Canada', 'Bosnia and Herzegovina'], ['Jun 13', 'Qatar', 'Switzerland'],
      ['Jun 18', 'Canada', 'Qatar'],                  ['Jun 18', 'Bosnia and Herzegovina', 'Switzerland'],
      ['Jun 25', 'Canada', 'Switzerland'],            ['Jun 25', 'Bosnia and Herzegovina', 'Qatar'],
    ],
  },
  {
    id: 'C', teams: ['Brazil', 'Morocco', 'Haiti', 'Scotland'],
    fixtures: [
      ['Jun 13', 'Brazil', 'Morocco'],  ['Jun 13', 'Haiti', 'Scotland'],
      ['Jun 19', 'Brazil', 'Haiti'],    ['Jun 19', 'Morocco', 'Scotland'],
      ['Jun 25', 'Brazil', 'Scotland'], ['Jun 25', 'Morocco', 'Haiti'],
    ],
  },
  {
    id: 'D', teams: ['United States', 'Paraguay', 'Australia', 'Türkiye'],
    fixtures: [
      ['Jun 12', 'United States', 'Paraguay'], ['Jun 13', 'Australia', 'Türkiye'],
      ['Jun 19', 'United States', 'Australia'], ['Jun 19', 'Paraguay', 'Türkiye'],
      ['Jun 26', 'United States', 'Türkiye'],  ['Jun 26', 'Paraguay', 'Australia'],
    ],
  },
  {
    id: 'E', teams: ['Germany', 'Curaçao', 'Ivory Coast', 'Ecuador'],
    fixtures: [
      ['Jun 14', 'Germany', 'Curaçao'],     ['Jun 14', 'Ivory Coast', 'Ecuador'],
      ['Jun 20', 'Germany', 'Ivory Coast'], ['Jun 20', 'Curaçao', 'Ecuador'],
      ['Jun 26', 'Germany', 'Ecuador'],     ['Jun 26', 'Curaçao', 'Ivory Coast'],
    ],
  },
  {
    id: 'F', teams: ['Netherlands', 'Japan', 'Tunisia', 'Uzbekistan'],
    fixtures: [
      ['Jun 14', 'Netherlands', 'Japan'],      ['Jun 14', 'Tunisia', 'Uzbekistan'],
      ['Jun 20', 'Netherlands', 'Tunisia'],    ['Jun 20', 'Japan', 'Uzbekistan'],
      ['Jun 26', 'Netherlands', 'Uzbekistan'], ['Jun 26', 'Japan', 'Tunisia'],
    ],
  },
  {
    id: 'G', teams: ['Belgium', 'Egypt', 'Iran', 'New Zealand'],
    fixtures: [
      ['Jun 15', 'Belgium', 'Egypt'],       ['Jun 15', 'Iran', 'New Zealand'],
      ['Jun 21', 'Belgium', 'Iran'],        ['Jun 21', 'Egypt', 'New Zealand'],
      ['Jun 26', 'Belgium', 'New Zealand'], ['Jun 26', 'Iran', 'Egypt'],
    ],
  },
  {
    id: 'H', teams: ['Spain', 'Cape Verde', 'Saudi Arabia', 'Uruguay'],
    fixtures: [
      ['Jun 15', 'Spain', 'Cape Verde'],       ['Jun 15', 'Saudi Arabia', 'Uruguay'],
      ['Jun 21', 'Spain', 'Saudi Arabia'],     ['Jun 21', 'Cape Verde', 'Uruguay'],
      ['Jun 27', 'Spain', 'Uruguay'],          ['Jun 27', 'Cape Verde', 'Saudi Arabia'],
    ],
  },
  {
    id: 'I', teams: ['France', 'Senegal', 'Norway', 'Sweden'],
    fixtures: [
      ['Jun 16', 'France', 'Senegal'], ['Jun 16', 'Norway', 'Sweden'],
      ['Jun 22', 'France', 'Norway'],  ['Jun 22', 'Senegal', 'Sweden'],
      ['Jun 27', 'France', 'Sweden'],  ['Jun 27', 'Norway', 'Senegal'],
    ],
  },
  {
    id: 'J', teams: ['Argentina', 'Algeria', 'Austria', 'Jordan'],
    fixtures: [
      ['Jun 16', 'Argentina', 'Algeria'], ['Jun 16', 'Austria', 'Jordan'],
      ['Jun 22', 'Argentina', 'Austria'], ['Jun 22', 'Algeria', 'Jordan'],
      ['Jun 27', 'Argentina', 'Jordan'],  ['Jun 27', 'Algeria', 'Austria'],
    ],
  },
  {
    id: 'K', teams: ['Portugal', 'Ghana', 'Croatia', 'DR Congo'],
    fixtures: [
      ['Jun 17', 'Portugal', 'Ghana'],    ['Jun 17', 'Croatia', 'DR Congo'],
      ['Jun 23', 'Portugal', 'Croatia'],  ['Jun 23', 'Ghana', 'DR Congo'],
      ['Jun 27', 'Portugal', 'DR Congo'], ['Jun 27', 'Ghana', 'Croatia'],
    ],
  },
  {
    id: 'L', teams: ['England', 'Colombia', 'Panama', 'Iraq'],
    fixtures: [
      ['Jun 17', 'England', 'Colombia'], ['Jun 17', 'Panama', 'Iraq'],
      ['Jun 23', 'England', 'Panama'],   ['Jun 23', 'Colombia', 'Iraq'],
      ['Jun 27', 'England', 'Iraq'],     ['Jun 27', 'Panama', 'Colombia'],
    ],
  },
];

const R32_MATCHES = [
  { id: 'r32_1',  label: 'Match 1',              t1: 'W_A',   t2: 'R_B'   },
  { id: 'r32_2',  label: 'Match 2',              t1: 'W_B',   t2: 'R_C'   },
  { id: 'r32_3',  label: 'Match 3',              t1: 'W_C',   t2: 'R_D'   },
  { id: 'r32_4',  label: 'Match 4',              t1: 'W_D',   t2: 'R_A'   },
  { id: 'r32_5',  label: 'Match 5',              t1: 'W_E',   t2: 'R_F'   },
  { id: 'r32_6',  label: 'Match 6',              t1: 'W_F',   t2: 'R_E'   },
  { id: 'r32_7',  label: 'Match 7',              t1: 'W_G',   t2: 'R_H'   },
  { id: 'r32_8',  label: 'Match 8',              t1: 'W_H',   t2: 'R_G'   },
  { id: 'r32_9',  label: 'Match 9',              t1: 'W_I',   t2: 'R_J'   },
  { id: 'r32_10', label: 'Match 10',             t1: 'W_J',   t2: 'R_I'   },
  { id: 'r32_11', label: 'Match 11',             t1: 'W_K',   t2: 'R_L'   },
  { id: 'r32_12', label: 'Match 12',             t1: 'W_L',   t2: 'R_K'   },
  { id: 'r32_13', label: 'Match 13 (3rd place)', t1: '3RD_1', t2: '3RD_2' },
  { id: 'r32_14', label: 'Match 14 (3rd place)', t1: '3RD_3', t2: '3RD_4' },
  { id: 'r32_15', label: 'Match 15 (3rd place)', t1: '3RD_5', t2: '3RD_6' },
  { id: 'r32_16', label: 'Match 16 (3rd place)', t1: '3RD_7', t2: '3RD_8' },
];

const R16_MATCHES = [
  { id: 'r16_1', label: 'R16 Match 1', t1: 'WIN_r32_1',  t2: 'WIN_r32_2'  },
  { id: 'r16_2', label: 'R16 Match 2', t1: 'WIN_r32_3',  t2: 'WIN_r32_4'  },
  { id: 'r16_3', label: 'R16 Match 3', t1: 'WIN_r32_5',  t2: 'WIN_r32_6'  },
  { id: 'r16_4', label: 'R16 Match 4', t1: 'WIN_r32_7',  t2: 'WIN_r32_8'  },
  { id: 'r16_5', label: 'R16 Match 5', t1: 'WIN_r32_9',  t2: 'WIN_r32_10' },
  { id: 'r16_6', label: 'R16 Match 6', t1: 'WIN_r32_11', t2: 'WIN_r32_12' },
  { id: 'r16_7', label: 'R16 Match 7', t1: 'WIN_r32_13', t2: 'WIN_r32_14' },
  { id: 'r16_8', label: 'R16 Match 8', t1: 'WIN_r32_15', t2: 'WIN_r32_16' },
];

const QF_MATCHES = [
  { id: 'qf_1', label: 'Quarterfinal 1', t1: 'WIN_r16_1', t2: 'WIN_r16_2' },
  { id: 'qf_2', label: 'Quarterfinal 2', t1: 'WIN_r16_3', t2: 'WIN_r16_4' },
  { id: 'qf_3', label: 'Quarterfinal 3', t1: 'WIN_r16_5', t2: 'WIN_r16_6' },
  { id: 'qf_4', label: 'Quarterfinal 4', t1: 'WIN_r16_7', t2: 'WIN_r16_8' },
];

const SF_MATCHES = [
  { id: 'sf_1', label: 'Semi-Final 1', t1: 'WIN_qf_1', t2: 'WIN_qf_2' },
  { id: 'sf_2', label: 'Semi-Final 2', t1: 'WIN_qf_3', t2: 'WIN_qf_4' },
];

// ── STATE ───────────────────────────────────────────────────

const S = {
  groupPicks:   {},
  groupWinners: {},
  groupRunnerUps: {},
  r32Picks: {},
  r16Picks: {},
  qfPicks:  {},
  sfPicks:  {},
  finalPick: null,
};

// ── HELPERS ─────────────────────────────────────────────────

/** Returns the flag emoji for a team name, or a fallback. */
function flag(team) {
  return FLAGS[team] || '🏳️';
}

/** Builds a stable key for a group fixture. */
function pickKey(groupId, t1, t2) {
  return `${groupId}:${t1}v${t2}`;
}

/**
 * Returns the four teams in a group sorted by points from current picks,
 * highest first (winner, runner-up, 3rd, 4th).
 */
function groupStandings(groupId) {
  const group = GROUPS.find(g => g.id === groupId);
  const pts = {};
  group.teams.forEach(t => { pts[t] = 0; });
  group.fixtures.forEach(([, t1, t2]) => {
    const k = pickKey(groupId, t1, t2);
    if (S.groupPicks[k]) {
      pts[S.groupPicks[k]] = (pts[S.groupPicks[k]] || 0) + 3;
    }
  });
  return group.teams.slice().sort((a, b) => (pts[b] || 0) - (pts[a] || 0));
}

/** Recalculates all group winners and runners-up. */
function computeStandings() {
  GROUPS.forEach(g => {
    const st = groupStandings(g.id);
    S.groupWinners[g.id]   = st[0];
    S.groupRunnerUps[g.id] = st[1];
  });
}

/**
 * Resolves a slot key (e.g. "W_A", "R_B", "3RD_3", "WIN_r32_1")
 * to an actual team name, or null if not yet determined.
 */
function resolveTeam(key, prevPicks) {
  if (!key) return null;
  if (key.startsWith('W_'))   return S.groupWinners[key.slice(2)]   || null;
  if (key.startsWith('R_'))   return S.groupRunnerUps[key.slice(2)] || null;
  if (key.startsWith('3RD_')) {
    const idx    = parseInt(key.slice(4)) - 1;
    const thirds = GROUPS.map(g => groupStandings(g.id)[2]).filter(Boolean);
    return thirds[idx] || null;
  }
  if (key.startsWith('WIN_')) return (prevPicks || {})[key.slice(4)] || null;
  return key;
}

// ── PERSISTENCE ─────────────────────────────────────────────

function saveState() {
  try { localStorage.setItem('wc2026_state', JSON.stringify(S)); } catch (e) { /* private mode */ }
}

function loadState() {
  try {
    const saved = localStorage.getItem('wc2026_state');
    if (saved) Object.assign(S, JSON.parse(saved));
  } catch (e) { /* ignore */ }
}

// ── RENDER: GROUP STAGE ─────────────────────────────────────

function renderGroups() {
  const container = document.getElementById('groups-container');
  container.innerHTML = '';

  GROUPS.forEach(group => {
    const card = document.createElement('div');
    card.className = 'group-card';

    const flags = group.teams.map(t => `<span>${flag(t)}</span>`).join('');

    const fixturesHTML = group.fixtures.map(([date, t1, t2]) => {
      const k      = pickKey(group.id, t1, t2);
      const picked = S.groupPicks[k];
      return `
        <div class="fixture">
          <span class="fixture-date">${date}</span>
          <button
            class="team-btn${picked === t1 ? ' picked' : ''}"
            onclick="pickGroup('${group.id}','${t1}','${t2}','${t1}')">
            ${flag(t1)} ${t1}
          </button>
          <span class="vs-dot">·</span>
          <button
            class="team-btn${picked === t2 ? ' picked' : ''}"
            onclick="pickGroup('${group.id}','${t1}','${t2}','${t2}')">
            ${flag(t2)} ${t2}
          </button>
        </div>`;
    }).join('');

    card.innerHTML = `
      <div class="group-label">Group ${group.id} <span class="group-flags">${flags}</span></div>
      ${fixturesHTML}`;
    container.appendChild(card);
  });

  // Update progress bar
  const done = Object.keys(S.groupPicks).length;
  document.getElementById('group-progress').style.width = (done / 36 * 100) + '%';
  document.getElementById('group-progress-label').textContent = `${done} / 36 fixtures picked`;
}

// ── INTERACTION: GROUP STAGE ─────────────────────────────────

function pickGroup(groupId, t1, t2, winner) {
  const k = pickKey(groupId, t1, t2);
  S.groupPicks[k] === winner ? delete S.groupPicks[k] : (S.groupPicks[k] = winner);
  computeStandings();
  renderGroups();
  refreshKnockouts();
  saveState();
}

// ── RENDER: KNOCKOUT ROUNDS ──────────────────────────────────

function renderKnockout(containerId, matches, picks, prevPicks) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const grid = document.createElement('div');
  grid.className = 'bracket-round';

  matches.forEach(m => {
    const t1  = resolveTeam(m.t1, prevPicks);
    const t2  = resolveTeam(m.t2, prevPicks);
    const t1d = t1 || 'TBD';
    const t2d = t2 || 'TBD';
    const tbd = !t1 || !t2;
    const picked = picks[m.id];

    const clickT1 = !tbd ? `onclick="pickKnockout('${m.id}','${t1d}','${containerId}')"` : '';
    const clickT2 = !tbd ? `onclick="pickKnockout('${m.id}','${t2d}','${containerId}')"` : '';

    grid.innerHTML += `
      <div class="bracket-match">
        <div class="match-label">${m.label}</div>
        <div class="bracket-team${(!tbd && picked === t1d) ? ' picked' : ''} ${!t1 ? 'tbd' : ''}" ${clickT1}>
          ${flag(t1d)} ${t1d}
        </div>
        <div class="bracket-divider">vs</div>
        <div class="bracket-team${(!tbd && picked === t2d) ? ' picked' : ''} ${!t2 ? 'tbd' : ''}" ${clickT2}>
          ${flag(t2d)} ${t2d}
        </div>
      </div>`;
  });

  container.innerHTML = '';
  container.appendChild(grid);
}

// ── RENDER: FINAL ─────────────────────────────────────────────

function renderFinal() {
  const t1  = S.sfPicks['sf_1'] || null;
  const t2  = S.sfPicks['sf_2'] || null;
  const fin = document.getElementById('final-teams-display');

  const makeBox = (team, fallbackLabel) => {
    if (!team) {
      return `<div class="final-team-box tbd">
        <span class="team-flag">🏟️</span>
        <span class="team-name">${fallbackLabel}</span>
      </div>`;
    }
    const isWinner = S.finalPick === team;
    return `<div class="final-team-box${isWinner ? ' winner' : ''}" onclick="pickFinal('${team}')">
      <span class="team-flag">${flag(team)}</span>
      <span class="team-name">${team}</span>
    </div>`;
  };

  fin.innerHTML =
    makeBox(t1, 'Semi 1 winner') +
    '<span class="final-vs">VS</span>' +
    makeBox(t2, 'Semi 2 winner');

  const champBox = document.getElementById('champion-box');
  if (S.finalPick && t1 && t2) {
    champBox.style.display = 'block';
    document.getElementById('champion-name').textContent = `${flag(S.finalPick)} ${S.finalPick}`;
  } else {
    champBox.style.display = 'none';
  }
}

// ── INTERACTION: KNOCKOUT ─────────────────────────────────────

function pickKnockout(matchId, team, containerId) {
  const picksMap = {
    'r32-container': S.r32Picks,
    'r16-container': S.r16Picks,
    'qf-container':  S.qfPicks,
    'sf-container':  S.sfPicks,
  };
  const picks = picksMap[containerId];
  if (!picks) return;
  picks[matchId] === team ? delete picks[matchId] : (picks[matchId] = team);
  refreshKnockouts();
  saveState();
}

function pickFinal(team) {
  S.finalPick = S.finalPick === team ? null : team;
  renderFinal();
  saveState();
}

/** Re-renders whichever knockout tab is currently visible. */
function refreshKnockouts() {
  const active = document.querySelector('.tab-content.active');
  if (!active) return;
  const id = active.id;
  if (id === 'tab-r32') renderKnockout('r32-container', R32_MATCHES, S.r32Picks, {});
  if (id === 'tab-r16') renderKnockout('r16-container', R16_MATCHES, S.r16Picks, S.r32Picks);
  if (id === 'tab-qf')  renderKnockout('qf-container',  QF_MATCHES,  S.qfPicks,  S.r16Picks);
  if (id === 'tab-sf')  { renderKnockout('sf-container', SF_MATCHES, S.sfPicks, S.qfPicks); renderFinal(); }
}

// ── TAB NAVIGATION ────────────────────────────────────────────

function switchTab(name) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  document.getElementById('tab-' + name).classList.add('active');

  const tabOrder = { groups: 0, r32: 1, r16: 2, qf: 3, sf: 4 };
  document.querySelectorAll('.tab-btn')[tabOrder[name]].classList.add('active');

  computeStandings();
  if (name === 'r32') renderKnockout('r32-container', R32_MATCHES, S.r32Picks, {});
  if (name === 'r16') renderKnockout('r16-container', R16_MATCHES, S.r16Picks, S.r32Picks);
  if (name === 'qf')  renderKnockout('qf-container',  QF_MATCHES,  S.qfPicks,  S.r16Picks);
  if (name === 'sf')  { renderKnockout('sf-container', SF_MATCHES, S.sfPicks, S.qfPicks); renderFinal(); }
}

// ── INIT ─────────────────────────────────────────────────────

loadState();
computeStandings();
renderGroups();
