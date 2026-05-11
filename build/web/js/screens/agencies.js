// =============================================
// AGENCIES SCREEN
// =============================================
const AgenciesScreen = {
  state: { tab: 'agencies' },

  render() {
    return `
      <div class="screen" style="padding-bottom:var(--space-xl);">
        <div class="screen-header">
          <div class="header-back" onclick="App.goBack()">‹</div>
          <div class="header-title">🏆 الوكالات والمضيفون</div>
        </div>

        <!-- Tabs -->
        <div style="padding:14px 18px 8px;">
          <div class="tabs">
            <button class="tab-btn ${this.state.tab==='agencies'?'active':''}" onclick="AgenciesScreen.setTab('agencies')">🏢 الوكالات</button>
            <button class="tab-btn ${this.state.tab==='hosts'?'active':''}" onclick="AgenciesScreen.setTab('hosts')">🌟 المضيفون</button>
            <button class="tab-btn ${this.state.tab==='earnings'?'active':''}" onclick="AgenciesScreen.setTab('earnings')">💰 الأرباح</button>
          </div>
        </div>

        <div id="agency-content" style="padding:0 18px;">
          ${this.renderContent()}
        </div>
      </div>
    `;
  },

  renderContent() {
    if (this.state.tab === 'agencies') return this.renderAgencies();
    if (this.state.tab === 'hosts') return this.renderHosts();
    return this.renderEarnings();
  },

  renderAgencies() {
    return `
      <!-- Top 3 Podium -->
      <div style="display:flex;align-items:flex-end;justify-content:center;gap:10px;padding:20px 0;margin-bottom:10px;">
        <!-- 2nd -->
        <div style="flex:1;text-align:center;">
          <div style="font-size:32px;margin-bottom:6px;">${AppData.agencies[1].emoji}</div>
          <div style="font-size:11px;font-weight:700;">${AppData.agencies[1].name}</div>
          <div style="
            background:linear-gradient(180deg,#C0C0C0,#E0E0E0);
            height:70px;border-radius:var(--r-md) var(--r-md) 0 0;
            margin-top:8px;display:flex;align-items:flex-start;justify-content:center;
            padding-top:6px;font-size:18px;
          ">🥈</div>
        </div>
        <!-- 1st -->
        <div style="flex:1.2;text-align:center;">
          <div style="font-size:38px;margin-bottom:6px;">${AppData.agencies[0].emoji}</div>
          <div style="font-size:12px;font-weight:800;">${AppData.agencies[0].name}</div>
          <div style="
            background:linear-gradient(180deg,#D4A017,#FFD700);
            height:100px;border-radius:var(--r-md) var(--r-md) 0 0;
            margin-top:8px;display:flex;align-items:flex-start;justify-content:center;
            padding-top:6px;font-size:22px;
          ">🥇</div>
        </div>
        <!-- 3rd -->
        <div style="flex:1;text-align:center;">
          <div style="font-size:32px;margin-bottom:6px;">${AppData.agencies[2].emoji}</div>
          <div style="font-size:11px;font-weight:700;">${AppData.agencies[2].name}</div>
          <div style="
            background:linear-gradient(180deg,#CD7F32,#E08040);
            height:55px;border-radius:var(--r-md) var(--r-md) 0 0;
            margin-top:8px;display:flex;align-items:flex-start;justify-content:center;
            padding-top:6px;font-size:18px;
          ">🥉</div>
        </div>
      </div>

      <!-- All Agencies List -->
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${AppData.agencies.map((a,i)=>`
          <div style="
            display:flex;align-items:center;gap:14px;padding:16px;
            background:var(--bg-card);border:1px solid var(--border-subtle);
            border-radius:var(--r-xl);cursor:pointer;transition:var(--transition-spring);
          " onclick="AgenciesScreen.openAgency('${a.id}')"
            onmouseenter="this.style.borderColor='var(--border-gold)'"
            onmouseleave="this.style.borderColor='var(--border-subtle)'"
          >
            <div style="font-size:28px;text-align:center;width:32px;">${['🥇','🥈','🥉','4️⃣','5️⃣'][i]}</div>
            <div style="
              width:52px;height:52px;border-radius:50%;flex-shrink:0;
              background:var(--glass-gold);border:2px solid var(--border-gold);
              display:flex;align-items:center;justify-content:center;font-size:24px;
            ">${a.emoji}</div>
            <div style="flex:1;min-width:0;">
              <div style="font-size:14px;font-weight:800;">${a.name}</div>
              <div style="font-size:11px;color:var(--text-secondary);margin-top:2px;">
                👤 ${a.hosts} مضيف · 👥 ${a.members.toLocaleString()} عضو
              </div>
              <div class="badge badge-vip" style="font-size:9px;margin-top:4px;">${a.badge}</div>
            </div>
            <div style="text-align:left;">
              <div style="font-size:13px;font-weight:800;color:var(--gold-bright);">${a.revenue}</div>
              <div style="font-size:10px;color:var(--text-secondary);">إجمالي</div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Join Agency CTA -->
      <div style="
        margin-top:20px;background:linear-gradient(135deg,#1a0040,#4A0D8F);
        border-radius:var(--r-2xl);padding:20px;text-align:center;
        border:1px solid var(--border-purple);
      ">
        <div style="font-size:32px;margin-bottom:10px;">🚀</div>
        <div style="font-size:16px;font-weight:800;margin-bottom:6px;">انضم لوكالة الآن</div>
        <div style="font-size:12px;color:var(--text-secondary);margin-bottom:14px;">زد أرباحك وانمِ مجتمعك مع أفضل الوكالات</div>
        <button class="btn btn-gold" onclick="App.showToast('طلب الانضمام - قريباً')">طلب الانضمام</button>
      </div>
    `;
  },

  renderHosts() {
    return `
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${AppData.hosts.map((h,i)=>`
          <div class="rank-item" style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-xl);margin-bottom:0;" onclick="App.showToast('ملف ${h.name}')">
            <div class="rank-number rank-${i+1}">${i<3?['🥇','🥈','🥉'][i]:i+1}</div>
            <div class="avatar avatar-md" style="position:relative;">
              <span style="font-size:22px;">${h.avatar}</span>
              ${h.online?`<div style="position:absolute;bottom:1px;right:1px;width:10px;height:10px;background:var(--green);border-radius:50%;border:2px solid var(--bg-primary);"></div>`:''}
            </div>
            <div class="rank-info">
              <div class="rank-name">${h.name} ${h.country}</div>
              <div style="display:flex;gap:4px;align-items:center;margin-top:3px;">
                <div class="vip-badge ${h.vip}" style="font-size:8px;">${h.vip.toUpperCase()}</div>
                <span style="font-size:10px;color:var(--text-secondary);">Lv.${h.level}</span>
              </div>
            </div>
            <div style="text-align:left;">
              <div style="font-size:13px;font-weight:800;color:var(--gold-bright);">${(h.coins/1000).toFixed(0)}K</div>
              <div style="font-size:10px;color:var(--text-secondary);">عملة</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderEarnings() {
    return `
      <!-- My Earnings Card -->
      <div style="
        background:linear-gradient(135deg,#2d1b00,#8B6914,#D4A017);
        border-radius:var(--r-2xl);padding:20px;margin-bottom:16px;
      ">
        <div style="font-size:12px;opacity:0.8;margin-bottom:4px;">أرباحك هذا الشهر</div>
        <div style="font-size:36px;font-weight:900;">🪙 124,500</div>
        <div style="font-size:12px;margin-top:4px;color:var(--green);">▲ 23% عن الشهر الماضي</div>
      </div>

      <!-- Stats Grid -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">
        ${[
          {icon:'🎁',label:'هدايا مستلمة',val:'15,840'},
          {icon:'🎤',label:'ساعات بث',val:'284 ساعة'},
          {icon:'👥',label:'متابعون جدد',val:'+1,284'},
          {icon:'💎',label:'ألماس',val:'2,350'},
        ].map(s=>`
          <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-xl);padding:14px;text-align:center;">
            <div style="font-size:24px;margin-bottom:6px;">${s.icon}</div>
            <div style="font-size:16px;font-weight:800;">${s.val}</div>
            <div style="font-size:10px;color:var(--text-secondary);margin-top:2px;">${s.label}</div>
          </div>
        `).join('')}
      </div>

      <!-- Monthly Chart -->
      <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-xl);padding:16px;margin-bottom:16px;">
        <div style="font-size:13px;font-weight:700;margin-bottom:14px;">📊 الأداء الشهري</div>
        <div style="display:flex;align-items:flex-end;gap:6px;height:80px;">
          ${[40,65,45,80,70,90,100,75,85,95,60,100].map((h,i)=>`
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
              <div style="
                flex:1;width:100%;border-radius:4px 4px 0 0;
                background:${i===11?'var(--grad-gold)':'linear-gradient(var(--purple-light),var(--purple-primary))'};
                height:${h}%;
              "></div>
              <span style="font-size:8px;color:var(--text-muted);">${['ي','ف','م','أ','م','ي','ي','أ','س','أ','ن','د'][i]}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Withdraw -->
      <button class="btn btn-gold btn-full btn-lg" onclick="App.showToast('طلب سحب - قريباً')">
        💸 سحب الأرباح
      </button>
    `;
  },

  setTab(tab) {
    this.state.tab = tab;
    document.querySelectorAll('.tab-btn').forEach((b,i)=>b.classList.toggle('active',['agencies','hosts','earnings'][i]===tab));
    const c = document.getElementById('agency-content');
    if(c) c.innerHTML = this.renderContent();
  },

  openAgency(id) { App.showToast('صفحة الوكالة - قريباً'); },
  init() {}
};
