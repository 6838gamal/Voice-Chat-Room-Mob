// =============================================
// STORE SCREEN
// =============================================
const StoreScreen = {
  state: { tab: 'coins' },

  render() {
    return `
      <div class="screen" style="padding-bottom:var(--space-xl);">
        <div class="screen-header" style="background:linear-gradient(135deg,rgba(212,160,23,0.3),rgba(8,8,15,0.9));backdrop-filter:blur(20px);border-bottom:1px solid var(--border-gold);">
          <div class="header-back" onclick="App.goBack()">‹</div>
          <div class="header-title">🏪 المتجر</div>
          <div style="display:flex;align-items:center;gap:6px;background:var(--glass-gold);border:1px solid var(--border-gold);border-radius:999px;padding:4px 10px;">
            <span style="font-size:13px;">🪙</span>
            <span style="font-size:12px;font-weight:700;color:var(--gold-bright);">${AppData.currentUser.coins.toLocaleString()}</span>
          </div>
        </div>

        <!-- Tabs -->
        <div style="padding:14px 18px 8px;">
          <div style="display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding-bottom:4px;">
            ${['coins','gifts','frames','entrances','memberships'].map((t,i)=>
              `<button class="tab-btn ${this.state.tab===t?'active':''}" style="flex-shrink:0;padding:8px 14px;" onclick="StoreScreen.setTab('${t}')">${['🪙 عملات','🎁 هدايا','🖼️ إطارات','✨ دخوليات','👑 عضويات'][i]}</button>`
            ).join('')}
          </div>
        </div>

        <div id="store-content" style="padding:0 18px;">
          ${this.renderContent()}
        </div>
      </div>
    `;
  },

  renderContent() {
    switch(this.state.tab) {
      case 'coins': return this.renderCoins();
      case 'gifts': return this.renderGifts();
      case 'frames': return this.renderItems(AppData.storeItems.frames);
      case 'entrances': return this.renderItems(AppData.storeItems.entrances);
      case 'memberships': return this.renderMemberships();
      default: return this.renderCoins();
    }
  },

  renderCoins() {
    return `
      <!-- Hero Banner -->
      <div style="
        background:linear-gradient(135deg,#4A0D8F,#D4A017);
        border-radius:var(--r-2xl);padding:20px;margin-bottom:16px;text-align:center;
        position:relative;overflow:hidden;
      ">
        <div style="font-size:52px;margin-bottom:8px;animation:float 3s ease-in-out infinite;">🪙</div>
        <div style="font-size:18px;font-weight:800;margin-bottom:4px;">احصل على عملات أكثر</div>
        <div style="font-size:12px;opacity:0.85;">أفضل الأسعار + بونص إضافي على كل شحن</div>
      </div>

      <!-- Coin Packages -->
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px;">
        ${AppData.coinPackages.map(pkg=>`
          <div style="
            display:flex;align-items:center;gap:14px;padding:14px 16px;
            background:var(--bg-card);border:1.5px solid ${pkg.popular?'var(--gold-primary)':'var(--border-subtle)'};
            border-radius:var(--r-xl);cursor:pointer;position:relative;
            transition:var(--transition-spring);
          " onclick="StoreScreen.purchase('${pkg.id}')"
            onmouseenter="this.style.borderColor='var(--border-gold)'"
            onmouseleave="this.style.borderColor='${pkg.popular?'var(--gold-primary)':'var(--border-subtle)'}'"
          >
            ${pkg.popular?`<div style="position:absolute;top:-10px;right:16px;background:var(--grad-gold);color:#0A0A0F;font-size:9px;font-weight:800;padding:2px 10px;border-radius:999px;">الأشهر ⭐</div>`:''}
            <div style="font-size:36px;">🪙</div>
            <div style="flex:1;">
              <div style="font-size:16px;font-weight:800;color:var(--gold-bright);">${pkg.coins.toLocaleString()}</div>
              ${pkg.bonus?`<div style="font-size:11px;color:var(--green);">+ ${pkg.bonus.toLocaleString()} بونص هدية 🎁</div>`:''}
            </div>
            <button class="btn ${pkg.popular?'btn-gold':'btn-outline-purple'}" style="padding:8px 16px;font-size:13px;" onclick="event.stopPropagation();StoreScreen.purchase('${pkg.id}')">
              ${pkg.price}
            </button>
          </div>
        `).join('')}
      </div>

      <!-- Payment Methods -->
      <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-xl);padding:16px;">
        <div style="font-size:13px;font-weight:700;margin-bottom:12px;color:var(--text-secondary);">طرق الدفع المتاحة</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          ${['💳 بطاقة ائتمانية','📱 Apple Pay','🟢 STC Pay','💰 Mada','🏦 تحويل بنكي'].map(m=>`
            <div style="
              padding:6px 12px;background:var(--bg-elevated);border:1px solid var(--border-subtle);
              border-radius:var(--r-lg);font-size:11px;font-weight:600;
            ">${m}</div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderGifts() {
    const categories = ['الكل','عادية','خاصة','فاخرة','ملكية'];
    return `
      <div style="display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin-bottom:14px;padding-bottom:4px;">
        ${categories.map((c,i)=>`
          <button class="badge ${i===0?'badge-svip':'badge-online'}" style="flex-shrink:0;padding:5px 12px;cursor:pointer;font-size:11px;" onclick="App.showToast('${c}')">
            ${c}
          </button>
        `).join('')}
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
        ${AppData.gifts.map(g=>`
          <div class="gift-item" style="padding:14px 8px;" onclick="StoreScreen.buyGift('${g.id}')">
            <span style="font-size:36px;">${g.emoji}</span>
            <div style="font-size:12px;font-weight:700;">${g.name}</div>
            <div style="font-size:10px;color:var(--text-secondary);">${g.category}</div>
            <div style="font-size:11px;color:var(--gold-bright);font-weight:700;">🪙 ${g.price}</div>
            <button class="btn btn-primary btn-sm" style="margin-top:4px;font-size:10px;" onclick="event.stopPropagation();StoreScreen.buyGift('${g.id}')">شراء</button>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderItems(items) {
    const rarityColor = {نادر:'var(--purple-light)',أسطوري:'var(--gold-bright)',خاص:'var(--blue)'};
    return `
      <div style="display:flex;flex-direction:column;gap:12px;">
        ${items.map(item=>`
          <div style="
            display:flex;align-items:center;gap:14px;padding:16px;
            background:var(--bg-card);border:1px solid var(--border-subtle);
            border-radius:var(--r-xl);cursor:pointer;transition:var(--transition-spring);
          " onclick="StoreScreen.purchase('${item.id}')"
            onmouseenter="this.style.borderColor='var(--border-purple)'"
            onmouseleave="this.style.borderColor='var(--border-subtle)'"
          >
            <div style="
              width:64px;height:64px;border-radius:var(--r-lg);flex-shrink:0;
              background:var(--glass-purple);border:2px solid var(--border-purple);
              display:flex;align-items:center;justify-content:center;font-size:32px;
            ">${item.emoji}</div>
            <div style="flex:1;">
              <div style="font-size:14px;font-weight:700;">${item.name}</div>
              <span style="font-size:10px;color:${rarityColor[item.rarity]||'var(--text-secondary)'};font-weight:700;">★ ${item.rarity}</span>
              <div style="font-size:12px;color:var(--gold-bright);font-weight:700;margin-top:4px;">🪙 ${item.price.toLocaleString()}</div>
            </div>
            <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();StoreScreen.purchase('${item.id}')">اشتر</button>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderMemberships() {
    return `
      <div style="display:flex;flex-direction:column;gap:14px;">
        ${AppData.storeItems.memberships.map(m=>`
          <div style="
            border-radius:var(--r-2xl); overflow:hidden;
            background:${m.id.includes('svip')?'linear-gradient(135deg,#1a0040,#7B2FBE)':'linear-gradient(135deg,#2d1b00,#8B6914)'};
            border:1px solid ${m.id.includes('svip')?'var(--purple-primary)':'var(--gold-primary)'};
            padding:20px; cursor:pointer; transition:var(--transition-spring);
            position:relative; overflow:hidden;
          " onclick="StoreScreen.purchase('${m.id}')">
            <div style="font-size:36px;margin-bottom:8px;">${m.emoji}</div>
            <div style="font-size:18px;font-weight:800;margin-bottom:4px;">${m.name}</div>
            <div style="font-size:12px;opacity:0.8;margin-bottom:12px;">مدة: ${m.duration}</div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div style="font-size:20px;font-weight:900;color:var(--gold-bright);">🪙 ${m.price.toLocaleString()}</div>
              <button class="btn ${m.id.includes('svip')?'btn-gold':'btn-primary'}" style="padding:8px 20px;">اشترك</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  setTab(tab) {
    this.state.tab = tab;
    document.querySelectorAll('.tab-btn').forEach((b,i) => {
      b.classList.toggle('active', ['coins','gifts','frames','entrances','memberships'][i] === tab);
    });
    const c = document.getElementById('store-content');
    if(c) c.innerHTML = this.renderContent();
  },

  purchase(id) { App.showToast('جاري معالجة الشراء... 💳'); },
  buyGift(id) {
    const g = AppData.gifts.find(x=>x.id===id);
    App.showToast(`تم شراء ${g.emoji} ${g.name} ✅`,'success');
  },

  init() {}
};
