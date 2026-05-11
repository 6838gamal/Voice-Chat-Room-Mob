// =============================================
// VOICE ROOM SCREEN (with Animation Engine)
// =============================================
const RoomScreen = {
  state: { isMuted: false, handRaised: false, activeTab:'chat', entranceQueue: [] },
  autoEntranceTimer: null,

  render(params={}) {
    const roomId = params.roomId || 'r1';
    const room = AppData.rooms.find(r=>r.id===roomId) || AppData.rooms[0];
    return `
      <div class="screen room-screen" style="
        min-height:100vh; position:relative; overflow:hidden;
        background:var(--bg-primary);
      ">
        <!-- Room Background glow -->
        <div style="position:absolute;inset:0;pointer-events:none;background:${room.gradient};opacity:0.18;"></div>

        <!-- ANIMATION LAYER — all gifts/entrances render here -->
        <div id="anim-layer" style="
          position:absolute; inset:0; z-index:400; pointer-events:none; overflow:hidden;
        "></div>

        <!-- Room Header -->
        <div style="
          position:relative; z-index:10;
          padding:14px 16px 10px;
          display:flex; align-items:center; gap:10px;
          background:rgba(8,8,15,0.65); backdrop-filter:blur(14px);
          border-bottom:1px solid var(--border-subtle);
        ">
          <div style="
            width:36px;height:36px;border-radius:50%;
            background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;
            cursor:pointer;font-size:20px;border:1px solid var(--border-default);
          " onclick="App.goBack()">‹</div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:15px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${room.name}</div>
            <div style="font-size:11px;color:var(--text-secondary);display:flex;align-items:center;gap:6px;">
              <span style="width:6px;height:6px;background:var(--green);border-radius:50%;display:inline-block;animation:pulse 1.5s ease infinite;"></span>
              ${room.members} مستخدم · مباشر
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button class="btn btn-gold btn-sm" onclick="App.navigate('store')" style="padding:5px 10px;font-size:11px;">💎 إشحن</button>
            <div style="
              width:36px;height:36px;border-radius:50%;
              background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;
              cursor:pointer;font-size:18px;
            " onclick="RoomScreen.showRoomMenu()">⋯</div>
          </div>
        </div>

        <!-- Room banner / emoji -->
        <div style="position:relative;z-index:5;height:90px;display:flex;align-items:center;justify-content:center;overflow:hidden;">
          <div style="font-size:58px;opacity:0.55;filter:blur(0.5px);">${room.bg}</div>
          <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,var(--bg-primary));"></div>
          <div style="position:absolute;bottom:8px;left:16px;display:flex;gap:6px;">
            ${room.tags.map(t=>`<span style="background:rgba(0,0,0,0.55);backdrop-filter:blur(8px);padding:2px 8px;border-radius:999px;font-size:10px;">#${t}</span>`).join('')}
          </div>
        </div>

        <!-- DEMO ANIMATION PANEL -->
        <div style="position:relative;z-index:10;padding:0 16px 8px;">
          <div style="
            background:rgba(123,47,190,0.12); border:1px solid var(--border-purple);
            border-radius:var(--r-xl); padding:10px 12px;
          ">
            <div style="font-size:10px;font-weight:700;color:var(--purple-light);margin-bottom:8px;text-align:center;letter-spacing:1px;">🎬 تجربة الأنيميشن</div>
            <div style="display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px;">
              <button class="btn btn-ghost btn-sm" style="flex-shrink:0;font-size:10px;padding:5px 10px;" onclick="RoomScreen.demoGift('normal')">🌹 هدية عادية</button>
              <button class="btn btn-ghost btn-sm" style="flex-shrink:0;font-size:10px;padding:5px 10px;" onclick="RoomScreen.demoGift('luxury')">👑 هدية فاخرة</button>
              <button class="btn btn-ghost btn-sm" style="flex-shrink:0;font-size:10px;padding:5px 10px;" onclick="RoomScreen.demoGift('royal')">🏰 ملكية</button>
              <button class="btn btn-ghost btn-sm" style="flex-shrink:0;font-size:10px;padding:5px 10px;" onclick="RoomScreen.demoCombo()">💥 كومبو</button>
              <button class="btn btn-ghost btn-sm" style="flex-shrink:0;font-size:10px;padding:5px 10px;" onclick="RoomScreen.demoEntrance('vip-6')">🔥 VIP دخولية</button>
              <button class="btn btn-ghost btn-sm" style="flex-shrink:0;font-size:10px;padding:5px 10px;" onclick="RoomScreen.demoEntrance('svip-3')">💜 SVIP دخولية</button>
              <button class="btn btn-ghost btn-sm" style="flex-shrink:0;font-size:10px;padding:5px 10px;" onclick="RoomScreen.demoEntrance('svip-6')">👑 ملكية دخولية</button>
              <button class="btn btn-ghost btn-sm" style="flex-shrink:0;font-size:10px;padding:5px 10px;" onclick="RoomScreen.demoHearts()">❤️ قلوب</button>
              <button class="btn btn-ghost btn-sm" style="flex-shrink:0;font-size:10px;padding:5px 10px;" onclick="RoomScreen.demoCoinRain()">🪙 مطر عملات</button>
            </div>
          </div>
        </div>

        <!-- Seats Grid -->
        <div style="position:relative;z-index:5;padding:0 16px 12px;">
          <div style="display:flex;justify-content:center;margin-bottom:14px;">
            ${this.renderSeat(AppData.roomSeats[0], true)}
          </div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;justify-items:center;">
            ${AppData.roomSeats.slice(1).map(s=>this.renderSeat(s,false)).join('')}
          </div>
        </div>

        <!-- Bottom panel: tabs + chat + controls -->
        <div style="
          position:relative; z-index:10;
          border-top:1px solid var(--border-subtle);
          background:rgba(8,8,15,0.88); backdrop-filter:blur(20px);
        ">
          <!-- Tabs -->
          <div style="display:flex;border-bottom:1px solid var(--border-subtle);">
            <button class="tab-btn ${this.state.activeTab==='chat'?'active':''}" onclick="RoomScreen.setTab('chat')" style="flex:1;border-radius:0;padding:9px;">💬 دردشة</button>
            <button class="tab-btn ${this.state.activeTab==='members'?'active':''}" onclick="RoomScreen.setTab('members')" style="flex:1;border-radius:0;padding:9px;">👥 أعضاء</button>
            <button class="tab-btn ${this.state.activeTab==='gifts'?'active':''}" onclick="RoomScreen.setTab('gifts')" style="flex:1;border-radius:0;padding:9px;">🎁 هدايا</button>
          </div>

          <!-- Tab content -->
          <div id="room-tab-content" style="height:130px;overflow-y:auto;scrollbar-width:none;">
            ${this.state.activeTab==='chat' ? this.renderChatTab() : this.state.activeTab==='members' ? this.renderMembersTab() : this.renderGiftsPanel()}
          </div>

          <!-- Chat input (chat tab only) -->
          ${this.state.activeTab==='chat' ? `
            <div style="display:flex;align-items:center;gap:8px;padding:7px 12px;border-top:1px solid var(--border-subtle);">
              <input type="text" placeholder="اكتب رسالة..." id="chat-input" style="
                flex:1;background:var(--bg-elevated);border:1px solid var(--border-default);
                border-radius:999px;padding:8px 14px;color:var(--text-primary);
                font-family:inherit;font-size:13px;outline:none;
              ">
              <button onclick="RoomScreen.sendMessage()" style="
                width:34px;height:34px;border-radius:50%;background:var(--purple-primary);
                border:none;cursor:pointer;font-size:15px;color:white;
                display:flex;align-items:center;justify-content:center;
              ">↑</button>
            </div>
          ` : ''}

          <!-- Controls -->
          <div style="display:flex;align-items:center;justify-content:space-around;padding:10px 16px 14px;border-top:1px solid var(--border-subtle);">

            <div style="display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;" onclick="RoomScreen.toggleMute()">
              <div style="
                width:46px;height:46px;border-radius:50%;
                background:${this.state.isMuted?'rgba(255,75,75,0.2)':'var(--glass-bg-strong)'};
                border:1.5px solid ${this.state.isMuted?'var(--red)':'var(--border-default)'};
                display:flex;align-items:center;justify-content:center;font-size:20px;
                transition:all 0.2s;
              ">${this.state.isMuted?'🔇':'🎙️'}</div>
              <span style="font-size:9px;color:var(--text-secondary);">${this.state.isMuted?'إلغاء كتم':'كتم'}</span>
            </div>

            <div style="display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;" onclick="RoomScreen.toggleHand()">
              <div style="
                width:46px;height:46px;border-radius:50%;
                background:${this.state.handRaised?'rgba(212,160,23,0.2)':'var(--glass-bg-strong)'};
                border:1.5px solid ${this.state.handRaised?'var(--gold-primary)':'var(--border-default)'};
                display:flex;align-items:center;justify-content:center;font-size:20px;
                transition:all 0.2s;
              ">✋</div>
              <span style="font-size:9px;color:var(--text-secondary);">رفع يد</span>
            </div>

            <div style="display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;" onclick="RoomScreen.openGiftModal()">
              <div style="
                width:46px;height:46px;border-radius:50%;
                background:var(--glass-gold);border:1.5px solid var(--border-gold);
                display:flex;align-items:center;justify-content:center;font-size:20px;
              ">🎁</div>
              <span style="font-size:9px;color:var(--text-secondary);">هدية</span>
            </div>

            <div style="display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;" onclick="RoomScreen.demoHearts()">
              <div style="
                width:46px;height:46px;border-radius:50%;
                background:rgba(255,75,75,0.1);border:1.5px solid rgba(255,75,75,0.3);
                display:flex;align-items:center;justify-content:center;font-size:20px;
              ">❤️</div>
              <span style="font-size:9px;color:var(--text-secondary);">قلوب</span>
            </div>

            <div style="display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;" onclick="App.goBack()">
              <div style="
                width:46px;height:46px;border-radius:50%;
                background:rgba(255,75,75,0.1);border:1.5px solid var(--red);
                display:flex;align-items:center;justify-content:center;font-size:20px;
              ">🚪</div>
              <span style="font-size:9px;color:var(--red);">خروج</span>
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
          <div class="seat-avatar empty" style="${isHost?'width:68px;height:68px;':''}" >
            <span style="color:var(--text-muted);font-size:${isHost?'26px':'16px'};">+</span>
          </div>
          <div class="seat-name" style="color:var(--text-muted);">مقعد ${seat.id}</div>
        </div>`;
    }
    return `
      <div class="seat" onclick="RoomScreen.showUserOptions('${seat.user.name}')">
        <div class="seat-avatar ${seat.isSpeaking?'speaking':''}" style="
          ${isHost?'width:70px;height:70px;font-size:32px;':''}position:relative;
        ">
          <span style="font-size:${isHost?'30px':'20px'};">${seat.user.avatar}</span>
          ${isHost?`<div style="position:absolute;top:-6px;right:-4px;font-size:14px;">👑</div>`:''}
          <div class="seat-mic ${seat.isMuted?'muted':''}">${seat.isMuted?'🔇':'🎙️'}</div>
        </div>
        <div class="seat-name">${seat.user.name}</div>
        <div class="vip-badge ${seat.user.vip}" style="font-size:8px;">${seat.user.vip?.toUpperCase()}</div>
      </div>`;
  },

  renderChatTab() {
    return `<div style="padding:8px 12px;display:flex;flex-direction:column;gap:5px;">
      ${AppData.messages.map(m => m.type==='system' ? `
        <div style="text-align:center;">
          <span style="font-size:10px;color:var(--gold-bright);background:rgba(212,160,23,0.1);padding:2px 10px;border-radius:999px;">⭐ ${m.msg}</span>
        </div>` : `
        <div style="display:flex;gap:7px;align-items:flex-start;">
          <span style="font-size:17px;">${m.avatar}</span>
          <div>
            <span style="font-size:11px;font-weight:700;color:var(--purple-light);">${m.user}</span>
            ${m.vip?`<span class="vip-badge ${m.vip}" style="font-size:8px;margin-right:3px;">${m.vip.toUpperCase()}</span>`:''}
            ${m.type==='gift'
              ? `<span style="color:var(--gold-bright);font-size:11px;"> أرسل ${m.gift} ${m.giftName}</span>`
              : `<div style="font-size:12px;color:var(--text-primary);margin-top:2px;">${m.msg}</div>`}
          </div>
        </div>`
      ).join('')}
    </div>`;
  },

  renderMembersTab() {
    return `<div style="padding:6px;display:flex;flex-direction:column;gap:3px;">
      ${AppData.roomSeats.filter(s=>s.user).map(s=>`
        <div style="display:flex;align-items:center;gap:9px;padding:5px 8px;border-radius:var(--r-md);">
          <span style="font-size:20px;">${s.user.avatar}</span>
          <div style="flex:1;"><div style="font-size:12px;font-weight:700;">${s.user.name}</div></div>
          <div class="vip-badge ${s.user.vip}" style="font-size:8px;">${s.user.vip?.toUpperCase()}</div>
          <span style="font-size:13px;">${s.isMuted?'🔇':'🎙️'}</span>
        </div>`).join('')}
    </div>`;
  },

  renderGiftsPanel() {
    return `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;padding:7px;">
      ${AppData.gifts.slice(0,8).map(g=>`
        <div class="gift-item" style="padding:10px 6px;" onclick="RoomScreen.quickSendGift('${g.id}')">
          <span style="font-size:24px;">${g.emoji}</span>
          <span style="font-size:9px;color:var(--text-secondary);">${g.name}</span>
          <span style="font-size:9px;color:var(--gold-bright);">🪙${g.price}</span>
        </div>`).join('')}
    </div>`;
  },

  // =============================================
  // DEMO METHODS — trigger animation system
  // =============================================

  demoGift(type) {
    const gifts = {
      normal: { emoji:'🌹', name:'وردة', price:10 },
      luxury: { emoji:'👑', name:'تاج', price:500 },
      royal:  { emoji:'🏰', name:'قصر', price:5000 },
    };
    const gift = gifts[type] || gifts.normal;
    const senders = ['نورة','خالد','ريم','طارق'];
    const sender = senders[Math.floor(Math.random()*senders.length)];
    AnimationEngine.sendGift(gift, sender, 'المضيف', 'anim-layer');
    this._appendChatMsg(sender, `أرسل ${gift.emoji} ${gift.name}`);
  },

  demoCombo() {
    const gift = { emoji:'💎', name:'ماس', price:100 };
    const senders = ['نورة','خالد'];
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const sender = senders[Math.floor(Math.random()*senders.length)];
        AnimationEngine.sendGift(gift, sender, 'المضيف', 'anim-layer');
      }, i * 280);
    }
  },

  demoEntrance(vipLevel) {
    const configs = {
      'vip-4': { name:'سعود الغامدي', avatar:'👨‍💼' },
      'vip-5': { name:'هند القحطاني', avatar:'👩‍💫' },
      'vip-6': { name:'طارق الأمير',  avatar:'🤴'  },
      'svip-1':{ name:'ريم المطيري',  avatar:'👸'  },
      'svip-2':{ name:'خالد العمري',  avatar:'👨‍🎤' },
      'svip-3':{ name:'أحمد الريس',   avatar:'🧑‍💼' },
      'svip-4':{ name:'فهد الأمير',   avatar:'🤴'  },
      'svip-5':{ name:'سارة المنصور', avatar:'👸'  },
      'svip-6':{ name:'ملك التاج',    avatar:'👑'  },
    };
    const user = { ...(configs[vipLevel] || configs['svip-3']), vip: vipLevel };
    AnimationEngine.showEntrance(user, 'anim-layer');
    this._appendChatMsg('النظام', `🌟 ${user.name} دخل بدخولية ${vipLevel.toUpperCase()}`);
  },

  demoHearts() {
    AnimationEngine.floatingHearts(document.getElementById('anim-layer'));
  },

  demoCoinRain() {
    AnimationEngine.coinRain(document.getElementById('anim-layer'), 25);
    App.showToast('🪙 مطر من العملات!', 'success');
  },

  // =============================================
  // INTERACTIVE ACTIONS
  // =============================================

  setTab(tab) {
    this.state.activeTab = tab;
    document.querySelectorAll('.tab-btn').forEach((b,i)=>b.classList.toggle('active',['chat','members','gifts'][i]===tab));
    const c = document.getElementById('room-tab-content');
    if(c) c.innerHTML = tab==='chat'?this.renderChatTab():tab==='members'?this.renderMembersTab():this.renderGiftsPanel();
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

  quickSendGift(giftId) {
    const gift = AppData.gifts.find(g=>g.id===giftId);
    AnimationEngine.sendGift(gift, AppData.currentUser.name, 'المضيف', 'anim-layer');
    if (gift.price >= 500) App.showToast(`✅ أرسلت ${gift.emoji} ${gift.name}`, 'success');
  },

  openGiftModal() {
    App.openModal(GiftModal.render(), ()=>{});
  },

  sendMessage() {
    const input = document.getElementById('chat-input');
    if (!input?.value.trim()) return;
    this._appendChatMsg(AppData.currentUser.name, input.value);
    input.value = '';
    App.showToast('✓', 'success');
  },

  _appendChatMsg(user, msg) {
    AppData.messages.push({
      id: 'm'+Date.now(), user, avatar:'👤', msg, time:'الآن', type:'normal', vip:''
    });
    if (this.state.activeTab === 'chat') {
      const c = document.getElementById('room-tab-content');
      if (c) { c.innerHTML = this.renderChatTab(); c.scrollTop = c.scrollHeight; }
    }
  },

  showRoomMenu() { App.showToast('قائمة الغرفة'); },
  requestSeat(id) { App.showToast(`طلب المقعد ${id}`); },
  showUserOptions(name) { App.showToast(`خيارات ${name}`); },

  // Auto-demo entrances while in room
  init(params={}) {
    if (this.autoEntranceTimer) clearTimeout(this.autoEntranceTimer);

    const queue = [
      { delay: 2000,  vip: 'vip-6',  name:'طارق الأمير', avatar:'🤴' },
      { delay: 6000,  vip: 'svip-2', name:'ريم المطيري', avatar:'👸' },
      { delay: 11000, vip: 'svip-5', name:'سارة النجمة', avatar:'👩‍🎤' },
      { delay: 18000, vip: 'svip-6', name:'ملك التاج',   avatar:'👑' },
    ];

    queue.forEach(({ delay, vip, name, avatar }) => {
      setTimeout(() => {
        const layer = document.getElementById('anim-layer');
        if (!layer) return;
        AnimationEngine.showEntrance({ name, avatar, vip }, 'anim-layer');
      }, delay);
    });

    // Auto gift demo after 4s
    setTimeout(() => {
      const layer = document.getElementById('anim-layer');
      if (!layer) return;
      AnimationEngine.sendGift({ emoji:'🌹', name:'وردة', price:10 }, 'نورة', 'المضيف', 'anim-layer');
    }, 4000);
  },

  destroy() {
    if (this.autoEntranceTimer) clearTimeout(this.autoEntranceTimer);
  },
};

// =============================================
// GIFT MODAL
// =============================================
const GiftModal = {
  selectedGift: null,

  render() {
    return `
      <div>
        <div class="modal-handle"></div>
        <h3 style="font-size:15px;font-weight:800;margin-bottom:14px;text-align:center;">🎁 إرسال هدية</h3>

        <!-- Category filter -->
        <div style="display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin-bottom:12px;padding-bottom:2px;">
          ${['الكل','عادية','خاصة','فاخرة','ملكية'].map((c,i)=>`
            <button class="badge ${i===0?'badge-svip':'badge-online'}" style="flex-shrink:0;padding:4px 12px;cursor:pointer;font-size:11px;">${c}</button>
          `).join('')}
        </div>

        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px;max-height:200px;overflow-y:auto;scrollbar-width:none;">
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
          <button class="btn btn-ghost btn-sm" onclick="App.closeModal();App.navigate('store')">شحن 💳</button>
        </div>

        <button class="btn btn-gold btn-full btn-lg" onclick="GiftModal.send()">
          إرسال الهدية 🎁
        </button>
      </div>
    `;
  },

  select(id) {
    this.selectedGift = id;
    document.querySelectorAll('.gift-item').forEach(el=>el.classList.remove('selected'));
    document.getElementById('gift-'+id)?.classList.add('selected');
  },

  send() {
    if (!this.selectedGift) { App.showToast('اختر هدية أولاً', 'error'); return; }
    const gift = AppData.gifts.find(g=>g.id===this.selectedGift);
    App.closeModal();
    AnimationEngine.sendGift(gift, AppData.currentUser.name, 'المضيف', 'anim-layer');
    if (gift.price >= 500) App.showToast(`✅ أرسلت ${gift.emoji} ${gift.name}`, 'success');
    this.selectedGift = null;
  },
};
