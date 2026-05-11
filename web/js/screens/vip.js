// =============================================
// VIP SYSTEM SCREEN
// =============================================
const VIPScreen = {
  state: { tab: 'vip' },

  render() {
    return `
      <div class="screen" style="padding-bottom:var(--space-xl);">
        <div class="screen-header" style="
          background:linear-gradient(135deg, rgba(74,13,143,0.8), rgba(212,160,23,0.3));
          backdrop-filter:blur(20px); border-bottom:1px solid var(--border-purple);
        ">
          <div class="header-back" onclick="App.goBack()">‹</div>
          <div class="header-title gradient-text">نظام VIP / SVIP</div>
        </div>

        <!-- User VIP Status -->
        <div style="padding:20px 18px 0;">
          <div style="
            background:linear-gradient(135deg,#4A0D8F,#7B2FBE,#D4A017);
            border-radius:var(--r-2xl); padding:20px; position:relative; overflow:hidden;
          ">
            <div style="position:absolute;inset:0;background:url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22><circle cx=%22200%22 cy=%22100%22 r=%22150%22 fill=%22none%22 stroke=%22rgba(255,255,255,0.1)%22 stroke-width=%222%22/></svg>');background-size:cover;"></div>
            <div style="position:relative;display:flex;align-items:center;gap:14px;">
              <div style="
                width:64px;height:64px;border-radius:50%;
                background:rgba(255,255,255,0.15);
                border:3px solid var(--gold-bright);
                display:flex;align-items:center;justify-content:center;
                font-size:30px;
                box-shadow:0 0 20px var(--gold-glow);
              ">⚡</div>
              <div>
                <div style="font-size:12px;opacity:0.8;margin-bottom:2px;">مستواك الحالي</div>
                <div class="vip-badge svip-3" style="font-size:13px;padding:4px 14px;">SVIP 3</div>
                <div style="font-size:11px;margin-top:6px;opacity:0.85;">🪙 85,400 / 2,000,000 للمستوى التالي</div>
              </div>
            </div>
            <div class="progress-bar" style="margin-top:14px;height:8px;">
              <div class="progress-fill gold" style="width:4.3%;background:linear-gradient(90deg,var(--gold-primary),var(--gold-bright));"></div>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div style="padding:16px 18px 8px;">
          <div class="tabs">
            <button class="tab-btn ${this.state.tab==='vip'?'active':''}" onclick="VIPScreen.setTab('vip')">VIP (6 مستويات)</button>
            <button class="tab-btn ${this.state.tab==='svip'?'active':''}" onclick="VIPScreen.setTab('svip')">SVIP (12 مستوى)</button>
          </div>
        </div>

        <!-- VIP Levels Grid -->
        <div id="vip-content" style="padding:0 18px;">
          ${this.renderLevels()}
        </div>

        <!-- Benefits Section -->
        <div style="padding:20px 18px 0;">
          <div class="section-title" style="margin-bottom:14px;">✨ مزايا العضوية الذهبية</div>
          ${this.renderBenefits()}
        </div>
      </div>
    `;
  },

  renderLevels() {
    const levels = this.state.tab === 'vip' ? AppData.vipLevels : AppData.svipLevels;
    return `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        ${levels.map((lv, idx) => `
          <div style="
            background:var(--bg-card); border:1px solid var(--border-subtle);
            border-radius:var(--r-xl); padding:16px; cursor:pointer;
            transition:var(--transition-spring); text-align:center;
            ${idx===2?'border-color:var(--border-gold);background:var(--glass-gold);':''}
          " onclick="VIPScreen.selectLevel('${lv.level}')"
            onmouseenter="this.style.transform='translateY(-2px)'"
            onmouseleave="this.style.transform='translateY(0)'"
          >
            <div style="font-size:32px; margin-bottom:8px;">${lv.icon}</div>
            <div class="vip-badge ${lv.class}" style="font-size:11px;margin-bottom:8px;">${lv.level}</div>
            <div style="font-size:12px;color:var(--gold-bright);font-weight:700;margin-bottom:8px;">🪙 ${(lv.coins/1000).toFixed(0)}K</div>
            <div style="font-size:10px;color:var(--text-secondary);">
              ${lv.perks.slice(0,2).map(p=>`<div>• ${p}</div>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderBenefits() {
    const benefits = [
      { icon: '🖼️', title: 'إطارات حصرية', desc: 'إطارات مخصصة لكل مستوى VIP' },
      { icon: '✨', title: 'تأثيرات دخولية', desc: 'انيميشن فاخر عند دخول الغرف' },
      { icon: '🎙️', title: 'أولوية الكلام', desc: 'أولوية للحصول على مقعد الميكروفون' },
      { icon: '🌟', title: 'شارات مميزة', desc: 'شارات حصرية تظهر على ملفك' },
      { icon: '💬', title: 'ميزات الدردشة', desc: 'رسائل ملونة وتأثيرات نصية' },
      { icon: '🛡️', title: 'حماية الحساب', desc: 'مزايا أمان وخصوصية متقدمة' },
    ];
    return `
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${benefits.map(b=>`
          <div style="
            display:flex;align-items:center;gap:12px;padding:14px;
            background:var(--bg-card);border:1px solid var(--border-subtle);
            border-radius:var(--r-lg);
          ">
            <div style="
              width:44px;height:44px;border-radius:var(--r-md);flex-shrink:0;
              background:var(--glass-purple);border:1px solid var(--border-purple);
              display:flex;align-items:center;justify-content:center;font-size:20px;
            ">${b.icon}</div>
            <div>
              <div style="font-size:13px;font-weight:700;">${b.title}</div>
              <div style="font-size:11px;color:var(--text-secondary);margin-top:2px;">${b.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  setTab(tab) {
    this.state.tab = tab;
    document.querySelectorAll('.tab-btn').forEach((b,i)=>b.classList.toggle('active',['vip','svip'][i]===tab));
    const c = document.getElementById('vip-content');
    if(c) c.innerHTML = this.renderLevels();
  },

  selectLevel(level) {
    App.showToast(`تفاصيل ${level} - قريباً`);
  },

  init() {}
};
