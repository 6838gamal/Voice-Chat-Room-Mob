// =============================================
// ADMIN PANEL SCREEN
// =============================================
const AdminScreen = {
  state: { tab: 'overview' },

  render() {
    return `
      <div class="screen" style="padding-bottom:var(--space-xl);">
        <div class="screen-header" style="background:linear-gradient(135deg,rgba(255,75,75,0.2),rgba(8,8,15,0.9));backdrop-filter:blur(20px);">
          <div class="header-back" onclick="App.goBack()">‹</div>
          <div class="header-title">🛡️ لوحة التحكم</div>
          <div style="background:rgba(255,75,75,0.15);border:1px solid rgba(255,75,75,0.4);border-radius:999px;padding:3px 10px;font-size:11px;color:var(--red);font-weight:700;">ADMIN</div>
        </div>

        <!-- Tabs -->
        <div style="padding:14px 18px 8px;overflow-x:auto;">
          <div style="display:flex;gap:6px;min-width:max-content;">
            ${['overview','users','rooms','reports'].map((t,i)=>`
              <button class="tab-btn ${this.state.tab===t?'active':''}" style="flex-shrink:0;" onclick="AdminScreen.setTab('${t}')">${['📊 نظرة عامة','👥 المستخدمون','🚪 الغرف','🚨 البلاغات'][i]}</button>
            `).join('')}
          </div>
        </div>

        <div id="admin-content" style="padding:0 18px;">
          ${this.renderContent()}
        </div>
      </div>
    `;
  },

  renderContent() {
    if (this.state.tab === 'overview') return this.renderOverview();
    if (this.state.tab === 'users') return this.renderUsers();
    if (this.state.tab === 'rooms') return this.renderRooms();
    return this.renderReports();
  },

  renderOverview() {
    const stats = [
      {icon:'👥',label:'المستخدمون',val:'124,580',change:'+12%',up:true},
      {icon:'🚪',label:'الغرف النشطة',val:'2,840',change:'+8%',up:true},
      {icon:'🪙',label:'المعاملات اليوم',val:'58.4K',change:'+23%',up:true},
      {icon:'🚨',label:'البلاغات',val:'24',change:'-15%',up:false},
    ];
    return `
      <!-- Stats -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">
        ${stats.map(s=>`
          <div class="stat-card">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div class="stat-label">${s.label}</div>
              <span style="font-size:20px;">${s.icon}</span>
            </div>
            <div class="stat-value">${s.val}</div>
            <div class="stat-change ${s.up?'up':'down'}">${s.up?'▲':'▼'} ${s.change}</div>
          </div>
        `).join('')}
      </div>

      <!-- Quick Actions -->
      <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-xl);padding:16px;margin-bottom:16px;">
        <div style="font-size:13px;font-weight:700;margin-bottom:14px;">⚡ إجراءات سريعة</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">
          ${[
            {icon:'🔨',label:'تبنيد',color:'var(--red)'},
            {icon:'👁️',label:'مراقبة',color:'var(--blue)'},
            {icon:'📢',label:'إعلان',color:'var(--purple-light)'},
            {icon:'💎',label:'منح VIP',color:'var(--gold-bright)'},
            {icon:'🔐',label:'حظر IP',color:'var(--orange)'},
            {icon:'📊',label:'تقرير',color:'var(--green)'},
          ].map(a=>`
            <div style="
              background:var(--bg-elevated);border-radius:var(--r-lg);padding:12px;
              text-align:center;cursor:pointer;transition:var(--transition-spring);
            " onclick="App.showToast('${a.label}')"
              onmouseenter="this.style.transform='scale(1.05)'"
              onmouseleave="this.style.transform='scale(1)'"
            >
              <div style="font-size:24px;color:${a.color};">${a.icon}</div>
              <div style="font-size:10px;margin-top:4px;color:var(--text-secondary);">${a.label}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Activity Monitor -->
      <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-xl);padding:16px;">
        <div style="font-size:13px;font-weight:700;margin-bottom:12px;">📡 النشاط الحي</div>
        ${[
          {time:'الآن',msg:'مستخدم جديد: خالد - السعودية 🇸🇦',type:'join'},
          {time:'2ث','msg':'تم تبنيد: user_928 (24 ساعة)',type:'ban'},
          {time:'5ث',msg:'غرفة جديدة: موسيقى الليل - 48 مستخدم',type:'room'},
          {time:'12ث',msg:'معاملة: 50,000 عملة - طارق الأمير',type:'coin'},
          {time:'20ث',msg:'بلاغ جديد: رقم #1924 بحاجة مراجعة',type:'report'},
        ].map(a=>`
          <div style="
            display:flex;align-items:center;gap:10px;padding:8px 0;
            border-bottom:1px solid var(--border-subtle);
          ">
            <div style="
              width:8px;height:8px;border-radius:50%;flex-shrink:0;
              background:${{join:'var(--green)',ban:'var(--red)',room:'var(--blue)',coin:'var(--gold-bright)',report:'var(--orange)'}[a.type]};
            "></div>
            <div style="flex:1;font-size:11px;">${a.msg}</div>
            <div style="font-size:10px;color:var(--text-muted);">${a.time}</div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderUsers() {
    return `
      <!-- Search -->
      <div class="search-bar" style="margin-bottom:14px;">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="بحث عن مستخدم...">
      </div>

      <!-- User List -->
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${AppData.hosts.map(h=>`
          <div style="
            display:flex;align-items:center;gap:12px;padding:14px;
            background:var(--bg-card);border:1px solid var(--border-subtle);
            border-radius:var(--r-xl);
          ">
            <div class="avatar avatar-md"><span style="font-size:22px;">${h.avatar}</span></div>
            <div style="flex:1;min-width:0;">
              <div style="font-size:13px;font-weight:700;">${h.name} ${h.country}</div>
              <div class="vip-badge ${h.vip}" style="font-size:8px;margin-top:3px;">${h.vip.toUpperCase()}</div>
            </div>
            <div style="display:flex;gap:6px;">
              <button class="btn btn-ghost btn-icon-sm" onclick="AdminScreen.banUser('${h.name}')" title="تبنيد" style="font-size:14px;background:rgba(255,75,75,0.1);border-color:rgba(255,75,75,0.3);">🔨</button>
              <button class="btn btn-ghost btn-icon-sm" onclick="App.showToast('مراقبة ${h.name}')" title="مراقبة" style="font-size:14px;">👁️</button>
              <button class="btn btn-ghost btn-icon-sm" onclick="App.showToast('ملف ${h.name}')" title="ملف" style="font-size:14px;">👤</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderRooms() {
    return `
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${AppData.rooms.map(r=>`
          <div style="
            padding:14px;background:var(--bg-card);
            border:1px solid var(--border-subtle);border-radius:var(--r-xl);
          ">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
              <div style="
                width:44px;height:44px;border-radius:var(--r-md);flex-shrink:0;
                background:${r.gradient};display:flex;align-items:center;justify-content:center;font-size:20px;
              ">${r.bg}</div>
              <div style="flex:1;min-width:0;">
                <div style="font-size:13px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${r.name}</div>
                <div style="font-size:11px;color:var(--text-secondary);">👤 ${r.host} · 👥 ${r.members}</div>
              </div>
              <div style="
                font-size:9px;font-weight:700;padding:3px 8px;border-radius:999px;
                background:${r.isLive?'var(--red)':'var(--bg-elevated)'};
                color:${r.isLive?'white':'var(--text-muted)'};
              ">${r.isLive?'LIVE':'متوقفة'}</div>
            </div>
            <div style="display:flex;gap:6px;">
              <button class="btn btn-ghost btn-sm" onclick="App.showToast('مراقبة ${r.name}')" style="flex:1;font-size:11px;">👁️ مراقبة</button>
              <button class="btn btn-ghost btn-sm" onclick="App.showToast('إغلاق ${r.name}')" style="flex:1;font-size:11px;color:var(--red);">🚫 إغلاق</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderReports() {
    const reports = [
      {id:'#1924',from:'سارة',against:'مستخدم_x',reason:'محتوى مسيء',time:'منذ 5 دقائق',priority:'عالية'},
      {id:'#1923',from:'خالد',against:'مستخدم_y',reason:'تحرش',time:'منذ 15 دقيقة',priority:'عالية'},
      {id:'#1922',from:'ريم',against:'غرفة_abc',reason:'محتوى غير لائق',time:'منذ 1 ساعة',priority:'متوسطة'},
      {id:'#1921',from:'طارق',against:'مستخدم_z',reason:'سبام',time:'منذ 2 ساعة',priority:'منخفضة'},
    ];
    const priorityColor = {عالية:'var(--red)',متوسطة:'var(--orange)',منخفضة:'var(--text-secondary)'};
    return `
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${reports.map(r=>`
          <div style="
            padding:14px;background:var(--bg-card);
            border:1px solid var(--border-subtle);border-radius:var(--r-xl);
          ">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
              <div>
                <div style="font-size:13px;font-weight:700;margin-bottom:2px;">بلاغ ${r.id}</div>
                <div style="font-size:11px;color:var(--text-secondary);">من: ${r.from} ضد: ${r.against}</div>
              </div>
              <span style="font-size:10px;font-weight:700;color:${priorityColor[r.priority]};">${r.priority}</span>
            </div>
            <div style="font-size:12px;color:var(--text-primary);background:var(--bg-elevated);padding:8px;border-radius:var(--r-md);margin-bottom:10px;">
              السبب: ${r.reason}
            </div>
            <div style="display:flex;gap:6px;align-items:center;">
              <span style="font-size:10px;color:var(--text-muted);flex:1;">${r.time}</span>
              <button class="btn btn-ghost btn-sm" onclick="App.showToast('تم حفظ البلاغ')" style="font-size:10px;">تجاهل</button>
              <button class="btn btn-primary btn-sm" onclick="AdminScreen.banUser(r.against)" style="font-size:10px;background:var(--red);">تبنيد 🔨</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  banUser(name) {
    App.openModal(`
      <div>
        <div class="modal-handle"></div>
        <div style="text-align:center;margin-bottom:20px;">
          <div style="font-size:48px;margin-bottom:10px;">🔨</div>
          <h3 style="font-size:16px;font-weight:800;">تبنيد: ${name}</h3>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px;">
          ${['24 ساعة','3 أيام','7 أيام','دائم'].map(d=>`
            <button class="btn btn-ghost btn-full" onclick="AdminScreen.confirmBan('${name}','${d}')"
              style="color:${d==='دائم'?'var(--red)':'var(--text-primary)'};">
              ${d==='دائم'?'🚫':'⏳'} تبنيد ${d}
            </button>
          `).join('')}
        </div>
        <button class="btn btn-ghost btn-full" onclick="App.closeModal()">إلغاء</button>
      </div>
    `);
  },

  confirmBan(name, duration) {
    App.closeModal();
    App.showToast(`✅ تم تبنيد ${name} لمدة ${duration}`, 'success');
  },

  setTab(tab) {
    this.state.tab = tab;
    document.querySelectorAll('.tab-btn').forEach((b,i)=>b.classList.toggle('active',['overview','users','rooms','reports'][i]===tab));
    const c = document.getElementById('admin-content');
    if(c) c.innerHTML = this.renderContent();
  },

  init() {}
};
