// =============================================
// SAWTAK - Advanced Animation Engine
// Gift Fly System + VIP Entrances + Confetti
// =============================================

const AnimationEngine = {
  giftQueue: [],
  isPlaying: false,
  comboCount: 0,
  comboTimer: null,
  activeEntrances: [],

  // =============================================
  // GIFT FLY SYSTEM
  // =============================================
  sendGift(gift, sender, recipient, containerId) {
    const container = document.getElementById(containerId || 'anim-layer');
    if (!container) return;

    this.comboCount++;
    if (this.comboTimer) clearTimeout(this.comboTimer);
    this.comboTimer = setTimeout(() => { this.comboCount = 0; }, 4000);

    this._spawnGiftFly(gift, sender, recipient, container);
    if (this.comboCount >= 3) this._showCombo(this.comboCount, container);
    if (gift.price >= 500) this._launchConfetti(container);
    if (gift.price >= 5000) this._showRoyalEffect(gift, sender, container);
  },

  _spawnGiftFly(gift, sender, recipient, container) {
    const el = document.createElement('div');
    el.style.cssText = `
      position:absolute; bottom:80px; left:${20 + Math.random()*60}%;
      z-index:500; pointer-events:none;
      display:flex; flex-direction:column; align-items:center; gap:4px;
      animation:gift-fly-up 2.5s cubic-bezier(0.25,0.46,0.45,0.94) both;
    `;
    el.innerHTML = `
      <div style="
        background:rgba(0,0,0,0.7); backdrop-filter:blur(12px);
        border:1px solid rgba(255,255,255,0.15); border-radius:999px;
        padding:5px 12px; display:flex; align-items:center; gap:6px;
        box-shadow:0 4px 20px rgba(0,0,0,0.4);
        animation:gift-card-appear 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
      ">
        <span style="font-size:11px;color:rgba(255,255,255,0.7);">${sender}</span>
        <span style="font-size:22px; animation:gift-emoji-spin 0.5s ease 0.3s both;">${gift.emoji}</span>
        <span style="font-size:11px;color:rgba(255,255,255,0.7);">→ ${recipient}</span>
      </div>
      <div style="
        font-size:10px; font-weight:700; color:var(--gold-bright);
        background:rgba(212,160,23,0.15); padding:2px 8px; border-radius:999px;
        border:1px solid rgba(212,160,23,0.3);
      ">🪙 ${gift.price}</div>
    `;
    container.appendChild(el);

    // Spawn trail particles
    if (gift.price >= 100) {
      for (let i = 0; i < 6; i++) {
        setTimeout(() => this._spawnTrailParticle(gift.emoji, container), i * 120);
      }
    }

    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.4s ease';
      setTimeout(() => el.remove(), 400);
    }, 2400);
  },

  _spawnTrailParticle(emoji, container) {
    const p = document.createElement('div');
    const x = 15 + Math.random() * 70;
    const size = 10 + Math.random() * 14;
    p.style.cssText = `
      position:absolute; bottom:${80 + Math.random()*60}px;
      left:${x}%; font-size:${size}px; pointer-events:none;
      opacity:0.7; z-index:490;
      animation:trail-particle ${0.8+Math.random()*0.6}s ease both;
    `;
    p.textContent = emoji;
    container.appendChild(p);
    setTimeout(() => p.remove(), 1400);
  },

  _showCombo(count, container) {
    const existing = container.querySelector('.combo-counter');
    if (existing) existing.remove();

    const el = document.createElement('div');
    el.className = 'combo-counter';
    const tier = count >= 20 ? 'legendary' : count >= 10 ? 'epic' : count >= 5 ? 'great' : 'normal';
    const colors = { legendary:'#FFD700', epic:'#E040FB', great:'#FF6D00', normal:'#00E676' };
    const labels = { legendary:'🌟 أسطوري', epic:'💥 ملحمي', great:'🔥 رائع', normal:'✨ رائع' };

    el.style.cssText = `
      position:absolute; top:30%; left:50%; transform:translateX(-50%);
      z-index:600; pointer-events:none; text-align:center;
      animation:combo-appear 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
    `;
    el.innerHTML = `
      <div style="
        font-size:42px; font-weight:900; color:${colors[tier]};
        text-shadow:0 0 30px ${colors[tier]}, 0 0 60px ${colors[tier]};
        animation:combo-pulse 0.5s ease infinite alternate;
        font-family:'Montserrat',sans-serif; letter-spacing:-2px;
      ">x${count}</div>
      <div style="
        font-size:14px; font-weight:800; color:white;
        background:${colors[tier]}30; border:1px solid ${colors[tier]}60;
        padding:3px 14px; border-radius:999px; margin-top:4px;
      ">${labels[tier]}</div>
    `;
    container.appendChild(el);
    setTimeout(() => { el.style.animation='combo-vanish 0.3s ease both'; setTimeout(()=>el.remove(),300); }, 2500);
  },

  _launchConfetti(container) {
    const colors = ['#FFD700','#9D4EDD','#FF4B4B','#00E676','#2979FF','#FF6D00','#E040FB','#00BCD4'];
    const shapes = ['●','■','▲','★','♦'];
    for (let i = 0; i < 40; i++) {
      setTimeout(() => {
        const p = document.createElement('div');
        const x = Math.random() * 100;
        const color = colors[Math.floor(Math.random()*colors.length)];
        const shape = shapes[Math.floor(Math.random()*shapes.length)];
        const size = 8 + Math.random() * 10;
        const dur = 1.5 + Math.random() * 1.5;
        const delay = Math.random() * 0.5;
        p.style.cssText = `
          position:absolute; top:-20px; left:${x}%;
          font-size:${size}px; color:${color}; pointer-events:none; z-index:700;
          animation:confetti-drop ${dur}s ease ${delay}s both;
          text-shadow:0 0 6px ${color};
          transform:rotate(${Math.random()*360}deg);
        `;
        p.textContent = shape;
        container.appendChild(p);
        setTimeout(() => p.remove(), (dur + delay) * 1000 + 100);
      }, Math.random() * 300);
    }
  },

  _showRoyalEffect(gift, sender, container) {
    const el = document.createElement('div');
    el.style.cssText = `
      position:absolute; inset:0; z-index:800; pointer-events:none;
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      animation:royal-entrance 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
    `;
    el.innerHTML = `
      <!-- Full screen flash -->
      <div style="
        position:absolute; inset:0;
        background:radial-gradient(ellipse at center, rgba(212,160,23,0.25) 0%, transparent 70%);
        animation:royal-flash 2s ease both;
      "></div>

      <!-- Border beams -->
      <div style="position:absolute;inset:0;border:3px solid transparent;border-radius:0;
        background:linear-gradient(var(--bg-primary),var(--bg-primary)) padding-box,
                   linear-gradient(135deg,#FFD700,#7B2FBE,#FFD700) border-box;
        animation:royal-border 0.4s ease both;"></div>

      <!-- Gift showcase -->
      <div style="
        background:rgba(0,0,0,0.85); backdrop-filter:blur(20px);
        border:2px solid rgba(212,160,23,0.5); border-radius:24px;
        padding:28px 36px; text-align:center; position:relative;
        box-shadow:0 0 80px rgba(212,160,23,0.4), inset 0 0 30px rgba(212,160,23,0.08);
        animation:royal-card 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both;
      ">
        <!-- Corner ornaments -->
        <div style="position:absolute;top:8px;right:10px;font-size:14px;color:var(--gold-bright);opacity:0.6;">✦</div>
        <div style="position:absolute;top:8px;left:10px;font-size:14px;color:var(--gold-bright);opacity:0.6;">✦</div>
        <div style="position:absolute;bottom:8px;right:10px;font-size:14px;color:var(--gold-bright);opacity:0.6;">✦</div>
        <div style="position:absolute;bottom:8px;left:10px;font-size:14px;color:var(--gold-bright);opacity:0.6;">✦</div>

        <div style="font-size:11px;font-weight:700;color:rgba(212,160,23,0.8);letter-spacing:2px;margin-bottom:10px;">هديـة ملكيـة</div>
        <div style="font-size:72px;margin-bottom:8px;animation:royal-emoji 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s both;">${gift.emoji}</div>
        <div style="font-size:18px;font-weight:900;color:white;margin-bottom:4px;">${gift.name || gift.emoji}</div>
        <div style="font-size:13px;color:var(--gold-bright);margin-bottom:12px;">من: ${sender}</div>
        <div style="
          background:linear-gradient(135deg,#4A0D8F,#D4A017);
          border-radius:999px; padding:5px 18px; display:inline-flex; align-items:center; gap:6px;
          font-size:13px; font-weight:700;
        ">🪙 ${gift.price.toLocaleString()}</div>
      </div>

      <!-- Stars burst -->
      <div id="star-burst-${Date.now()}" style="position:absolute;inset:0;pointer-events:none;"></div>
    `;

    // Spawn star burst
    container.appendChild(el);
    const burstId = el.querySelector('[id^=star-burst]')?.id;
    if (burstId) this._starBurst(document.getElementById(burstId));

    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.5s ease';
      setTimeout(() => el.remove(), 500);
    }, 3500);
  },

  _starBurst(container) {
    if (!container) return;
    const count = 16;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 360;
      const p = document.createElement('div');
      p.style.cssText = `
        position:absolute; top:50%; left:50%;
        font-size:${12+Math.random()*12}px;
        color:${Math.random()>0.5?'#FFD700':'#9D4EDD'};
        pointer-events:none; transform-origin:0 0;
        animation:star-burst-ray 1.2s cubic-bezier(0.25,0.46,0.45,0.94) both;
        --angle:${angle}deg; --dist:${80+Math.random()*80}px;
      `;
      p.textContent = ['✦','★','✧','✶','✸'][Math.floor(Math.random()*5)];
      container.appendChild(p);
      setTimeout(() => p.remove(), 1300);
    }
  },

  // =============================================
  // VIP ENTRANCE SYSTEM
  // =============================================
  showEntrance(user, containerId) {
    const container = document.getElementById(containerId || 'anim-layer');
    if (!container) return;

    const vipTier = this._getVipTier(user.vip);

    if (vipTier === 'svip-high') {
      this._entranceSVIPHigh(user, container);
    } else if (vipTier === 'svip-mid') {
      this._entranceSVIPMid(user, container);
    } else if (vipTier === 'svip-low') {
      this._entranceSVIPLow(user, container);
    } else if (vipTier === 'vip-high') {
      this._entranceVIPHigh(user, container);
    } else {
      this._entranceBasic(user, container);
    }
  },

  _getVipTier(vip) {
    if (!vip) return 'basic';
    if (vip.includes('svip-6') || vip.includes('svip-5') || vip.includes('svip-4')) return 'svip-high';
    if (vip.includes('svip-3') || vip.includes('svip-2')) return 'svip-mid';
    if (vip.includes('svip-1')) return 'svip-low';
    if (vip.includes('vip-6') || vip.includes('vip-5') || vip.includes('vip-4')) return 'vip-high';
    return 'vip-basic';
  },

  _entranceSVIPHigh(user, container) {
    // Full screen cinematic entrance for SVIP 4-6
    const el = document.createElement('div');
    el.style.cssText = `
      position:absolute; inset:0; z-index:900; pointer-events:none; overflow:hidden;
    `;
    const vipColors = {
      'svip-6': { primary:'#FFD700', secondary:'#D4A017', label:'ملك التاج 👑', bg:'linear-gradient(135deg,#2d1b00,#8B6914,#FFD700,#8B6914,#2d1b00)' },
      'svip-5': { primary:'#E040FB', secondary:'#7B2FBE', label:'نجم المجرة 🌌', bg:'linear-gradient(135deg,#1a0040,#4A0D8F,#E040FB)' },
      'svip-4': { primary:'#00BCD4', secondary:'#0097A7', label:'إمبراطور 👁️', bg:'linear-gradient(135deg,#001a1f,#00838f,#00BCD4)' },
    };
    const config = vipColors[user.vip] || vipColors['svip-5'];

    el.innerHTML = `
      <!-- Screen overlay -->
      <div style="
        position:absolute; inset:0;
        background:${config.bg}; opacity:0;
        animation:svip-overlay 3s ease both;
      "></div>

      <!-- Light rays from top -->
      <div style="position:absolute;top:0;left:0;right:0;height:60%;overflow:hidden;pointer-events:none;">
        ${Array.from({length:12},(_,i)=>`
          <div style="
            position:absolute; top:0; left:${(i/12)*100}%;
            width:${1+Math.random()*2}px; height:100%;
            background:linear-gradient(${config.primary}80,transparent);
            transform:rotate(${-20+i*3}deg);
            transform-origin:top center;
            animation:light-ray 1s ease ${i*0.06}s both;
            opacity:0;
          "></div>
        `).join('')}
      </div>

      <!-- Main entrance card -->
      <div style="
        position:absolute; bottom:20%; left:50%; transform:translateX(-50%);
        width:88%; text-align:center;
      ">
        <!-- Entrance banner -->
        <div style="
          background:${config.bg}; border-radius:16px;
          padding:20px; border:2px solid ${config.primary}80;
          box-shadow:0 0 60px ${config.primary}60, 0 0 120px ${config.primary}30;
          animation:svip-banner-drop 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.4s both;
          position:relative; overflow:hidden;
        ">
          <!-- Shimmer sweep -->
          <div style="
            position:absolute; inset:0;
            background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.2) 50%,transparent 100%);
            background-size:200% 100%;
            animation:shimmer-sweep 1.5s ease 0.6s both;
          "></div>

          <!-- VIP Badge row -->
          <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:10px;">
            <div style="height:1px;flex:1;background:linear-gradient(to left,${config.primary},transparent);"></div>
            <div style="
              background:${config.primary}20; border:1px solid ${config.primary};
              border-radius:999px; padding:3px 12px;
              font-size:11px; font-weight:800; color:${config.primary}; letter-spacing:1px;
            ">${user.vip?.toUpperCase()}</div>
            <div style="height:1px;flex:1;background:linear-gradient(to right,${config.primary},transparent);"></div>
          </div>

          <!-- User Avatar -->
          <div style="
            width:64px; height:64px; border-radius:50%; margin:0 auto 10px;
            background:rgba(255,255,255,0.15); border:3px solid ${config.primary};
            display:flex; align-items:center; justify-content:center; font-size:30px;
            box-shadow:0 0 24px ${config.primary}80;
            animation:avatar-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.8s both; opacity:0;
          ">${user.avatar}</div>

          <div style="font-size:16px;font-weight:900;color:white;margin-bottom:4px;animation:text-appear 0.4s ease 1s both;opacity:0;">${user.name}</div>
          <div style="font-size:12px;color:${config.primary};font-weight:700;animation:text-appear 0.4s ease 1.1s both;opacity:0;">${config.label}</div>
        </div>
      </div>

      <!-- Particle explosion -->
      <div id="svip-particles-${Date.now()}" style="position:absolute;inset:0;pointer-events:none;"></div>
    `;

    container.appendChild(el);

    // Trigger particles
    setTimeout(() => {
      this._launchConfetti(el);
      this._starBurst(el.querySelector('[id^=svip-particles]'));
    }, 500);

    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.6s ease';
      setTimeout(() => el.remove(), 600);
    }, 4000);
  },

  _entranceSVIPMid(user, container) {
    const el = document.createElement('div');
    el.style.cssText = `position:absolute;inset:0;z-index:850;pointer-events:none;overflow:hidden;`;
    el.innerHTML = `
      <!-- Diagonal sweep -->
      <div style="
        position:absolute; inset:0;
        background:linear-gradient(135deg,transparent 40%,rgba(123,47,190,0.3) 50%,transparent 60%);
        animation:diagonal-sweep 0.8s ease both;
      "></div>

      <!-- Entrance banner -->
      <div style="
        position:absolute; top:25%; left:0; right:0;
        display:flex; align-items:center; gap:0;
        animation:banner-slide-in 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
      ">
        <div style="
          background:linear-gradient(135deg,#1a0040,#7B2FBE,#9D4EDD);
          padding:14px 20px; flex:1; display:flex; align-items:center; gap:10px;
          border-top:1px solid rgba(157,78,221,0.5); border-bottom:1px solid rgba(157,78,221,0.5);
          box-shadow:0 0 40px rgba(123,47,190,0.5);
        ">
          <span style="font-size:28px;">${user.avatar}</span>
          <div>
            <div style="font-size:14px;font-weight:800;color:white;">${user.name}</div>
            <div style="font-size:11px;color:var(--gold-bright);">دخل الغرفة ✨ ${user.vip?.toUpperCase()}</div>
          </div>
          <div style="margin-right:auto;">
            <div class="vip-badge ${user.vip}" style="font-size:11px;">${user.vip?.toUpperCase()}</div>
          </div>
        </div>
      </div>
    `;
    container.appendChild(el);
    setTimeout(() => {
      this._launchConfetti(el);
    }, 300);
    setTimeout(() => {
      el.style.opacity='0'; el.style.transition='opacity 0.4s ease';
      setTimeout(()=>el.remove(),400);
    }, 3000);
  },

  _entranceSVIPLow(user, container) {
    const el = document.createElement('div');
    el.style.cssText = `position:absolute;top:10%;left:0;right:0;z-index:800;pointer-events:none;`;
    el.innerHTML = `
      <div style="
        background:linear-gradient(135deg,#1a0040,#4A0D8F);
        padding:12px 20px; margin:0 16px; border-radius:12px;
        border:1px solid rgba(123,47,190,0.6);
        box-shadow:0 8px 32px rgba(123,47,190,0.4);
        display:flex; align-items:center; gap:10px;
        animation:entrance-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
      ">
        <span style="font-size:24px;">${user.avatar}</span>
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:800;color:white;">${user.name}</div>
          <div style="font-size:11px;color:var(--purple-light);">دخل بدخولية SVIP 🌙</div>
        </div>
        <div class="vip-badge ${user.vip}" style="font-size:10px;">${user.vip?.toUpperCase()}</div>
      </div>
    `;
    container.appendChild(el);
    setTimeout(()=>{el.style.opacity='0';el.style.transition='opacity 0.3s';setTimeout(()=>el.remove(),300);}, 2500);
  },

  _entranceVIPHigh(user, container) {
    const el = document.createElement('div');
    el.style.cssText = `position:absolute;top:8%;left:0;right:0;z-index:750;pointer-events:none;`;
    el.innerHTML = `
      <div style="
        background:linear-gradient(135deg,rgba(212,160,23,0.2),rgba(20,20,30,0.9));
        padding:10px 18px; margin:0 16px; border-radius:10px;
        border:1px solid rgba(212,160,23,0.4);
        box-shadow:0 4px 20px rgba(212,160,23,0.25);
        display:flex; align-items:center; gap:10px;
        animation:entrance-slide 0.4s ease both;
      ">
        <span style="font-size:22px;">${user.avatar}</span>
        <div style="flex:1;">
          <div style="font-size:12px;font-weight:700;color:white;">${user.name}</div>
          <div style="font-size:10px;color:var(--gold-bright);">دخل بدخولية VIP 🔥</div>
        </div>
        <div class="vip-badge ${user.vip}" style="font-size:9px;">${user.vip?.toUpperCase()}</div>
      </div>
    `;
    container.appendChild(el);
    setTimeout(()=>{el.style.opacity='0';el.style.transition='opacity 0.3s';setTimeout(()=>el.remove(),300);}, 2000);
  },

  _entranceBasic(user, container) {
    const el = document.createElement('div');
    el.style.cssText = `position:absolute;top:6%;left:0;right:0;z-index:700;pointer-events:none;`;
    el.innerHTML = `
      <div style="
        background:rgba(0,0,0,0.7); backdrop-filter:blur(8px);
        padding:8px 16px; margin:0 24px; border-radius:999px;
        border:1px solid rgba(255,255,255,0.1);
        display:flex; align-items:center; gap:8px; width:fit-content; margin:0 auto;
        animation:entrance-fade 0.3s ease both;
      ">
        <span style="font-size:16px;">${user.avatar}</span>
        <span style="font-size:12px;color:rgba(255,255,255,0.8);">${user.name} انضم للغرفة</span>
      </div>
    `;
    container.appendChild(el);
    setTimeout(()=>{el.style.opacity='0';el.style.transition='opacity 0.3s';setTimeout(()=>el.remove(),300);}, 1800);
  },

  // =============================================
  // FLOATING HEARTS (Love Mode)
  // =============================================
  floatingHearts(container) {
    const hearts = ['❤️','💜','💛','💙','💕','🧡','💞'];
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        const h = document.createElement('div');
        h.style.cssText = `
          position:absolute; bottom:100px; left:${15+Math.random()*70}%;
          font-size:${16+Math.random()*16}px; pointer-events:none; z-index:600;
          animation:heart-float ${1.5+Math.random()*1.5}s ease ${Math.random()*0.5}s both;
        `;
        h.textContent = hearts[Math.floor(Math.random()*hearts.length)];
        container.appendChild(h);
        setTimeout(() => h.remove(), 3500);
      }, i * 120);
    }
  },

  // =============================================
  // COIN RAIN
  // =============================================
  coinRain(container, count=20) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const c = document.createElement('div');
        c.style.cssText = `
          position:absolute; top:-30px; left:${Math.random()*100}%;
          font-size:${14+Math.random()*10}px; pointer-events:none; z-index:600;
          animation:coin-fall ${1.5+Math.random()*1}s ease ${Math.random()*0.8}s both;
          filter:drop-shadow(0 0 4px #FFD700);
        `;
        c.textContent = '🪙';
        container.appendChild(c);
        setTimeout(() => c.remove(), 3000);
      }, i * 80);
    }
  },
};

