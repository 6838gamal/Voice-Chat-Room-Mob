// =============================================
// VOICE ROOM SCREEN
// =============================================
const RoomScreen = {
  state: { isMuted: false, handRaised: false, showChat: false, showGifts: false, activeTab:'chat' },

  render(params={}) {
    const roomId = params.roomId || 'r1';
    const room = AppData.rooms.find(r=>r.id===roomId) || AppData.rooms[0];
    return `
      <div class="screen room-screen" style="
        min-height:100vh; position:relative; overflow:hidden;
        background:var(--bg-primary);
      ">
        <!-- Room Background -->
        <div style="
          position:absolute; inset:0; pointer-events:none;
          background:${room.gradient};
          opacity:0.25;
        "></div>

        <!-- Room Header -->
        <div style="
          position:relative; z-index:10;
          padding:14px 16px 10px;
          display:flex; align-items:center; gap:10px;
          background:rgba(8,8,15,0.6); backdrop-filter:blur(12px);
        ">
          <div class="header-back" onclick="App.goBack()" style="
            width:36px;height:36px;border-radius:50%;
            background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;
            cursor:pointer;font-size:18px;border:1px solid var(--border-default);
          ">‹</div>
          <div style="flex:1; min-width:0;">
            <div style="font-size:15px; font-weight:800; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${room.name}</div>
            <div style="font-size:11px; color:var(--text-secondary); display:flex; align-items:center; gap:6px;">
              <span style="width:6px;height:6px;background:var(--green);border-radius:50%;display:inline-block;"></span>
              ${room.members} مستخدم نشط
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <button class="btn btn-gold btn-sm" onclick="App.navigate('store')" style="padding:5px 10px;font-size:11px;">💎 إشحن</button>
            <div style="
              width:36px;height:36px;border-radius:50%;
              background:rgba(255,255,255,0.1); display:flex;align-items:center;justify-content:center;
              cursor:pointer;font-size:18px;
            " onclick="RoomScreen.showRoomMenu()">⋮</div>
          </div>
        </div>

        <!-- Room Image -->
        <div style="
          position:relative; z-index:5;
          height:100px; display:flex; align-items:center; justify-content:center;
          overflow:hidden;
        ">
          <div style="font-size:60px; opacity:0.6;">${room.bg}</div>
          <div style="
            position:absolute; inset:0;
            background:linear-gradient(to bottom, transparent, var(--bg-primary));
          "></div>
          <!-- Badges / Tags -->
          <div style="position:absolute; bottom:8px; left:16px; display:flex; gap:6px;">
            ${room.tags.map(t=>`<span style="background:rgba(0,0,0,0.5);backdrop-filter:blur(8px);padding:2px 8px;border-radius:999px;font-size:10px;">#${t}</span>`).join('')}
          </div>
        </div>

        <!-- Seats Grid -->
        <div style="position:relative; z-index:5; padding:0 16px 16px;">
          <!-- Host seat row -->
          <div style="display:flex; justify-content:center; margin-bottom:16px;">
            ${this.renderSeat(AppData.roomSeats[0], true)}
          </div>
          <!-- Other seats -->
          <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px; justify-items:center;">
            ${AppData.roomSeats.slice(1).map(s=>this.renderSeat(s, false)).join('')}
          </div>
        </div>

        <!-- VIP Entrance Animation area -->
        <div id="entrance-area" style="
          position:absolute; top:0; left:0; right:0; height:120px;
          pointer-events:none; z-index:30; overflow:hidden;
        "></div>

        <!-- Chat & Bottom Panel -->
        <div style="
          position:relative; z-index:10;
          border-top:1px solid var(--border-subtle);
          background:rgba(8,8,15,0.85); backdrop-filter:blur(20px);
        ">
          <!-- Tab Buttons -->
          <div style="display:flex; border-bottom:1px solid var(--border-subtle);">
            <button class="tab-btn ${this.state.activeTab==='chat'?'active':''}" 
              onclick="RoomScreen.setTab('chat')"
              style="flex:1;border-radius:0;padding:10px;">💬 دردشة</button>
            <button class="tab-btn ${this.state.activeTab==='members'?'active':''}"
              onclick="RoomScreen.setTab('members')"
              style="flex:1;border-radius:0;padding:10px;">👥 أعضاء</button>
            <button class="tab-btn ${this.state.activeTab==='gifts'?'active':''}"
              onclick="RoomScreen.setTab('gifts')"
              style="flex:1;border-radius:0;padding:10px;">🎁 هدايا</button>
          </div>

          <!-- Chat Messages -->
          <div id="room-tab-content" style="height:140px; overflow-y:auto; scrollbar-width:none;">
            ${this.state.activeTab==='chat' ? this.renderChatTab() :
              this.state.activeTab==='members' ? this.renderMembersTab() :
              this.renderGiftsPanel()}
          </div>

          <!-- Chat Input -->
          ${this.state.activeTab==='chat' ? `
            <div style="
              display:flex; align-items:center; gap:8px;
              padding:8px 12px; border-top:1px solid var(--border-subtle);
            ">
              <input type="text" placeholder="اكتب رسالة..." id="chat-input" style="
                flex:1; background:var(--bg-elevated); border:1px solid var(--border-default);
                border-radius:var(--r-full); padding:8px 14px;
                color:var(--text-primary); font-family:inherit; font-size:13px; outline:none;
              ">
              <button onclick="RoomScreen.sendMessage()" style="
                width:36px;height:36px;border-radius:50%;background:var(--purple-primary);
                border:none;cursor:pointer;font-size:16px;color:white;display:flex;align-items:center;justify-content:center;
              ">↑</button>
            </div>
          ` : ''}

          <!-- Controls Row -->
          <div style="
            display:flex; align-items:center; justify-content:space-around;
            padding:12px 16px 16px;
            border-top:1px solid var(--border-subtle);
          ">
            <!-- Mute -->
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;" onclick="RoomScreen.toggleMute()">
              <div style="
                width:48px;height:48px;border-radius:50%;
                background:${this.state.isMuted?'var(--red)':'var(--glass-bg-strong)'};
                border:1.5px solid ${this.state.isMuted?'var(--red)':'var(--border-default)'};
                display:flex;align-items:center;justify-content:center;font-size:22px;
                transition:all 0.2s;
              ">${this.state.isMuted?'🔇':'🎙️'}</div>
              <span style="font-size:10px;color:var(--text-secondary);">${this.state.isMuted?'إلغاء كتم':'كتم'}</span>
            </div>

            <!-- Hand Raise -->
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;" onclick="RoomScreen.toggleHand()">
              <div style="
                width:48px;height:48px;border-radius:50%;
                background:${this.state.handRaised?'var(--gold-primary)':'var(--glass-bg-strong)'};
                border:1.5px solid ${this.state.handRaised?'var(--gold-primary)':'var(--border-default)'};
                display:flex;align-items:center;justify-content:center;font-size:22px;
                transition:all 0.2s;
              ">✋</div>
              <span style="font-size:10px;color:var(--text-secondary);">رفع يد</span>
            </div>

            <!-- Gift -->
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;" onclick="RoomScreen.openGiftModal()">
              <div style="
                width:48px;height:48px;border-radius:50%;
                background:var(--glass-gold);border:1.5px solid var(--border-gold);
                display:flex;align-items:center;justify-content:center;font-size:22px;
              ">🎁</div>
              <span style="font-size:10px;color:var(--text-secondary);">هدية</span>
            </div>

            <!-- Share -->
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;" onclick="App.showToast('تم نسخ رابط الغرفة')">
              <div style="
                width:48px;height:48px;border-radius:50%;
                background:var(--glass-bg-strong);border:1.5px solid var(--border-default);
                display:flex;align-items:center;justify-content:center;font-size:22px;
              ">📤</div>
              <span style="font-size:10px;color:var(--text-secondary);">مشاركة</span>
            </div>

            <!-- Leave -->
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;" onclick="App.goBack()">
              <div style="
                width:48px;height:48px;border-radius:50%;
                background:rgba(255,75,75,0.15);border:1.5px solid var(--red);
                display:flex;align-items:center;justify-content:center;font-size:22px;
              ">🚪</div>
              <span style="font-size:10px;color:var(--red);">خروج</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderSeat(seat, isHost) {
    if (!seat.user) {
      return `
        <div class="seat" onclick="RoomScreen.requestSeat(${seat.id})">
          <div class="seat-avatar empty" style="
            ${isHost?'width:70px;height:70px;font-size:28px;':''}
            border-color:rgba(255,255,255,0.15);
          ">
            <span style="color:var(--text-muted);font-size:${isHost?'28px':'18px'};">+</span>
          </div>
          <div class="seat-name" style="color:var(--text-muted);">مقعد ${seat.id}</div>
        </div>
      `;
    }
    return `
      <div class="seat" onclick="RoomScreen.showUserOptions('${seat.user.name}')">
        <div class="seat-avatar ${seat.isSpeaking?'speaking':''}" style="
          ${isHost?'width:72px;height:72px;font-size:32px;':''}
          ${seat.isSpeaking ? '' : ''}
          position:relative;
        ">
          <span style="font-size:${isHost?'32px':'22px'};">${seat.user.avatar}</span>
          ${isHost?`<div style="position:absolute;top:-6px;right:-4px;font-size:16px;">👑</div>`:''}
          <div class="seat-mic ${seat.isMuted?'muted':''}">${seat.isMuted?'🔇':'🎙️'}</div>
        </div>
        <div class="seat-name">${seat.user.name}</div>
        <div class="vip-badge ${seat.user.vip}" style="font-size:8px;">${seat.user.vip.toUpperCase()}</div>
      </div>
    `;
  },

  renderChatTab() {
    return `
      <div style="padding:8px 12px; display:flex; flex-direction:column; gap:6px;">
        ${AppData.messages.map(m => m.type==='system' ? `
          <div style="text-align:center;">
            <span style="
              font-size:11px; color:var(--gold-bright);
              background:rgba(212,160,23,0.1); padding:2px 10px; border-radius:999px;
            ">⭐ ${m.msg}</span>
          </div>
        ` : `
          <div style="display:flex; gap:7px; align-items:flex-start;">
            <span style="font-size:18px;">${m.avatar}</span>
            <div>
              <span style="font-size:11px; font-weight:700; color:var(--purple-light);">${m.user}</span>
              ${m.vip ? `<span class="vip-badge ${m.vip}" style="font-size:8px;margin-right:4px;">${m.vip.toUpperCase()}</span>` : ''}
              ${m.type==='gift' ? `<span style="color:var(--gold-bright);font-size:11px;"> أرسل ${m.gift} ${m.giftName}</span>` :
                `<div style="font-size:12px;color:var(--text-primary);margin-top:2px;">${m.msg}</div>`}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderMembersTab() {
    return `
      <div style="padding:8px; display:flex; flex-direction:column; gap:4px;">
        ${AppData.roomSeats.filter(s=>s.user).map(s=>`
          <div style="display:flex;align-items:center;gap:10px;padding:6px 8px;border-radius:var(--r-md);">
            <span style="font-size:22px;">${s.user.avatar}</span>
            <div style="flex:1;">
              <div style="font-size:13px;font-weight:700;">${s.user.name}</div>
              <div class="vip-badge ${s.user.vip}" style="font-size:8px;">${s.user.vip.toUpperCase()}</div>
            </div>
            <span style="font-size:14px;">${s.isMuted?'🔇':'🎙️'}</span>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderGiftsPanel() {
    return `
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:8px;">
        ${AppData.gifts.slice(0,8).map(g=>`
          <div class="gift-item" onclick="RoomScreen.quickSendGift('${g.id}')">
            <span style="font-size:26px;">${g.emoji}</span>
            <span style="font-size:9px;color:var(--text-secondary);">${g.name}</span>
            <span style="font-size:9px;color:var(--gold-bright);">🪙${g.price}</span>
          </div>
        `).join('')}
      </div>
    `;
  },

  setTab(tab) {
    this.state.activeTab = tab;
    const content = document.getElementById('room-tab-content');
    if (content) {
      content.innerHTML = tab==='chat' ? this.renderChatTab() :
                          tab==='members' ? this.renderMembersTab() :
                          this.renderGiftsPanel();
    }
    document.querySelectorAll('.tab-btn').forEach((btn,i) => {
      btn.classList.toggle('active', ['chat','members','gifts'][i] === tab);
    });
  },

  toggleMute() {
    this.state.isMuted = !this.state.isMuted;
    App.showToast(this.state.isMuted ? '🔇 تم كتم الميكروفون' : '🎙️ تم تفعيل الميكروفون');
    App.renderScreen('room');
  },

  toggleHand() {
    this.state.handRaised = !this.state.handRaised;
    App.showToast(this.state.handRaised ? '✋ تم رفع يدك' : 'تم إنزال يدك');
    App.renderScreen('room');
  },

  sendMessage() {
    const input = document.getElementById('chat-input');
    if (!input?.value.trim()) return;
    App.showToast('تم إرسال الرسالة ✓', 'success');
    input.value = '';
  },

  openGiftModal() {
    App.openModal(GiftModal.render(), () => {});
  },

  quickSendGift(giftId) {
    const gift = AppData.gifts.find(g=>g.id===giftId);
    this.showGiftAnimation(gift.emoji);
    App.showToast(`أرسلت ${gift.emoji} ${gift.name}`, 'success');
  },

  showGiftAnimation(emoji) {
    const area = document.getElementById('entrance-area');
    if (!area) return;
    const el = document.createElement('div');
    el.style.cssText = `position:absolute;left:50%;top:50%;font-size:48px;transform:translate(-50%,-50%);animation:gift-fly 1.5s ease both;pointer-events:none;`;
    el.textContent = emoji;
    area.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  },

  showRoomMenu() { App.showToast('قائمة الغرفة'); },
  requestSeat(id) { App.showToast(`طلب المقعد ${id}`); },
  showUserOptions(name) { App.showToast(`خيارات ${name}`); },

  init() {
    // Simulate someone entering
    setTimeout(() => {
      const area = document.getElementById('entrance-area');
      if (!area) return;
      const el = document.createElement('div');
      el.style.cssText = 'position:absolute;left:0;right:0;top:10px;display:flex;align-items:center;justify-content:center;';
      el.innerHTML = `<div style="
        background:linear-gradient(135deg,#4A0D8F,#D4A017);
        border-radius:999px; padding:6px 16px; font-size:12px; font-weight:700;
        animation:entrance-flash 1s ease both; display:flex; align-items:center; gap:6px;
        box-shadow:0 4px 20px rgba(123,47,190,0.5);
      ">🤴 <span>طارق الأمير</span> <span class="svip-badge svip-4" style="font-size:9px;">دخل الغرفة</span> ✨</div>`;
      area.appendChild(el);
      setTimeout(() => el.remove(), 3000);
    }, 1500);
  },
};

// Gift Modal
const GiftModal = {
  selectedGift: null,
  render() {
    return `
      <div>
        <div class="modal-handle"></div>
        <h3 style="font-size:16px;font-weight:800;margin-bottom:16px;text-align:center;">🎁 إرسال هدية</h3>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px;">
          ${AppData.gifts.map(g=>`
            <div class="gift-item" id="gift-${g.id}" onclick="GiftModal.select('${g.id}')">
              <span class="gift-emoji">${g.emoji}</span>
              <span class="gift-name">${g.name}</span>
              <span class="gift-price">🪙${g.price}</span>
            </div>
          `).join('')}
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
          <span style="font-size:12px;color:var(--text-secondary);">رصيدك: 🪙 ${AppData.currentUser.coins.toLocaleString()}</span>
          <button class="btn btn-ghost btn-sm" onclick="App.navigate('store')">شحن 💳</button>
        </div>
        <button class="btn btn-gold btn-full btn-lg" onclick="GiftModal.send()">إرسال الهدية 🎁</button>
      </div>
    `;
  },
  select(id) {
    this.selectedGift = id;
    document.querySelectorAll('.gift-item').forEach(el => el.classList.remove('selected'));
    document.getElementById('gift-'+id)?.classList.add('selected');
  },
  send() {
    if (!this.selectedGift) { App.showToast('اختر هدية أولاً','error'); return; }
    const gift = AppData.gifts.find(g=>g.id===this.selectedGift);
    App.closeModal();
    RoomScreen.showGiftAnimation(gift.emoji);
    App.showToast(`✅ أرسلت ${gift.emoji} ${gift.name}`,'success');
  },
};
