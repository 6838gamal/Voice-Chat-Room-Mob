// =============================================
// PROFILE SCREEN
// =============================================
const ProfileScreen = {
  state: { tab: 'gifts' },

  render() {
    const u = AppData.currentUser;
    return `
      <div class="screen" style="padding-bottom:var(--space-xl);">
        <!-- Header Background -->
        <div style="
          height:180px; position:relative; overflow:hidden;
          background:linear-gradient(135deg,#1a0040,#4A0D8F,#7B2FBE,#D4A017);
        ">
          <div style="position:absolute;inset:0;background:radial-gradient(circle at 70% 50%,rgba(212,160,23,0.3),transparent 60%);"></div>
          <!-- Back & Settings -->
          <div style="position:absolute;top:16px;right:16px;display:flex;gap:8px;">
            <div style="width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;" onclick="App.showToast('إعدادات الملف')">⚙️</div>
          </div>
          <div style="position:absolute;top:16px;left:16px;">
            <div style="width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;" onclick="App.goBack()">‹</div>
          </div>
          <!-- Country flag -->
          <div style="position:absolute;bottom:80px;right:20px;font-size:28px;">${u.country}</div>
        </div>

        <!-- Avatar overlapping header -->
        <div style="padding:0 18px; margin-top:-60px; position:relative; z-index:10;">
          <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:16px;">
            <div style="position:relative;">
              <div style="
                width:88px;height:88px;border-radius:50%;
                background:var(--bg-card);
                border:4px solid var(--bg-primary);
                display:flex;align-items:center;justify-content:center;
                font-size:40px;
                box-shadow:0 0 30px var(--purple-glow);
              ">${u.avatar}</div>
              <!-- VIP ring -->
              <div style="
                position:absolute;inset:-6px;border-radius:50%;
                border:3px solid transparent;
                background:linear-gradient(var(--bg-primary),var(--bg-primary)) padding-box,
                           linear-gradient(135deg,#7B2FBE,#FFD700) border-box;
              "></div>
              <!-- Online indicator -->
              <div style="
                position:absolute;bottom:4px;right:4px;
                width:16px;height:16px;border-radius:50%;
                background:var(--green);border:3px solid var(--bg-primary);
              "></div>
              <!-- Edit button -->
              <div style="
                position:absolute;bottom:0;left:0;
                width:28px;height:28px;border-radius:50%;
                background:var(--purple-primary);
                display:flex;align-items:center;justify-content:center;
                cursor:pointer;font-size:13px;
                border:2px solid var(--bg-primary);
              " onclick="App.showToast('تعديل الصورة')">✏️</div>
            </div>
            <div style="display:flex;gap:8px;padding-top:40px;">
              <button class="btn btn-outline-purple btn-sm">✉️ رسالة</button>
              <button class="btn btn-primary btn-sm">+ متابعة</button>
            </div>
          </div>

          <!-- Name & Info -->
          <div style="margin-bottom:14px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
              <span style="font-size:20px;font-weight:800;">${u.name}</span>
              <div class="vip-badge ${u.vip}" style="font-size:10px;">${u.vip.toUpperCase()}</div>
            </div>
            <div style="font-size:13px;color:var(--text-secondary);margin-bottom:6px;">${u.username}</div>
            <div style="font-size:13px;color:var(--text-primary);line-height:1.5;">${u.bio}</div>
          </div>

          <!-- Agency Badge -->
          <div style="
            display:inline-flex;align-items:center;gap:6px;
            background:var(--glass-gold);border:1px solid var(--border-gold);
            border-radius:999px;padding:5px 12px;margin-bottom:14px;cursor:pointer;
          " onclick="App.navigate('agencies')">
            <span style="font-size:14px;">⭐</span>
            <span style="font-size:12px;font-weight:700;color:var(--gold-bright);">${u.agency}</span>
          </div>

          <!-- Stats -->
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border-subtle);border-radius:var(--r-xl);overflow:hidden;margin-bottom:16px;">
            ${[
              {val:u.followers.toLocaleString(),label:'متابع'},
              {val:u.following.toLocaleString(),label:'يتابع'},
              {val:u.gifts_received.toLocaleString(),label:'هدية 🎁'},
            ].map(s=>`
              <div style="background:var(--bg-card);padding:14px;text-align:center;cursor:pointer;">
                <div style="font-size:18px;font-weight:800;">${s.val}</div>
                <div style="font-size:11px;color:var(--text-secondary);margin-top:2px;">${s.label}</div>
              </div>
            `).join('')}
          </div>

          <!-- Level Progress -->
          <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-xl);padding:14px;margin-bottom:16px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <span style="font-size:13px;font-weight:700;">المستوى ${u.level}</span>
              <span style="font-size:11px;color:var(--text-secondary);">12,400 / 20,000 XP</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:62%;"></div></div>
            <div style="font-size:10px;color:var(--text-secondary);margin-top:6px;">7,600 XP للمستوى التالي</div>
          </div>

          <!-- Tabs -->
          <div class="tabs" style="margin-bottom:16px;">
            ${['gifts','wall','achievements'].map((t,i)=>`
              <button class="tab-btn ${this.state.tab===t?'active':''}" onclick="ProfileScreen.setTab('${t}')">${['🎁 الهدايا','💬 الحائط','🏅 الإنجازات'][i]}</button>
            `).join('')}
          </div>

          <!-- Tab Content -->
          <div id="profile-tab">
            ${this.renderTabContent()}
          </div>
        </div>
      </div>
    `;
  },

  renderTabContent() {
    if (this.state.tab === 'gifts') {
      return `
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">
          ${AppData.gifts.slice(0,8).map(g=>`
            <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-lg);padding:12px;text-align:center;">
              <div style="font-size:28px;">${g.emoji}</div>
              <div style="font-size:10px;color:var(--text-secondary);margin-top:4px;">${g.name}</div>
              <div style="font-size:10px;color:var(--gold-bright);font-weight:700;">${Math.floor(Math.random()*50)+1}×</div>
            </div>
          `).join('')}
        </div>
      `;
    }
    if (this.state.tab === 'wall') {
      return `
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${AppData.chatList.map(c=>`
            <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-xl);padding:14px;display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:28px;">${c.avatar}</span>
              <div style="flex:1;">
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
                  <span style="font-size:13px;font-weight:700;">${c.name}</span>
                  <div class="vip-badge ${c.vip}" style="font-size:8px;">${c.vip.toUpperCase()}</div>
                </div>
                <div style="font-size:12px;color:var(--text-secondary);">${c.lastMsg}</div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
    // Achievements
    const achievements = [
      {icon:'🏆',name:'بطل الغرف',desc:'دخلت 1000 غرفة',done:true},
      {icon:'🎁',name:'المحسن',desc:'أرسلت 500 هدية',done:true},
      {icon:'⭐',name:'نجم التقييم',desc:'حصلت على 5 نجوم',done:true},
      {icon:'🌟',name:'القائد',desc:'استضفت 100 غرفة',done:false},
      {icon:'💎',name:'الماسي',desc:'اشتر عضوية SVIP',done:false},
      {icon:'🦁',name:'الأسد',desc:'قاتل 30 يوماً متتالية',done:false},
    ];
    return `
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${achievements.map(a=>`
          <div style="
            display:flex;align-items:center;gap:12px;padding:14px;
            background:var(--bg-card);border:1px solid ${a.done?'var(--border-gold)':'var(--border-subtle)'};
            border-radius:var(--r-xl);opacity:${a.done?1:0.6};
          ">
            <div style="font-size:32px;${!a.done?'filter:grayscale(1);':''}">${a.icon}</div>
            <div style="flex:1;">
              <div style="font-size:13px;font-weight:700;">${a.name}</div>
              <div style="font-size:11px;color:var(--text-secondary);">${a.desc}</div>
            </div>
            ${a.done?`<span style="color:var(--green);font-size:18px;">✓</span>`:`<span style="color:var(--text-muted);font-size:12px;">قريباً</span>`}
          </div>
        `).join('')}
      </div>
    `;
  },

  setTab(tab) {
    this.state.tab = tab;
    document.querySelectorAll('.tab-btn').forEach((b,i)=>b.classList.toggle('active',['gifts','wall','achievements'][i]===tab));
    const c = document.getElementById('profile-tab');
    if(c) c.innerHTML = this.renderTabContent();
  },

  init() {}
};
