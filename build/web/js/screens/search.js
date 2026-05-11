// =============================================
// SEARCH SCREEN
// =============================================
const SearchScreen = {
  state: { query: '', tab: 'rooms' },

  render() {
    return `
      <div class="screen" style="padding-bottom:var(--space-xl);">
        <!-- Search Header -->
        <div style="padding:14px 18px;background:rgba(8,8,15,0.9);backdrop-filter:blur(20px);position:sticky;top:0;z-index:50;border-bottom:1px solid var(--border-subtle);">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
            <div style="cursor:pointer;font-size:20px;" onclick="App.goBack()">‹</div>
            <div class="search-bar" style="flex:1;">
              <span class="search-icon">🔍</span>
              <input type="text" placeholder="ابحث عن غرف، مضيفين..." id="search-input" autofocus
                oninput="SearchScreen.onSearch(this.value)" value="${this.state.query}">
              ${this.state.query?`<span style="cursor:pointer;font-size:18px;color:var(--text-muted);" onclick="SearchScreen.clear()">✕</span>`:''}
            </div>
          </div>
          <div class="tabs">
            <button class="tab-btn ${this.state.tab==='rooms'?'active':''}" onclick="SearchScreen.setTab('rooms')">🚪 الغرف</button>
            <button class="tab-btn ${this.state.tab==='users'?'active':''}" onclick="SearchScreen.setTab('users')">👤 مستخدمون</button>
            <button class="tab-btn ${this.state.tab==='tags'?'active':''}" onclick="SearchScreen.setTab('tags')"># وسوم</button>
          </div>
        </div>

        <div id="search-results" style="padding:16px 18px;">
          ${this.state.query ? this.renderResults() : this.renderDiscover()}
        </div>
      </div>
    `;
  },

  renderDiscover() {
    return `
      <!-- Trending Tags -->
      <div style="margin-bottom:20px;">
        <div class="section-title" style="margin-bottom:12px;">🔥 الأكثر بحثاً</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${['موسيقى','دردشة','VIP','طرب','خليجي','ألعاب','هدايا','SVIP','نجوم'].map(tag=>`
            <div style="
              background:var(--bg-elevated);border:1px solid var(--border-default);
              border-radius:999px;padding:7px 14px;cursor:pointer;font-size:13px;font-weight:600;
              transition:var(--transition-spring);
            " onclick="SearchScreen.searchTag('${tag}')"
              onmouseenter="this.style.background='var(--glass-purple)';this.style.borderColor='var(--border-purple)'"
              onmouseleave="this.style.background='var(--bg-elevated)';this.style.borderColor='var(--border-default)'"
            ># ${tag}</div>
          `).join('')}
        </div>
      </div>

      <!-- Active Rooms -->
      <div>
        <div class="section-title" style="margin-bottom:12px;">🔴 غرف مباشرة الآن</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${AppData.rooms.slice(0,4).map(r=>`
            <div style="
              display:flex;align-items:center;gap:12px;padding:12px;
              background:var(--bg-card);border:1px solid var(--border-subtle);
              border-radius:var(--r-xl);cursor:pointer;
            " onclick="App.navigate('room',{roomId:'${r.id}'})">
              <div style="
                width:48px;height:48px;border-radius:var(--r-md);flex-shrink:0;
                background:${r.gradient};display:flex;align-items:center;justify-content:center;font-size:22px;
              ">${r.bg}</div>
              <div style="flex:1;min-width:0;">
                <div style="font-size:13px;font-weight:700;">${r.name}</div>
                <div style="font-size:11px;color:var(--text-secondary);">👥 ${r.members} · ${r.host}</div>
              </div>
              ${r.isLive?`<div style="background:var(--red);color:white;font-size:9px;font-weight:700;padding:3px 8px;border-radius:999px;">LIVE</div>`:''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderResults() {
    const rooms = AppData.rooms.filter(r=>r.name.includes(this.state.query)||r.host.includes(this.state.query));
    const users = AppData.hosts.filter(h=>h.name.includes(this.state.query));
    const list = this.state.tab==='rooms' ? rooms : users;
    if (list.length === 0) return `
      <div style="text-align:center;padding:60px 20px;">
        <div style="font-size:52px;margin-bottom:16px;">🔍</div>
        <div style="font-size:16px;font-weight:700;">لا نتائج لـ "${this.state.query}"</div>
        <div style="font-size:13px;color:var(--text-secondary);margin-top:8px;">جرب كلمات مختلفة</div>
      </div>
    `;
    return this.state.tab === 'users' ? `
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${users.length>0?users.map(h=>`
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-xl);cursor:pointer;">
            <div class="avatar avatar-md"><span style="font-size:24px;">${h.avatar}</span></div>
            <div style="flex:1;"><div style="font-size:13px;font-weight:700;">${h.name}</div><div class="vip-badge ${h.vip}" style="font-size:8px;margin-top:3px;">${h.vip.toUpperCase()}</div></div>
            <button class="btn btn-primary btn-sm" onclick="App.showToast('متابعة ${h.name}')">متابعة</button>
          </div>
        `).join('') : AppData.hosts.slice(0,3).map(h=>`
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-xl);cursor:pointer;">
            <div class="avatar avatar-md"><span style="font-size:24px;">${h.avatar}</span></div>
            <div style="flex:1;"><div style="font-size:13px;font-weight:700;">${h.name}</div><div class="vip-badge ${h.vip}" style="font-size:8px;margin-top:3px;">${h.vip.toUpperCase()}</div></div>
            <button class="btn btn-primary btn-sm">متابعة</button>
          </div>
        `).join('')}
      </div>
    ` : `
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${(rooms.length > 0 ? rooms : AppData.rooms.slice(0,4)).map(r=>`
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-xl);cursor:pointer;" onclick="App.navigate('room',{roomId:'${r.id}'})">
            <div style="width:48px;height:48px;border-radius:var(--r-md);background:${r.gradient};display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">${r.bg}</div>
            <div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:700;">${r.name}</div><div style="font-size:11px;color:var(--text-secondary);">👥 ${r.members}</div></div>
            ${r.isLive?`<div style="background:var(--red);color:white;font-size:9px;font-weight:700;padding:3px 8px;border-radius:999px;">LIVE</div>`:''}
          </div>
        `).join('')}
      </div>
    `;
  },

  onSearch(val) {
    this.state.query = val;
    const r = document.getElementById('search-results');
    if(r) r.innerHTML = val ? this.renderResults() : this.renderDiscover();
  },

  setTab(tab) {
    this.state.tab = tab;
    document.querySelectorAll('.tab-btn').forEach((b,i)=>b.classList.toggle('active',['rooms','users','tags'][i]===tab));
    const r = document.getElementById('search-results');
    if(r) r.innerHTML = this.state.query ? this.renderResults() : this.renderDiscover();
  },

  searchTag(tag) {
    this.state.query = tag;
    const input = document.getElementById('search-input');
    if(input) input.value = tag;
    const r = document.getElementById('search-results');
    if(r) r.innerHTML = this.renderResults();
  },

  clear() {
    this.state.query = '';
    App.renderScreen('search');
    setTimeout(()=>document.getElementById('search-input')?.focus(), 100);
  },

  init() { setTimeout(()=>document.getElementById('search-input')?.focus(), 100); }
};
