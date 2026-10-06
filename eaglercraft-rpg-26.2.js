(() => {
  const STORAGE_KEY = 'eaglercraft_rpg_26_2_prototype';

  const CLASSES = {
    knight: {
      name: 'Knight',
      color: '#ff4d4d',
      stats: { strength: 17, defense: 14, agility: 8, intellect: 5, faith: 6 },
      abilities: ['Strike', 'Guard', 'Shield Bash'],
      icon: '⚔️'
    },
    mage: {
      name: 'Mage',
      color: '#4da3ff',
      stats: { strength: 5, defense: 7, agility: 9, intellect: 20, faith: 8 },
      abilities: ['Firebolt', 'Heal', 'Arcane Nova'],
      icon: '✨'
    },
    ranger: {
      name: 'Ranger',
      color: '#57e389',
      stats: { strength: 8, defense: 8, agility: 18, intellect: 9, faith: 6 },
      abilities: ['Volley', 'Track', 'Dodge'],
      icon: '🏹'
    },
    rogue: {
      name: 'Rogue',
      color: '#b98cff',
      stats: { strength: 10, defense: 7, agility: 20, intellect: 8, faith: 5 },
      abilities: ['Backstab', 'Quick Step', 'Poison'],
      icon: '🗡️'
    },
    paladin: {
      name: 'Paladin',
      color: '#ffd166',
      stats: { strength: 13, defense: 15, agility: 9, intellect: 10, faith: 20 },
      abilities: ['Holy Smite', 'Radiant Heal', 'Aegis'],
      icon: '🛡️'
    }
  };

  const QUESTS = [
    { id: 1, name: 'The Fallen Gate', objective: 'Reach the ruined gate.', reward: 30 },
    { id: 2, name: 'Wolf Pack', objective: 'Defeat 2 wolves.', reward: 50 },
    { id: 3, name: 'Dungeon Guardian', objective: 'Defeat the dungeon guardian.', reward: 80 },
    { id: 4, name: 'Town Builder', objective: 'Upgrade the town hall.', reward: 100 },
    { id: 5, name: 'The Final Trial', objective: 'Defeat the dark lord.', reward: 150 }
  ];

  const ENEMIES = [
    { name: 'Wolf', hp: 35, damage: 6, xp: 15, gold: 12, color: '#8d8d8d' },
    { name: 'Goblin', hp: 50, damage: 8, xp: 20, gold: 15, color: '#7bd389' },
    { name: 'Skeleton', hp: 65, damage: 10, xp: 25, gold: 18, color: '#d9d9d9' },
    { name: 'Shadow Knight', hp: 90, damage: 15, xp: 40, gold: 28, color: '#b08cff' },
    { name: 'Dark Lord', hp: 180, damage: 22, xp: 90, gold: 60, color: '#ff4d4d' }
  ];

  const DEFAULT_STATE = {
    className: 'knight',
    level: 1,
    xp: 0,
    gold: 100,
    mana: 100,
    stamina: 100,
    hp: 100,
    maxHp: 100,
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
    },
    currentEnemy: null,
    bossDefeated: false,
    lastLog: 'A new hero awakens.'
  };

  function readState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return { ...DEFAULT_STATE, ...saved, stats: { ...DEFAULT_STATE.stats, ...(saved.stats || {}) } };
    } catch (e) {
      return { ...DEFAULT_STATE };
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function getCurrentQuest() {
    return QUESTS[Math.min(state.questStage - 1, QUESTS.length - 1)] || QUESTS[QUESTS.length - 1];
  }

  function ensureClassState() {
    if (!CLASSES[state.className]) state.className = 'knight';
    if (!state.stats) state.stats = { ...DEFAULT_STATE.stats };
    if (!state.currentEnemy) state.currentEnemy = null;
  }

  let state = readState();
  let ui = null;

  function applyClass(classKey) {
    const selected = CLASSES[classKey];
    if (!selected) return;
    state.className = classKey;
    state.stats = { ...selected.stats };
    state.hp = 100;
    state.maxHp = 100;
    state.mana = 100;
    state.stamina = 100;
    state.lastLog = 'Class selected: ' + selected.name;
    saveState();
    renderHUD();
  }

  function gainXP(amount) {
    state.xp += Number(amount) || 0;
    while (state.xp >= 100) {
      state.xp -= 100;
      state.level += 1;
      state.skillPoints += 1;
      state.maxHp += 10;
      state.hp = state.maxHp;
      state.mana = 100;
      state.stamina = 100;
      state.lastLog = 'Level up! You reached level ' + state.level + '.';
    }
    saveState();
    renderHUD();
  }

  function addGold(amount) {
    state.gold += Number(amount) || 0;
    saveState();
    renderHUD();
  }

  function damagePlayer(amount) {
    const actual = Math.max(1, Number(amount) || 1) - Math.floor(state.stats.defense / 5);
    state.hp = clamp(state.hp - actual, 0, state.maxHp);
    if (state.hp <= 0) {
      state.hp = state.maxHp;
      state.gold = Math.max(0, state.gold - 10);
      state.lastLog = 'You were defeated and lost 10 gold.';
    }
    saveState();
    renderHUD();
  }

  function healPlayer(amount) {
    const gained = Number(amount) || 10;
    state.hp = clamp(state.hp + gained, 0, state.maxHp);
    state.mana = clamp(state.mana - 10, 0, 100);
    state.lastLog = 'You restored ' + gained + ' health.';
    saveState();
    renderHUD();
  }

  function createEnemy() {
    const candidate = ENEMIES[Math.min(state.zoneLevel - 1, ENEMIES.length - 1)] || ENEMIES[0];
    return {
      name: candidate.name,
      hp: candidate.hp + (state.level * 4),
      maxHp: candidate.hp + (state.level * 4),
      damage: candidate.damage + state.level,
      xp: candidate.xp + state.level,
      gold: candidate.gold + state.zoneLevel,
      color: candidate.color
    };
  }

  function startEncounter() {
    state.currentEnemy = createEnemy();
    state.lastLog = 'A wild ' + state.currentEnemy.name + ' appears!';
    saveState();
    renderHUD();
  }

  function finishQuestIfReady() {
    const quest = getCurrentQuest();
    if (state.questStage >= QUESTS.length) {
      state.lastLog = 'The final trial is complete.';
      return;
    }

    if (state.zoneLevel >= state.questStage + 1) {
      state.questStage += 1;
      state.townLevel += 1;
      state.gold += quest.reward;
      state.lastLog = 'Quest complete: ' + quest.name + ' rewarded ' + quest.reward + ' gold.';
      gainXP(25);
      saveState();
      renderHUD();
    }
  }

  function handleCombat(action) {
    if (!state.currentEnemy) {
      startEncounter();
      return;
    }

    const enemy = state.currentEnemy;
    const classData = CLASSES[state.className];
    let damage = 0;
    let critBonus = 0;

    if (action === 'strike') {
      damage = 8 + state.stats.strength;
      critBonus = Math.random() > 0.75 ? 10 : 0;
    } else if (action === 'magic') {
      if (state.mana < 12) {
        state.lastLog = 'Not enough mana.';
        saveState();
        renderHUD();
        return;
      }
      state.mana -= 12;
      damage = 12 + state.stats.intellect;
      critBonus = Math.random() > 0.65 ? 18 : 0;
    } else if (action === 'heal') {
      healPlayer(18 + state.stats.faith);
      state.currentEnemy = enemy;
      return;
    } else if (action === 'dodge') {
      state.stamina = clamp(state.stamina - 5, 0, 100);
      state.lastLog = 'You dodge the attack.';
      saveState();
      renderHUD();
      return;
    } else {
      damage = 6 + state.stats.agility;
    }

    const totalDamage = damage + critBonus;
    enemy.hp = clamp(enemy.hp - totalDamage, 0, enemy.maxHp);
    state.lastLog = classData.name + ' deals ' + totalDamage + ' damage to ' + enemy.name + '.';

    if (enemy.hp <= 0) {
      gainXP(enemy.xp);
      addGold(enemy.gold);
      state.currentEnemy = null;
      state.zoneLevel = Math.min(10, state.zoneLevel + 1);
      state.lastLog = 'Enemy defeated! ' + enemy.name + ' dropped ' + enemy.gold + ' gold and ' + enemy.xp + ' XP.';
      finishQuestIfReady();
      saveState();
      renderHUD();
      return;
    }

    const enemyHit = Math.max(1, enemy.damage - Math.floor(state.stats.defense / 3));
    damagePlayer(enemyHit);
    state.lastLog += ' Enemy strikes back for ' + enemyHit + ' damage.';
    saveState();
    renderHUD();
  }

  function renderHUD() {
    ensureClassState();
    if (!ui) return;

    const enemy = state.currentEnemy;
    const quest = getCurrentQuest();
    const classInfo = CLASSES[state.className] || CLASSES.knight;

    const enemyHtml = enemy
      ? '<div style="margin-top: 8px; color: ' + enemy.color + '; font-weight: bold;">Enemy: ' + enemy.name + '<br>HP: ' + enemy.hp + '/' + enemy.maxHp + '</div>'
      : '<div style="margin-top: 8px; color: #8fe3ff;">No enemy active. Start a fight.</div>';

    const heroStats = [
      '<strong>Class:</strong> ' + classInfo.icon + ' ' + classInfo.name,
      '<strong>Level:</strong> ' + state.level,
      '<strong>HP:</strong> ' + state.hp + '/' + state.maxHp,
      '<strong>Mana:</strong> ' + state.mana,
      '<strong>Stamina:</strong> ' + state.stamina,
      '<strong>Gold:</strong> ' + state.gold,
      '<strong>XP:</strong> ' + state.xp + '/100',
      '<strong>Quest:</strong> ' + quest.name,
      '<strong>Stage:</strong> ' + state.questStage + '/' + QUESTS.length,
      '<strong>Town:</strong> ' + state.townLevel,
      '<strong>Zone:</strong> ' + state.zoneLevel,
      '<strong>Skill Points:</strong> ' + state.skillPoints
    ].join('<br>');

    const actions = [
      '<button data-action="strike">Strike</button>',
      '<button data-action="magic">Magic</button>',
      '<button data-action="heal">Heal</button>',
      '<button data-action="dodge">Dodge</button>',
      '<button data-action="fight">Fight</button>'
    ].join(' ');

    ui.innerHTML = `
      <div style="font-weight: bold; color: #ffd166; margin-bottom: 8px;">Minecraft RPG 26.2</div>
      <div style="line-height: 1.6; margin-bottom: 10px;">${heroStats}</div>
      <div style="margin-bottom: 8px; color: #7ef7ff;">Quest Goal: ${quest.objective}</div>
      ${enemyHtml}
      <div style="margin-top:10px; margin-bottom:8px; color:#fff0b3;">Last Log: ${state.lastLog}</div>
      <div style="display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:6px; margin-top:10px;">${actions}</div>
      <div style="margin-top: 12px; display: flex; gap: 6px; flex-wrap: wrap;">
        ${Object.keys(CLASSES).map(name => '<button data-class="' + name + '" style="background:' + CLASSES[name].color + '; color:#111; border:none; border-radius:6px; padding:4px 8px; cursor:pointer;">' + CLASSES[name].name + '</button>').join('')}
      </div>
    `;

    ui.querySelectorAll('button[data-action]').forEach((button) => {
      button.addEventListener('click', () => {
        if (button.dataset.action === 'fight') startEncounter();
        else handleCombat(button.dataset.action);
      });
    });

    ui.querySelectorAll('button[data-class]').forEach((button) => {
      button.addEventListener('click', () => applyClass(button.dataset.class));
    });
  }

  function createPanel() {
    if (ui) return ui;

    const panel = document.createElement('div');
    panel.id = 'eaglercraft-rpg-panel';
    panel.style.position = 'fixed';
    panel.style.top = '18px';
    panel.style.right = '18px';
    panel.style.width = '300px';
    panel.style.maxHeight = '80vh';
    panel.style.overflowY = 'auto';
    panel.style.padding = '12px';
    panel.style.borderRadius = '12px';
    panel.style.background = 'rgba(12, 18, 30, 0.9)';
    panel.style.border = '1px solid rgba(255,255,255,0.15)';
    panel.style.boxShadow = '0 15px 35px rgba(0,0,0,0.35)';
    panel.style.zIndex = '999999';
    panel.style.color = '#f3f3f3';
    panel.style.fontFamily = 'monospace';
    panel.style.fontSize = '12px';
    document.body.appendChild(panel);
    ui = panel;
    renderHUD();
    return panel;
  }

  function bindKeyboard() {
    document.addEventListener('keydown', (event) => {
      const key = event.key.toLowerCase();
      if (key === 'r') {
        if (ui) ui.style.display = (ui.style.display === 'none') ? 'block' : 'none';
      }
      if (key === 'f') startEncounter();
      if (key === 'h') handleCombat('heal');
      if (key === 'm') handleCombat('magic');
      if (key === 's') handleCombat('strike');
    });
  }

  function init() {
    ensureClassState();
    createPanel();
    bindKeyboard();
    renderHUD();
    console.log('[EaglercraftRPG] Prototype loaded. Press R to hide/show HUD.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
