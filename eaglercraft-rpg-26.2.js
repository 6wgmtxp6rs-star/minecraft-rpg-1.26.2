(() => {
  const STORAGE_KEY = 'eaglercraft_rpg_26_2';

  const CLASSES = {
    knight: {
      name: 'Knight',
      color: '#ff4d4d',
      stats: { strength: 15, defense: 12, agility: 8, intellect: 4, faith: 5 },
      gear: ['iron_sword', 'shield', 'iron_chestplate']
    },
    mage: {
      name: 'Mage',
      color: '#4da3ff',
      stats: { strength: 5, defense: 6, agility: 7, intellect: 18, faith: 7 },
      gear: ['stone_axe', 'leather_chestplate', 'book']
    },
    ranger: {
      name: 'Ranger',
      color: '#4dff88',
      stats: { strength: 7, defense: 7, agility: 18, intellect: 9, faith: 5 },
      gear: ['bow', 'arrow', 'leather_helmet']
    },
    rogue: {
      name: 'Rogue',
      color: '#b08cff',
      stats: { strength: 8, defense: 6, agility: 20, intellect: 7, faith: 4 },
      gear: ['iron_sword', 'leather_boots', 'dark_cloak']
    },
    paladin: {
      name: 'Paladin',
      color: '#ffd166',
      stats: { strength: 12, defense: 14, agility: 8, intellect: 9, faith: 18 },
      gear: ['iron_axe', 'shield', 'chainmail_chestplate']
    }
  };

  const DEFAULT_STATE = {
    className: 'knight',
    level: 1,
    xp: 0,
    gold: 100,
    mana: 100,
    stamina: 100,
    questStage: 1,
    townLevel: 1,
    zoneLevel: 1,
    skillPoints: 3,
    stats: {
      strength: 10,
      defense: 10,
      agility: 10,
      intellect: 10,
      faith: 10
    }
  };

  const readState = () => {
    try {
      return { ...DEFAULT_STATE, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
    } catch (e) {
      return { ...DEFAULT_STATE };
    }
  };

  const saveState = (state) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  let state = readState();
  let ui = null;

  function ensureState() {
    state = readState();
    if (!state.stats) state.stats = { ...DEFAULT_STATE.stats };
    if (!state.className) state.className = 'knight';
  }

  function applyClass(classKey) {
    ensureState();
    const selected = CLASSES[classKey];
    if (!selected) return;

    state.className = classKey;
    state.stats = { ...DEFAULT_STATE.stats, ...selected.stats };
    state.level = Math.max(1, state.level);
    state.xp = 0;
    state.skillPoints = clamp((state.skillPoints || 3) + 1, 1, 20);

    console.log('[EaglercraftRPG] Selected class:', selected.name);
    saveState(state);
    renderHUD();
    if (window && typeof window.alert === 'function') {
      window.alert('Class selected: ' + selected.name + '');
    }
  }

  function gainXP(amount) {
    ensureState();
    state.xp += Number(amount) || 0;
    while (state.xp >= 100) {
      state.xp -= 100;
      state.level += 1;
      state.skillPoints += 1;
      state.mana = 100;
      state.stamina = 100;
    }
    saveState(state);
    renderHUD();
  }

  function buildUI() {
    ensureState();
    if (ui) return ui;

    const panel = document.createElement('div');
    panel.id = 'eaglercraft-rpg-panel';
    panel.style.position = 'fixed';
    panel.style.right = '16px';
    panel.style.top = '16px';
    panel.style.zIndex = '999999';
    panel.style.width = '260px';
    panel.style.padding = '12px';
    panel.style.borderRadius = '10px';
    panel.style.background = 'rgba(12, 18, 30, 0.86)';
    panel.style.border = '1px solid rgba(255,255,255,0.15)';
    panel.style.boxShadow = '0 10px 30px rgba(0,0,0,0.35)';
    panel.style.color = '#f5f5f5';
    panel.style.fontFamily = 'monospace';
    panel.style.fontSize = '12px';
    panel.style.display = 'block';

    const title = document.createElement('div');
    title.textContent = 'Minecraft RPG 26.2';
    title.style.color = '#ffd166';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '8px';
    panel.appendChild(title);

    const stats = document.createElement('div');
    stats.id = 'eaglercraft-rpg-stats';
    stats.style.lineHeight = '1.6';
    stats.style.marginBottom = '10px';
    panel.appendChild(stats);

    const classWrap = document.createElement('div');
    classWrap.style.display = 'grid';
    classWrap.style.gridTemplateColumns = 'repeat(2, minmax(0,1fr))';
    classWrap.style.gap = '6px';

    Object.keys(CLASSES).forEach((key) => {
      const btn = document.createElement('button');
      btn.textContent = CLASSES[key].name;
      btn.style.background = CLASSES[key].color;
      btn.style.color = '#111';
      btn.style.border = 'none';
      btn.style.borderRadius = '6px';
      btn.style.padding = '6px 8px';
      btn.style.cursor = 'pointer';
      btn.addEventListener('click', () => applyClass(key));
      classWrap.appendChild(btn);
    });

    panel.appendChild(classWrap);
    document.body.appendChild(panel);
    ui = panel;
    renderHUD();
    return panel;
  }

  function renderHUD() {
    ensureState();
    if (!ui) return;
    const statsNode = document.getElementById('eaglercraft-rpg-stats');
    if (!statsNode) return;

    const className = CLASSES[state.className]?.name || 'Knight';
    statsNode.innerHTML = [
      '<strong>Class:</strong> ' + className + '<br>',
      '<strong>Level:</strong> ' + state.level + '<br>',
      '<strong>XP:</strong> ' + state.xp + '/100<br>',
      '<strong>Gold:</strong> ' + state.gold + '<br>',
      '<strong>Mana:</strong> ' + state.mana + '<br>',
      '<strong>Stamina:</strong> ' + state.stamina + '<br>',
      '<strong>Quest:</strong> ' + state.questStage + '<br>',
      '<strong>Town:</strong> ' + state.townLevel + '<br>',
      '<strong>Zone:</strong> ' + state.zoneLevel + '<br>',
      '<strong>Skill Points:</strong> ' + state.skillPoints
    ].join('');
  }

  function bindControls() {
    document.addEventListener('keydown', (event) => {
      if (event.key && event.key.toLowerCase() === 'r') {
        const panel = document.getElementById('eaglercraft-rpg-panel');
        if (panel) {
          panel.style.display = (panel.style.display === 'none') ? 'block' : 'none';
        }
      }
    });
  }

  function init() {
    ensureState();
    buildUI();
    bindControls();

    if (window) {
      window.EaglerRPG = {
        state,
        CLASSES,
        applyClass,
        gainXP,
        saveState,
        readState,
        renderHUD
      };
    }

    console.log('[EaglercraftRPG] Initialized. Press R to toggle the RPG panel.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
