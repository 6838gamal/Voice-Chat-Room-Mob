// =============================================
// HOME SCREEN
// =============================================
const HomeScreen = {
  render() {
    const u = AppData.currentUser;
    return `
      <div class="screen" style="background:var(--bg-primary); padding-bottom:var(--space-xl);">
        <!-- Header -->
        <div style="
          padding:16px 18px 12px;
          background: rgba(8,8,15,0.85);
          backdrop-filter:blur(20px);
          position:sticky; top:0; z-index:50;
          border-bottom:1px solid var(--border-subtle);
        ">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div class="avatar avatar-md avatar-ring-gold" style="cursor:pointer;" onclick="App.navigate('profile')">
                <span style="font-size:22px;">${u.avatar}</span>
              </div>
              <div>
                <div style="font-size:13px; color:var(--text-secondary);">مرحباً 👋</div>
                <div style="font-size:15px; font-weight:800;">${u.name}</div>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <!-- Coins -->
              <div style="
                display:flex; align-items:center; gap:5px;
                background:var(--glass-gold); border:1px solid var(--border-gold);
                border-radius:var(--r-full); padding:5px 10px;
                cursor:pointer;
              " onclick="App.navigate('store')">
                <span style="font-size:14px;">🪙</span>
                <span style="font-size:12px; font-weight:700; color:var(--gold-bright);">${(u.coins/1000).toFixed(1)}K</span>
              </div>
              <!-- Notifications -->
              <div style="position:relative; cursor:pointer;" onclick="App.navigate('notifications')">
                <div style="
                  width:36px; height:36px; border-radius:50%;
                  background:var(--glass-bg-strong); border:1px solid var(--border-default);
                  display:flex; align-items:center; justify-content:center; font-size:18px;
                ">🔔</div>
                <div style="
                  position:absolute; top:-2px; right:-2px;
                  width:14px; height:14px; border-radius:50%;
                  background:var(--red); border:2px solid var(--bg-primary);
                  font-size:8px; font-weight:700; display:flex; align-items:center; justify-content:center;
                ">3</div>
              </div>
            </div>
          </div>
          <!-- Search bar -->
          <div class="search-bar" onclick="App.navigate('search')" style="cursor:pointer;">
            <span class="search-icon">🔍</span>
            <input type="text" placeholder="ابحث عن غرف، مضيفين، أصدقاء..." readonly>
          </div>
        </div>

        <!-- VIP Banner -->
        <div style="padding:14px 18px 0;">
          <div class="h-scroll" style="padding:0;">
            ${this.renderBanners()}
          </div>
        </div>

        <!-- Live Rooms -->
        <div style="margin-top:20px;">
          <div class="section-header">
            <div class="section-title">🔴 الغرف الحية</div>
            <div class="section-link" onclick="App.showToast('عرض كل الغرف')">عرض الكل</div>
          </div>
          <div class="h-scroll">
            ${AppData.rooms.filter(r=>r.isLive).map(r => this.renderRoomCard(r)).join('')}
          </div>
        </div>

        <!-- Top Hosts -->
        <div style="margin-top:24px;">
          <div class="section-header">
            <div class="section-title">🌟 أفضل المضيفين</div>
            <div class="section-link" onclick="App.navigate('agencies')">عرض الكل</div>
          </div>
          <div class="h-scroll">
            ${AppData.hosts.map(h => this.renderHostCard(h)).join('')}
          </div>
        </div>

        <!-- Active Users -->
        <div style="margin-top:24px;">
          <div class="section-header">
            <div class="section-title">👥 المستخدمون النشطون</div>
            <div class="section-link" onclick="App.showToast('عرض الكل')">عرض الكل</div>
          </div>
          <div class="h-scroll">
            ${this.renderActiveUsers()}
          </div>
        </div>

        <!-- New Rooms -->
        <div style="margin-top:24px;">
          <div class="section-header">
            <div class="section-title">✨ غرف جديدة</div>
            <div class="section-link" onclick="App.showToast('عرض الكل')">عرض الكل</div>
          </div>
          <div style="display:flex; flex-direction:column; gap:10px; padding:0 18px;">
            ${AppData.rooms.slice(0,3).map(r => this.renderRoomListItem(r)).join('')}
          </div>
        </div>

        <!-- Agencies -->
        <div style="margin-top:24px; margin-bottom:12px;">
          <div class="section-header">
            <div class="section-title">🏆 الوكالات الكبرى</div>
            <div class="section-link" onclick="App.navigate('agencies')">عرض الكل</div>
          </div>
          <div class="h-scroll">
            ${AppData.agencies.slice(0,4).map(a => this.renderAgencyCard(a)).join('')}
          </div>
        </div>
      </div>
    `;
  },

  renderBanners() {
    const banners = [
      { title: 'عروض VIP حصرية 🔥', sub: 'احصل على مزايا ذهبية اليوم', btn: 'اشترك الآن', grad: 'linear-gradient(135deg,#4A0D8F,#D4A017)', icon: '👑' },
      { title: 'ليالي الطرب 🎵', sub: 'انضم لأكبر غرفة موسيقية', btn: 'دخول الغرفة', grad: 'linear-gradient(135deg,#1a0533,#7B2FBE)', icon: '🎤' },
      { title: 'بطولة الألعاب 🎮', sub: 'جوائز نقدية يومياً', btn: 'العب الآن', grad: 'linear-gradient(135deg,#0d1b2a,#D4A017)', icon: '🏆' },
    ];
    return banners.map(b => `
      <div class="banner-slide" style="width:280px; background:${b.grad}; flex-shrink:0;"
        onclick="App.showToast('${b.title}')">
        <div class="banner-content">
          <div style="flex:1;">
            <div class="banner-title">${b.title}</div>
            <div class="banner-sub">${b.sub}</div>
            <button class="btn btn-gold btn-sm" onclick="event.stopPropagation();">${b.btn}</button>
          </div>
          <div style="font-size:56px; opacity:0.9;">${b.icon}</div>
        </div>
      </div>
    `).join('');
  },

  renderRoomCard(room) {
    return `
      <div class="room-card" style="width:200px;" onclick="App.navigate('room', {roomId:'${room.id}'})">
        <div class="room-card-img" style="background:${room.gradient};">
          <div style="font-size:52px; position:relative; z-index:1;">${room.bg}</div>
          <div class="room-gradient"></div>
        </div>
        ${room.isLive ? `<div class="room-card-live">LIVE</div>` : ''}
        <div class="room-card-count">👥 ${room.members}</div>
        <div class="room-card-body">
          <div class="room-card-name">${room.name}</div>
          <div class="room-card-meta">
            <span>${room.hostAvatar} ${room.host}</span>
            <span style="margin-right:auto;">${room.category}</span>
          </div>
        </div>
      </div>
    `;
  },

  renderHostCard(host) {
    return `
      <div class="host-card" onclick="App.showProfile('${host.id}')">
        <div class="avatar avatar-lg ${host.vip.includes('svip') ? 'avatar-ring-gold' : 'avatar-ring-purple'}" style="position:relative;">
          <span style="font-size:30px;">${host.avatar}</span>
          ${host.online ? `<div style="position:absolute;bottom:2px;right:2px;width:10px;height:10px;background:var(--green);border-radius:50%;border:2px solid var(--bg-card);"></div>` : ''}
        </div>
        <div class="host-name">${host.name}</div>
        <div class="host-level">Lv.${host.level}</div>
        <div class="vip-badge ${host.vip}" style="font-size:9px;">${host.vip.toUpperCase()}</div>
      </div>
    `;
  },

  renderActiveUsers() {
    const users = ['🧑‍🎤','👩‍💫','🤴','👸','🧙‍♂️','👩‍🎨','🧑‍💼','👨‍🎤'].map((em,i) => ({
      emoji: em, name: ['سعد','ريم','فهد','نورة','علي','مريم','خالد','هند'][i],
      online: Math.random() > 0.3,
    }));
    return users.map(u => `
      <div style="display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;" onclick="App.showToast('عرض ملف ${u.name}')">
        <div style="position:relative;">
          <div style="
            width:52px;height:52px;border-radius:50%;
            background:var(--bg-elevated); border:2px solid ${u.online?'var(--green)':'var(--border-default)'};
            display:flex;align-items:center;justify-content:center;font-size:24px;
          ">${u.emoji}</div>
          ${u.online?`<div style="position:absolute;bottom:0;right:0;width:12px;height:12px;background:var(--green);border-radius:50%;border:2px solid var(--bg-primary);"></div>`:''}
        </div>
        <div style="font-size:10px;font-weight:600;">${u.name}</div>
      </div>
    `).join('');
  },

  renderRoomListItem(room) {
    return `
      <div style="
        display:flex; align-items:center; gap:12px; padding:12px;
        background:var(--bg-card); border-radius:var(--r-lg); border:1px solid var(--border-subtle);
        cursor:pointer; transition:var(--transition-fast);
      " onclick="App.navigate('room', {roomId:'${room.id}'})"
        onmouseenter="this.style.borderColor='var(--border-purple)'"
        onmouseleave="this.style.borderColor='var(--border-subtle)'"
      >
        <div style="
          width:52px; height:52px; border-radius:var(--r-md); flex-shrink:0;
          background:${room.gradient}; display:flex; align-items:center; justify-content:center;
          font-size:24px;
        ">${room.bg}</div>
        <div style="flex:1; min-width:0;">
          <div style="font-size:14px; font-weight:700; margin-bottom:3px;">${room.name}</div>
          <div style="font-size:11px; color:var(--text-secondary); display:flex; gap:10px;">
            <span>👤 ${room.host}</span>
            <span>👥 ${room.members}</span>
          </div>
        </div>
        <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
          ${room.isLive ? `<div style="background:var(--red);color:white;font-size:9px;font-weight:700;padding:2px 6px;border-radius:999px;">LIVE</div>` : ''}
          <div style="font-size:10px; background:var(--glass-bg); border-radius:999px; padding:2px 8px; color:var(--text-secondary);">${room.category}</div>
        </div>
      </div>
    `;
  },

  renderAgencyCard(agency) {
    return `
      <div style="
        width:140px; flex-shrink:0; padding:14px 12px;
        background:var(--bg-card); border:1px solid var(--border-subtle);
        border-radius:var(--r-xl); cursor:pointer; text-align:center;
        transition:var(--transition-spring);
      " onclick="App.navigate('agencies')"
        onmouseenter="this.style.borderColor='var(--border-gold)'"
        onmouseleave="this.style.borderColor='var(--border-subtle)'"
      >
        <div style="font-size:36px; margin-bottom:6px;">${agency.emoji}</div>
        <div style="font-size:12px; font-weight:700; margin-bottom:4px;">${agency.name}</div>
        <div style="font-size:10px; color:var(--text-secondary);">${agency.hosts} مضيف</div>
        <div class="badge badge-vip" style="margin-top:6px; font-size:9px;">${agency.badge}</div>
      </div>
    `;
  },

  init() {}
};
