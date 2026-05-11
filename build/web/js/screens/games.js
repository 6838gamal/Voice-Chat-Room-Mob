// =============================================
// GAMES SCREEN
// =============================================
const GamesScreen = {
  render() {
    return `
      <div class="screen" style="padding-bottom:var(--space-xl);">
        <div class="screen-header">
          <div class="header-back" onclick="App.goBack()">‹</div>
          <div class="header-title">🎮 الألعاب</div>
          <div style="display:flex;align-items:center;gap:6px;background:var(--glass-gold);border:1px solid var(--border-gold);border-radius:999px;padding:4px 10px;">
            <span>💎</span>
            <span style="font-size:12px;font-weight:700;color:var(--gold-bright);">2,350</span>
          </div>
        </div>

        <!-- Hero Banner -->
        <div style="padding:16px 18px 0;">
          <div style="
            background:linear-gradient(135deg,#1a0533,#7B2FBE,#D4A017);
            border-radius:var(--r-2xl);padding:20px;position:relative;overflow:hidden;
          ">
            <div style="position:absolute;top:-20px;right:-20px;font-size:100px;opacity:0.15;">🎰</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.7);margin-bottom:4px;">🏆 بطولة اليوم</div>
            <div style="font-size:20px;font-weight:800;margin-bottom:8px;">جوائز يومية 💰</div>
            <div style="font-size:13px;opacity:0.85;margin-bottom:14px;">العب واربح عملات ذهبية</div>
            <button class="btn btn-gold btn-sm">العب الآن 🎲</button>
          </div>
        </div>

        <!-- Quick Stats -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:14px 18px 0;">
          ${[
            {icon:'🏆',label:'انتصاراتي',val:'48'},
            {icon:'💰',label:'أرباحي',val:'12K'},
            {icon:'🎯',label:'الدقة',val:'73%'},
          ].map(s=>`
            <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-lg);padding:12px;text-align:center;">
              <div style="font-size:22px;margin-bottom:4px;">${s.icon}</div>
              <div style="font-size:16px;font-weight:800;">${s.val}</div>
              <div style="font-size:10px;color:var(--text-secondary);">${s.label}</div>
            </div>
          `).join('')}
        </div>

        <!-- Games Grid -->
        <div style="padding:16px 18px 0;">
          <div class="section-title" style="margin-bottom:14px;">🎮 الألعاب المتاحة</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            ${AppData.games.map(game=>`
              <div class="game-card" onclick="GamesScreen.openGame('${game.id}')">
                <div class="game-card-icon" style="background:${game.gradient};">
                  <span>${game.emoji}</span>
                  <div class="game-card-players">👥 ${game.players}</div>
                </div>
                <div class="game-card-body">
                  <div class="game-card-name">${game.name}</div>
                  <div class="game-card-desc">${game.desc}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Leaderboard -->
        <div style="padding:20px 18px 0;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
            <div class="section-title">🏅 المتصدرون</div>
            <div class="section-link">الكل</div>
          </div>
          <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-xl);overflow:hidden;">
            ${AppData.hosts.slice(0,5).map((h,i)=>`
              <div class="rank-item">
                <div class="rank-number rank-${i+1}">${i<3?['🥇','🥈','🥉'][i]:i+1}</div>
                <div class="avatar avatar-sm"><span style="font-size:18px;">${h.avatar}</span></div>
                <div class="rank-info">
                  <div class="rank-name">${h.name}</div>
                  <div class="rank-sub">${h.country} · Lv.${h.level}</div>
                </div>
                <div class="rank-score">${(h.coins/1000).toFixed(0)}K 🪙</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  openGame(id) {
    const game = AppData.games.find(g=>g.id===id);
    App.openModal(`
      <div>
        <div class="modal-handle"></div>
        <div style="text-align:center;margin-bottom:20px;">
          <div style="font-size:64px;margin-bottom:12px;animation:float 2s ease-in-out infinite;">${game.emoji}</div>
          <h3 style="font-size:20px;font-weight:800;">${game.name}</h3>
          <p style="font-size:13px;color:var(--text-secondary);margin-top:6px;">${game.desc}</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;">
          ${[{icon:'👥',label:'اللاعبون',val:game.players},{icon:'💎',label:'الرسوم',val:'10 كوين'},{icon:'🏆',label:'الجائزة',val:'500 كوين'},{icon:'⏱️',label:'المدة',val:'5 دقائق'}].map(s=>`
            <div style="background:var(--bg-elevated);border-radius:var(--r-lg);padding:12px;text-align:center;">
              <div style="font-size:20px;">${s.icon}</div>
              <div style="font-size:13px;font-weight:700;margin-top:4px;">${s.val}</div>
              <div style="font-size:10px;color:var(--text-secondary);">${s.label}</div>
            </div>
          `).join('')}
        </div>
        <button class="btn btn-gold btn-full btn-lg" onclick="App.closeModal();App.showToast('جاري تحميل ${game.name}...')">
          ابدأ اللعبة 🎮
        </button>
      </div>
    `);
  },

  init() {}
};
