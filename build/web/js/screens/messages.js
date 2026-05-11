// =============================================
// MESSAGES SCREEN
// =============================================
const MessagesScreen = {
  render() {
    return `
      <div class="screen" style="padding-bottom:var(--space-xl);">
        <div class="screen-header">
          <div class="header-back" onclick="App.goBack()">‹</div>
          <div class="header-title">💬 الرسائل</div>
          <div style="cursor:pointer;font-size:20px;" onclick="App.showToast('رسالة جديدة')">✏️</div>
        </div>

        <!-- Online Users Strip -->
        <div style="padding:14px 18px 8px;border-bottom:1px solid var(--border-subtle);">
          <div class="h-scroll" style="padding:0;gap:16px;">
            ${AppData.hosts.filter(h=>h.online).map(h=>`
              <div style="display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;" onclick="MessagesScreen.openChat('${h.id}')">
                <div style="position:relative;">
                  <div style="
                    width:50px;height:50px;border-radius:50%;
                    background:var(--bg-elevated);border:2px solid var(--green);
                    display:flex;align-items:center;justify-content:center;font-size:22px;
                  ">${h.avatar}</div>
                  <div style="position:absolute;bottom:0;right:0;width:12px;height:12px;background:var(--green);border-radius:50%;border:2px solid var(--bg-primary);"></div>
                </div>
                <span style="font-size:10px;font-weight:600;white-space:nowrap;">${h.name}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Chat List -->
        <div style="padding:0;">
          ${AppData.chatList.map(c=>`
            <div style="
              display:flex;align-items:center;gap:12px;padding:14px 18px;
              border-bottom:1px solid var(--border-subtle);cursor:pointer;
              transition:var(--transition-fast);
              ${c.unread>0?'background:rgba(123,47,190,0.05);':''}
            " onclick="MessagesScreen.openChat('${c.id}')"
              onmouseenter="this.style.background='var(--glass-bg)'"
              onmouseleave="this.style.background='${c.unread>0?'rgba(123,47,190,0.05)':'transparent'}'"
            >
              <div style="position:relative;">
                <div style="
                  width:52px;height:52px;border-radius:50%;
                  background:var(--bg-elevated);border:2px solid ${c.online?'var(--green)':'var(--border-subtle)'};
                  display:flex;align-items:center;justify-content:center;font-size:24px;
                ">${c.avatar}</div>
                ${c.online?`<div style="position:absolute;bottom:1px;right:1px;width:12px;height:12px;background:var(--green);border-radius:50%;border:2px solid var(--bg-primary);"></div>`:''}
              </div>
              <div style="flex:1;min-width:0;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span style="font-size:14px;font-weight:${c.unread?'800':'600'};">${c.name}</span>
                    <div class="vip-badge ${c.vip}" style="font-size:8px;">${c.vip.toUpperCase()}</div>
                  </div>
                  <span style="font-size:10px;color:var(--text-muted);">${c.time}</span>
                </div>
                <div style="display:flex;align-items:center;justify-content:space-between;">
                  <span style="font-size:12px;color:${c.unread?'var(--text-primary)':'var(--text-secondary)'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;font-weight:${c.unread?'600':'400'};">${c.lastMsg}</span>
                  ${c.unread?`<div style="min-width:20px;height:20px;border-radius:999px;background:var(--purple-primary);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;">${c.unread}</div>`:''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  openChat(id) {
    const chat = AppData.chatList.find(c=>c.id===id) || AppData.hosts.find(h=>h.id===id);
    const name = chat?.name || 'المستخدم';
    const avatar = chat?.avatar || '👤';
    App.openModal(`
      <div style="height:420px;display:flex;flex-direction:column;">
        <div class="modal-handle"></div>
        <!-- Chat Header -->
        <div style="display:flex;align-items:center;gap:10px;padding-bottom:14px;border-bottom:1px solid var(--border-subtle);margin-bottom:12px;">
          <div style="width:44px;height:44px;border-radius:50%;background:var(--bg-elevated);display:flex;align-items:center;justify-content:center;font-size:22px;">${avatar}</div>
          <div>
            <div style="font-size:14px;font-weight:700;">${name}</div>
            <div style="font-size:11px;color:var(--green);">● نشط الآن</div>
          </div>
          <button class="btn btn-ghost btn-sm" style="margin-right:auto;" onclick="App.showToast('ملف ${name}')">ملف الشخصي</button>
        </div>
        <!-- Messages -->
        <div style="flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:8px;padding:0 2px;">
          <div style="align-self:flex-start;max-width:70%;">
            <div style="background:var(--bg-elevated);padding:8px 12px;border-radius:4px 12px 12px 12px;font-size:13px;">مرحباً، كيف حالك؟ 😊</div>
            <span style="font-size:10px;color:var(--text-muted);">10:30</span>
          </div>
          <div style="align-self:flex-end;max-width:70%;">
            <div style="background:var(--purple-primary);padding:8px 12px;border-radius:12px 4px 12px 12px;font-size:13px;">الحمد لله، وأنت؟ 🙏</div>
            <span style="font-size:10px;color:var(--text-muted);display:block;text-align:left;">10:31 ✓✓</span>
          </div>
          <div style="align-self:flex-start;max-width:70%;">
            <div style="background:var(--bg-elevated);padding:8px 12px;border-radius:4px 12px 12px 12px;font-size:13px;">${AppData.chatList.find(c=>c.id===id)?.lastMsg || 'مرحباً!'}</div>
            <span style="font-size:10px;color:var(--text-muted);">${AppData.chatList.find(c=>c.id===id)?.time || 'الآن'}</span>
          </div>
        </div>
        <!-- Input -->
        <div style="display:flex;gap:8px;padding-top:12px;border-top:1px solid var(--border-subtle);margin-top:12px;">
          <button style="background:none;border:none;font-size:20px;cursor:pointer;" onclick="App.showToast('هدية')">🎁</button>
          <input type="text" id="modal-chat-input" placeholder="اكتب رسالة..." style="flex:1;background:var(--bg-elevated);border:1.5px solid var(--border-default);border-radius:999px;padding:8px 14px;color:var(--text-primary);font-family:inherit;font-size:13px;outline:none;">
          <button onclick="MessagesScreen.sendModalMsg()" style="width:36px;height:36px;border-radius:50%;background:var(--purple-primary);border:none;cursor:pointer;font-size:16px;color:white;display:flex;align-items:center;justify-content:center;">↑</button>
        </div>
      </div>
    `);
  },

  sendModalMsg() {
    const input = document.getElementById('modal-chat-input');
    if(!input?.value.trim()) return;
    App.showToast('تم الإرسال ✓','success');
    input.value = '';
  },

  init() {}
};
