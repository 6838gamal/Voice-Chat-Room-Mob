// =============================================
// NOTIFICATIONS SCREEN
// =============================================
const NotificationsScreen = {
  render() {
    const typeIcon = {gift:'🎁',invite:'🚪',follow:'👤',vip:'⭐',message:'💬',system:'🔔'};
    const typeColor = {gift:'var(--gold-bright)',invite:'var(--purple-light)',follow:'var(--green)',vip:'var(--gold-bright)',message:'var(--blue)',system:'var(--text-secondary)'};

    return `
      <div class="screen" style="padding-bottom:var(--space-xl);">
        <div class="screen-header">
          <div class="header-back" onclick="App.goBack()">‹</div>
          <div class="header-title">🔔 الإشعارات</div>
          <button style="background:none;border:none;color:var(--purple-light);font-family:inherit;font-size:12px;font-weight:700;cursor:pointer;" onclick="App.showToast('تم قراءة الكل')">قراءة الكل</button>
        </div>

        <!-- Unread count -->
        <div style="padding:14px 18px 8px;">
          <div style="
            display:inline-flex;align-items:center;gap:8px;
            background:var(--glass-purple);border:1px solid var(--border-purple);
            border-radius:var(--r-full);padding:6px 14px;
          ">
            <div style="width:8px;height:8px;border-radius:50%;background:var(--purple-light);animation:pulse 1.5s ease infinite;"></div>
            <span style="font-size:12px;font-weight:700;color:var(--purple-light);">3 إشعارات غير مقروءة</span>
          </div>
        </div>

        <!-- Notifications List -->
        <div style="padding:0 18px;">
          ${AppData.notifications.map(n => `
            <div style="
              display:flex;align-items:flex-start;gap:12px;padding:14px;margin-bottom:8px;
              background:${n.read?'var(--bg-card)':'rgba(123,47,190,0.08)'};
              border:1px solid ${n.read?'var(--border-subtle)':'var(--border-purple)'};
              border-radius:var(--r-xl);cursor:pointer;transition:var(--transition-fast);
            " onclick="NotificationsScreen.onNotif('${n.id}')"
              onmouseenter="this.style.borderColor='var(--border-purple)'"
              onmouseleave="this.style.borderColor='${n.read?'var(--border-subtle)':'var(--border-purple)'}'"
            >
              <!-- Icon/Avatar -->
              <div style="
                width:44px;height:44px;border-radius:50%;flex-shrink:0;
                background:var(--bg-elevated);border:2px solid ${typeColor[n.type]||'var(--border-default)'};
                display:flex;align-items:center;justify-content:center;font-size:20px;
              ">${n.avatar}</div>

              <div style="flex:1;min-width:0;">
                <div style="font-size:13px;font-weight:${n.read?'500':'700'};color:var(--text-primary);margin-bottom:4px;line-height:1.4;">
                  <span style="color:${typeColor[n.type]};">${typeIcon[n.type]}</span>
                  ${n.msg}
                </div>
                <div style="font-size:11px;color:var(--text-muted);">${n.time}</div>
              </div>

              <!-- Unread dot -->
              ${!n.read?`<div style="width:8px;height:8px;border-radius:50%;background:var(--purple-primary);flex-shrink:0;margin-top:4px;"></div>`:''}
            </div>
          `).join('')}

          <!-- Load more -->
          <div style="text-align:center;padding:16px;">
            <button class="btn btn-ghost" onclick="App.showToast('تم تحميل المزيد')">تحميل المزيد</button>
          </div>
        </div>
      </div>
    `;
  },

  onNotif(id) {
    const n = AppData.notifications.find(x=>x.id===id);
    if (!n) return;
    n.read = true;
    if (n.type === 'invite') App.navigate('room');
    else if (n.type === 'gift') App.navigate('profile');
    else if (n.type === 'message') App.navigate('messages');
    else App.showToast(n.msg);
  },

  init() {}
};