// =============================================
// CSS ANIMATIONS (injected into <head>)
// =============================================
(function injectAnimationCSS() {
  const style = document.createElement('style');
  style.textContent = `
    /* Gift fly */
    @keyframes gift-fly-up {
      0%   { transform:translateY(0) scale(0.8); opacity:0; }
      10%  { opacity:1; transform:translateY(-10px) scale(1.1); }
      60%  { transform:translateY(-120px) scale(1); opacity:1; }
      100% { transform:translateY(-180px) scale(0.8); opacity:0; }
    }

    @keyframes gift-card-appear {
      from { transform:scale(0.5) rotate(-5deg); opacity:0; }
      to   { transform:scale(1) rotate(0deg); opacity:1; }
    }

    @keyframes gift-emoji-spin {
      from { transform:rotate(-20deg) scale(0.7); }
      to   { transform:rotate(0deg) scale(1); }
    }

    @keyframes trail-particle {
      0%   { transform:translateY(0) scale(1); opacity:0.8; }
      100% { transform:translateY(-80px) scale(0.3); opacity:0; }
    }

    /* Combo */
    @keyframes combo-appear {
      from { transform:translateX(-50%) scale(0.3) rotate(-10deg); opacity:0; }
      to   { transform:translateX(-50%) scale(1) rotate(0deg); opacity:1; }
    }
    @keyframes combo-pulse {
      from { transform:scale(1); }
      to   { transform:scale(1.08); }
    }
    @keyframes combo-vanish {
      from { opacity:1; transform:translateX(-50%) scale(1); }
      to   { opacity:0; transform:translateX(-50%) scale(1.3); }
    }

    /* Confetti */
    @keyframes confetti-drop {
      0%   { transform:translateY(-20px) rotate(0deg); opacity:1; }
      80%  { opacity:1; }
      100% { transform:translateY(700px) rotate(${Math.random()*720}deg); opacity:0; }
    }

    /* Royal effect */
    @keyframes royal-entrance {
      from { opacity:0; }
      to   { opacity:1; }
    }
    @keyframes royal-flash {
      0%   { opacity:0; }
      20%  { opacity:1; }
      100% { opacity:0; }
    }
    @keyframes royal-border {
      from { opacity:0; transform:scale(1.05); }
      to   { opacity:1; transform:scale(1); }
    }
    @keyframes royal-card {
      from { opacity:0; transform:translateY(30px) scale(0.85); }
      to   { opacity:1; transform:translateY(0) scale(1); }
    }
    @keyframes royal-emoji {
      0%   { transform:scale(0) rotate(-30deg); opacity:0; }
      70%  { transform:scale(1.2) rotate(5deg); }
      100% { transform:scale(1) rotate(0deg); opacity:1; }
    }
    @keyframes avatar-pop {
      from { opacity:0; transform:scale(0.5); }
      to   { opacity:1; transform:scale(1); }
    }
    @keyframes text-appear {
      from { opacity:0; transform:translateY(8px); }
      to   { opacity:1; transform:translateY(0); }
    }

    /* Star burst */
    @keyframes star-burst-ray {
      0%   { opacity:1; transform:translate(-50%,-50%) rotate(var(--angle)) translateX(0); }
      100% { opacity:0; transform:translate(-50%,-50%) rotate(var(--angle)) translateX(var(--dist)); }
    }

    /* SVIP overlay */
    @keyframes svip-overlay {
      0%,100% { opacity:0; }
      15%,85% { opacity:0.8; }
    }
    @keyframes light-ray {
      0%   { opacity:0; transform:scaleY(0); }
      50%  { opacity:0.6; transform:scaleY(1); }
      100% { opacity:0; transform:scaleY(1); }
    }
    @keyframes svip-banner-drop {
      from { opacity:0; transform:translateY(-40px) scale(0.9); }
      to   { opacity:1; transform:translateY(0) scale(1); }
    }
    @keyframes shimmer-sweep {
      from { background-position:-200% 0; }
      to   { background-position:300% 0; }
    }
    @keyframes diagonal-sweep {
      from { opacity:0; transform:translateX(-100%); }
      to   { opacity:1; transform:translateX(100%); }
    }
    @keyframes banner-slide-in {
      from { transform:translateX(-100%); opacity:0; }
      to   { transform:translateX(0); opacity:1; }
    }
    @keyframes entrance-pop {
      from { transform:scale(0.7) translateY(-20px); opacity:0; }
      to   { transform:scale(1) translateY(0); opacity:1; }
    }
    @keyframes entrance-slide {
      from { transform:translateX(80px); opacity:0; }
      to   { transform:translateX(0); opacity:1; }
    }
    @keyframes entrance-fade {
      from { opacity:0; transform:translateY(-10px); }
      to   { opacity:1; transform:translateY(0); }
    }

    /* Hearts */
    @keyframes heart-float {
      0%   { transform:translateY(0) scale(1) rotate(-10deg); opacity:1; }
      60%  { opacity:1; }
      100% { transform:translateY(-200px) scale(0.3) rotate(15deg); opacity:0; }
    }

    /* Coin rain */
    @keyframes coin-fall {
      0%   { transform:translateY(-30px) rotate(0deg); opacity:0; }
      10%  { opacity:1; }
      100% { transform:translateY(600px) rotate(720deg); opacity:0; }
    }
  `;
  document.head.appendChild(style);
})();
