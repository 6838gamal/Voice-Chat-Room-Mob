// =============================================
// SAWTAK - Main App Router & Controller
// =============================================

const App = {
  currentScreen: null,
  screenParams: {},
  history: [],

  screens: {
    splash: SplashScreen,
    login: AuthScreen,
    home: HomeScreen,
    room: RoomScreen,
    vip: VIPScreen,
    store: StoreScreen,
    games: GamesScreen,
    profile: ProfileScreen,
    agencies: AgenciesScreen,
    admin: AdminScreen,
    search: SearchScreen,
    messages: MessagesScreen,
    notifications: NotificationsScreen,
  },

  navScreens: ['home', 'search', 'messages', 'games', 'profile'],

  navItems: [
    { id: 'home',     icon: '🏠', label: 'الرئيسية' },
    { id: 'search',   icon: '🔍', label: 'البحث' },
    { id: 'messages', icon: '💬', label: 'الرسائل', badge: 3 },
    { id: 'games',    icon: '🎮', label: 'الألعاب' },
    { id: 'profile',  icon: '👤', label: 'حسابي' },
  ],

  init() {
    this.navigate('splash');
  },

  navigate(screen, params = {}) {
    if (this.currentScreen && this.currentScreen !== screen) {
      this.history.push({ screen: this.currentScreen, params: this.screenParams });
      if (this.history.length > 20) this.history.shift();
    }
    this.currentScreen = screen;
    this.screenParams = params;
    this.renderScreen(screen, params);
  },

  goBack() {
    if (this.history.length === 0) {
      this.navigate('home');
      return;
    }
    const prev = this.history.pop();
    this.currentScreen = prev.screen;
    this.screenParams = prev.params;
    this.renderScreen(prev.screen, prev.params);
  },

  renderScreen(screenId, params) {
    params = params || this.screenParams || {};
    const container = document.getElementById('screen-container');
    const bottomNav = document.getElementById('bottom-nav');
    const appEl = document.getElementById('app');

    const screenObj = this.screens[screenId];
    if (!screenObj) { console.error('Screen not found:', screenId); return; }

    // Render HTML
    container.innerHTML = screenObj.render(params);

    // Show/hide bottom nav
    const showNav = this.navScreens.includes(screenId);
    if (showNav) {
      bottomNav.classList.remove('hidden');
      appEl.classList.add('has-bottom-nav');
      this.renderNav(screenId);
    } else {
      bottomNav.classList.add('hidden');
      appEl.classList.remove('has-bottom-nav');
    }

    // Scroll to top
    container.scrollTo(0, 0);

    // Init screen
    if (screenObj.init) screenObj.init(params);
  },

  renderNav(active) {
    const nav = document.getElementById('bottom-nav');
    nav.innerHTML = this.navItems.map(item => `
      <div class="nav-item ${active === item.id ? 'active' : ''}"
        onclick="App.navigate('${item.id}')">
        <span class="nav-icon">${item.icon}</span>
        <span class="nav-label">${item.label}</span>
        ${item.badge ? `<div class="nav-badge">${item.badge}</div>` : ''}
      </div>
    `).join('');
  },

  openModal(html, onClose) {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('hidden');
    overlay.innerHTML = `<div class="modal-sheet">${html}</div>`;
    overlay.onclick = (e) => {
      if (e.target === overlay) this.closeModal(onClose);
    };
    this._onModalClose = onClose;
  },

  closeModal() {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.add('hidden');
    overlay.innerHTML = '';
    if (this._onModalClose) { this._onModalClose(); this._onModalClose = null; }
  },

  showToast(msg, type = '') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  },

  showProfile(userId) {
    this.navigate('profile', { userId });
  },
};

// Start the app
window.addEventListener('DOMContentLoaded', () => App.init());
