// ==========================================
// Momentum — Personal Daily Tracker
// ==========================================

(() => {
  'use strict';

  // ========== Constants ==========
  const CATEGORIES = [
    'Health & Energy',
    'Mindset & Confidence',
    'Focus & Deep Work',
    'Business Build',
    'Marketing Output',
    'AI Mastery & Automation',
    'Money & Wealth',
    'Personal Admin & Environment',
    'Relationships & Social Life',
    'Recovery & Fun'
  ];

  const CATEGORY_COLORS = [
    '#22c55e', '#f59e0b', '#6366f1', '#ec4899', '#f97316',
    '#06b6d4', '#84cc16', '#8b5cf6', '#14b8a6', '#e879f9'
  ];

  const STORAGE_KEY = 'momentum_data';

  // ========== State ==========
  let state = loadState();

  function defaultState() {
    return {
      habits: [],
      settings: {
        reminderEnabled: false,
        reminderTime: '08:00'
      }
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return { ...defaultState(), ...parsed };
      }
    } catch (e) { /* ignore */ }
    return defaultState();
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  // ========== Helpers ==========
  function todayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short', month: 'short', day: 'numeric'
    }).format(date);
  }

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function getCategoryColor(category) {
    const idx = CATEGORIES.indexOf(category);
    return idx >= 0 ? CATEGORY_COLORS[idx] : '#6366f1';
  }

  // ========== Streak Calculation ==========
  function calculateStreak(habit) {
    if (habit.type === 'todo') return 0;
    const completions = habit.completions || {};
    let streak = 0;
    const today = new Date();

    // Check if completed today; if not, start checking from yesterday
    const todayStr = todayKey();
    let checkDate = new Date(today);

    if (!completions[todayStr]) {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    while (true) {
      const key = checkDate.toISOString().slice(0, 10);
      if (completions[key]) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }

  function calculateBestStreak(habit) {
    if (habit.type === 'todo') return 0;
    const completions = habit.completions || {};
    const dates = Object.keys(completions).filter(d => completions[d]).sort();
    if (dates.length === 0) return 0;

    let best = 1;
    let current = 1;

    for (let i = 1; i < dates.length; i++) {
      const prev = new Date(dates[i - 1]);
      const curr = new Date(dates[i]);
      const diff = (curr - prev) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        current++;
        best = Math.max(best, current);
      } else {
        current = 1;
      }
    }
    return Math.max(best, current);
  }

  // ========== DOM Helpers ==========
  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }

  function el(tag, attrs = {}, children = []) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'className') e.className = v;
      else if (k === 'textContent') e.textContent = v;
      else if (k === 'innerHTML') e.innerHTML = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2).toLowerCase(), v);
      else e.setAttribute(k, v);
    }
    for (const c of children) {
      if (typeof c === 'string') e.appendChild(document.createTextNode(c));
      else if (c) e.appendChild(c);
    }
    return e;
  }

  // ========== Navigation ==========
  let currentView = 'today';

  function switchView(view) {
    currentView = view;
    $$('.view').forEach(v => v.classList.remove('active'));
    $(`#view-${view}`).classList.add('active');
    $$('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === view));

    // Update header
    const titles = { today: 'Today', habits: 'My Habits', streaks: 'Streaks', settings: 'Settings' };
    $('#header-title').textContent = titles[view] || 'Momentum';
    $('#header-date').textContent = view === 'today' ? formatDate(new Date()) : '';
    $('#btn-add').style.display = (view === 'today' || view === 'habits') ? '' : 'none';
    $('#btn-settings').style.display = view === 'settings' ? 'none' : '';

    renderView(view);
  }

  function renderView(view) {
    if (view === 'today') renderToday();
    else if (view === 'habits') renderHabits();
    else if (view === 'streaks') renderStreaks();
  }

  // ========== Today View ==========
  function renderToday() {
    const today = todayKey();
    const dailyHabits = state.habits.filter(h => h.type === 'daily');
    const todoHabits = state.habits.filter(h => h.type === 'todo' && !h.completedDate);
    const allItems = [...dailyHabits, ...todoHabits];

    // Progress
    const total = allItems.length;
    const done = allItems.filter(h => {
      if (h.type === 'daily') return (h.completions || {})[today];
      return h.completedDate;
    }).length;

    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const circumference = 2 * Math.PI * 34; // r=34
    const offset = circumference - (pct / 100) * circumference;

    $('.progress-ring-fill').style.strokeDashoffset = offset;
    $('#progress-text').textContent = `${pct}%`;
    $('#progress-count').textContent = `${done} of ${total} done`;

    // Best overall streak
    const maxStreak = Math.max(0, ...dailyHabits.map(calculateStreak));
    const badge = $('#streak-badge');
    if (maxStreak > 0) {
      badge.hidden = false;
      badge.innerHTML = `&#x1F525; ${maxStreak} day streak`;
    } else {
      badge.hidden = true;
    }

    // Build list grouped by category
    const list = $('#today-list');
    list.innerHTML = '';

    if (allItems.length === 0) {
      $('#empty-state').hidden = false;
      return;
    }
    $('#empty-state').hidden = true;

    // Group by category
    const grouped = {};
    for (const h of allItems) {
      const cat = h.category || 'Uncategorized';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(h);
    }

    // Render in category order
    for (const cat of CATEGORIES) {
      if (!grouped[cat]) continue;
      const section = el('div', { className: 'category-section' }, [
        el('div', { className: 'category-header', textContent: cat })
      ]);

      for (const habit of grouped[cat]) {
        const isDone = habit.type === 'daily'
          ? (habit.completions || {})[today]
          : !!habit.completedDate;
        const streak = calculateStreak(habit);

        const item = el('div', {
          className: `habit-item${isDone ? ' done' : ''}`,
          onClick: () => toggleHabit(habit.id)
        }, [
          el('div', { className: 'habit-check', innerHTML: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>' }),
          el('div', { className: 'habit-info' }, [
            el('div', { className: 'habit-name', textContent: habit.name }),
            habit.type === 'todo' && habit.dueDate
              ? el('div', { className: 'habit-meta', textContent: `Due: ${habit.dueDate}` })
              : null
          ]),
          (habit.type === 'daily' && streak > 0)
            ? el('div', { className: 'habit-streak', textContent: `${streak}d` })
            : null
        ]);

        section.appendChild(item);
      }

      list.appendChild(section);
    }

    // Uncategorized
    if (grouped['Uncategorized']) {
      const section = el('div', { className: 'category-section' }, [
        el('div', { className: 'category-header', textContent: 'Other' })
      ]);
      for (const habit of grouped['Uncategorized']) {
        const isDone = habit.type === 'daily'
          ? (habit.completions || {})[today]
          : !!habit.completedDate;
        const item = el('div', {
          className: `habit-item${isDone ? ' done' : ''}`,
          onClick: () => toggleHabit(habit.id)
        }, [
          el('div', { className: 'habit-check', innerHTML: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>' }),
          el('div', { className: 'habit-info' }, [
            el('div', { className: 'habit-name', textContent: habit.name })
          ])
        ]);
        section.appendChild(item);
      }
      list.appendChild(section);
    }
  }

  function toggleHabit(id) {
    const habit = state.habits.find(h => h.id === id);
    if (!habit) return;

    if (habit.type === 'daily') {
      if (!habit.completions) habit.completions = {};
      const today = todayKey();
      habit.completions[today] = !habit.completions[today];
    } else {
      habit.completedDate = habit.completedDate ? null : todayKey();
    }

    saveState();
    renderToday();

    // Quick haptic feedback if available
    if (navigator.vibrate) navigator.vibrate(10);
  }

  // ========== Habits Management View ==========
  function renderHabits() {
    const list = $('#habits-list');
    list.innerHTML = '';

    if (state.habits.length === 0) {
      list.innerHTML = '<div class="empty-state"><p>No habits yet</p><p class="subtle">Tap + to create one</p></div>';
      return;
    }

    // Group by category
    const grouped = {};
    for (const h of state.habits) {
      const cat = h.category || 'Uncategorized';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(h);
    }

    for (const cat of [...CATEGORIES, 'Uncategorized']) {
      if (!grouped[cat]) continue;

      const section = el('div', { className: 'category-section' }, [
        el('div', { className: 'category-header', textContent: cat })
      ]);

      for (const habit of grouped[cat]) {
        const item = el('div', {
          className: 'manage-item',
          onClick: () => openEditModal(habit.id)
        }, [
          el('div', { className: 'manage-color', style: `background:${getCategoryColor(habit.category)}` }),
          el('div', { className: 'manage-info' }, [
            el('div', { className: 'manage-name', textContent: habit.name }),
            el('div', { className: 'manage-category', textContent: habit.category || 'No category' })
          ]),
          el('span', { className: 'manage-type', textContent: habit.type === 'daily' ? 'Daily' : 'Task' })
        ]);
        section.appendChild(item);
      }

      list.appendChild(section);
    }
  }

  // ========== Streaks View ==========
  function renderStreaks() {
    const list = $('#streaks-list');
    list.innerHTML = '';

    const dailyHabits = state.habits.filter(h => h.type === 'daily');

    if (dailyHabits.length === 0) {
      list.innerHTML = '<div class="empty-state"><p>No daily habits yet</p><p class="subtle">Add daily habits to see streaks</p></div>';
      return;
    }

    // Sort by current streak descending
    const sorted = dailyHabits
      .map(h => ({ ...h, streak: calculateStreak(h), best: calculateBestStreak(h) }))
      .sort((a, b) => b.streak - a.streak);

    for (const habit of sorted) {
      const item = el('div', { className: 'streak-item' }, [
        el('div', { className: 'streak-fire', textContent: habit.streak > 0 ? '\u{1F525}' : '\u{1F9CA}' }),
        el('div', { className: 'streak-info' }, [
          el('div', { className: 'streak-name', textContent: habit.name }),
          el('div', { className: 'streak-days', textContent: habit.category })
        ]),
        el('div', { className: 'streak-count' }, [
          el('div', { className: 'streak-number', textContent: habit.streak.toString() }),
          el('div', { className: 'streak-label', textContent: 'days' }),
          el('div', { className: 'streak-best', textContent: `Best: ${habit.best}` })
        ])
      ]);
      list.appendChild(item);
    }
  }

  // ========== Modal ==========
  function openModal() {
    const overlay = $('#modal-overlay');
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add('show'));
  }

  function closeModal() {
    const overlay = $('#modal-overlay');
    overlay.classList.remove('show');
    setTimeout(() => {
      overlay.hidden = true;
      $('#habit-form').reset();
      $('#habit-id').value = '';
      $('#btn-delete-habit').hidden = true;
      $('#due-date-group').hidden = true;
    }, 300);
  }

  function openAddModal() {
    $('#modal-title').textContent = 'Add Habit';
    $('#habit-id').value = '';
    $('#habit-form').reset();
    $('#btn-delete-habit').hidden = true;
    populateCategorySelect();
    openModal();
    setTimeout(() => $('#habit-name').focus(), 350);
  }

  function openEditModal(id) {
    const habit = state.habits.find(h => h.id === id);
    if (!habit) return;

    $('#modal-title').textContent = 'Edit Habit';
    $('#habit-id').value = habit.id;
    $('#habit-name').value = habit.name;
    populateCategorySelect(habit.category);
    $('#habit-type').value = habit.type;
    $('#due-date-group').hidden = habit.type !== 'todo';
    if (habit.dueDate) $('#habit-due').value = habit.dueDate;
    $('#btn-delete-habit').hidden = false;

    openModal();
  }

  function populateCategorySelect(selected) {
    const select = $('#habit-category');
    select.innerHTML = '';
    for (const cat of CATEGORIES) {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      if (cat === selected) opt.selected = true;
      select.appendChild(opt);
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const id = $('#habit-id').value;
    const name = $('#habit-name').value.trim();
    const category = $('#habit-category').value;
    const type = $('#habit-type').value;
    const dueDate = type === 'todo' ? $('#habit-due').value || null : null;

    if (!name) return;

    if (id) {
      // Edit existing
      const habit = state.habits.find(h => h.id === id);
      if (habit) {
        habit.name = name;
        habit.category = category;
        habit.type = type;
        habit.dueDate = dueDate;
      }
    } else {
      // Add new
      state.habits.push({
        id: generateId(),
        name,
        category,
        type,
        dueDate,
        completions: {},
        completedDate: null,
        createdAt: todayKey()
      });
    }

    saveState();
    closeModal();
    renderView(currentView);
  }

  function deleteHabit(id) {
    showConfirm('Delete this habit? This will also remove all streak data.', () => {
      state.habits = state.habits.filter(h => h.id !== id);
      saveState();
      closeModal();
      renderView(currentView);
    });
  }

  // ========== Confirm Dialog ==========
  let confirmCallback = null;

  function showConfirm(message, onConfirm) {
    $('#confirm-message').textContent = message;
    confirmCallback = onConfirm;
    const overlay = $('#confirm-overlay');
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add('show'));
  }

  function closeConfirm() {
    const overlay = $('#confirm-overlay');
    overlay.classList.remove('show');
    setTimeout(() => { overlay.hidden = true; }, 300);
    confirmCallback = null;
  }

  // ========== Notifications ==========
  async function setupReminders() {
    if (!state.settings.reminderEnabled) return;

    if (!('Notification' in window)) return;

    if (Notification.permission === 'default') {
      const perm = await Notification.requestPermission();
      if (perm !== 'granted') {
        state.settings.reminderEnabled = false;
        saveState();
        $('#reminder-toggle').checked = false;
        return;
      }
    }

    if (Notification.permission !== 'granted') {
      state.settings.reminderEnabled = false;
      saveState();
      $('#reminder-toggle').checked = false;
      return;
    }

    scheduleReminder();
  }

  let reminderTimeout = null;

  function scheduleReminder() {
    if (reminderTimeout) clearTimeout(reminderTimeout);
    if (!state.settings.reminderEnabled) return;

    const [hours, minutes] = state.settings.reminderTime.split(':').map(Number);
    const now = new Date();
    const target = new Date(now);
    target.setHours(hours, minutes, 0, 0);

    if (target <= now) {
      target.setDate(target.getDate() + 1);
    }

    const delay = target - now;
    reminderTimeout = setTimeout(() => {
      showNotification();
      // Schedule next day
      scheduleReminder();
    }, delay);
  }

  function showNotification() {
    if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) {
      new Notification('Momentum', {
        body: "Time to check in on your habits! \u{1F4AA}",
        icon: 'icon-192.png'
      });
      return;
    }

    navigator.serviceWorker.ready.then(reg => {
      reg.showNotification('Momentum', {
        body: "Time to check in on your habits! \u{1F4AA}",
        icon: 'icon-192.png',
        badge: 'icon-192.png',
        vibrate: [100, 50, 100]
      });
    });
  }

  // ========== Settings ==========
  function initSettings() {
    const toggle = $('#reminder-toggle');
    const timeInput = $('#reminder-time');
    const timeRow = $('#reminder-time-row');

    toggle.checked = state.settings.reminderEnabled;
    timeInput.value = state.settings.reminderTime;
    timeRow.hidden = !state.settings.reminderEnabled;

    toggle.addEventListener('change', () => {
      state.settings.reminderEnabled = toggle.checked;
      timeRow.hidden = !toggle.checked;
      saveState();
      if (toggle.checked) {
        setupReminders();
      } else if (reminderTimeout) {
        clearTimeout(reminderTimeout);
      }
    });

    timeInput.addEventListener('change', () => {
      state.settings.reminderTime = timeInput.value;
      saveState();
      scheduleReminder();
    });

    // Export
    $('#btn-export').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `momentum-backup-${todayKey()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });

    // Import
    $('#btn-import').addEventListener('click', () => $('#import-file').click());
    $('#import-file').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const imported = JSON.parse(ev.target.result);
          if (imported.habits) {
            state = { ...defaultState(), ...imported };
            saveState();
            renderView(currentView);
          }
        } catch (err) {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    });

    // Reset
    $('#btn-reset').addEventListener('click', () => {
      showConfirm('Reset all data? This cannot be undone.', () => {
        state = defaultState();
        saveState();
        closeConfirm();
        renderView(currentView);
      });
    });
  }

  // ========== Service Worker ==========
  function registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  }

  // ========== Init ==========
  function init() {
    // Set date
    $('#header-date').textContent = formatDate(new Date());

    // Navigation
    $$('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => switchView(btn.dataset.view));
    });

    // Settings button
    $('#btn-settings').addEventListener('click', () => switchView('settings'));

    // Add button
    $('#btn-add').addEventListener('click', openAddModal);

    // Modal
    $('#modal-close').addEventListener('click', closeModal);
    $('#modal-overlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeModal();
    });

    // Form
    $('#habit-form').addEventListener('submit', handleFormSubmit);
    $('#habit-type').addEventListener('change', (e) => {
      $('#due-date-group').hidden = e.target.value !== 'todo';
    });

    // Delete habit
    $('#btn-delete-habit').addEventListener('click', () => {
      const id = $('#habit-id').value;
      if (id) deleteHabit(id);
    });

    // Confirm dialog
    $('#confirm-cancel').addEventListener('click', closeConfirm);
    $('#confirm-ok').addEventListener('click', () => {
      if (confirmCallback) confirmCallback();
      closeConfirm();
    });
    $('#confirm-overlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeConfirm();
    });

    // Init settings
    initSettings();

    // Register service worker
    registerSW();

    // Setup reminders
    setupReminders();

    // Render initial view
    switchView('today');

    // Re-render at midnight
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    setTimeout(() => {
      renderView(currentView);
      // Then every 24h
      setInterval(() => renderView(currentView), 86400000);
    }, midnight - now);
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
