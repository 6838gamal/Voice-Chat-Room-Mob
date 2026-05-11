// =============================================
// SPLASH SCREEN
// =============================================
const SplashScreen = {
  render() {
    return `
      <div class="screen splash-screen" style="
        display:flex; flex-direction:column; align-items:center; justify-content:center;
        height:100vh; overflow:hidden; position:relative;
        background: radial-gradient(ellipse at 30% 20%, rgba(123,47,190,0.5) 0%, transparent 50%),
                    radial-gradient(ellipse at 70% 80%, rgba(212,160,23,0.3) 0%, transparent 50%),
                    var(--bg-primary);
      ">
        <!-- Animated background particles -->
        <div class="splash-particles">
          ${Array.from({length: 20}, (_, i) => `
            <div class="particle" style="
              position:absolute;
              width:${2+Math.random()*4}px; height:${2+Math.random()*4}px;
              background:${Math.random()>0.5 ? 'var(--purple-light)' : 'var(--gold-bright)'};
              border-radius:50%;
              top:${Math.random()*100}%; left:${Math.random()*100}%;
              opacity:${0.2+Math.random()*0.5};
              animation: float ${3+Math.random()*4}s ease-in-out ${Math.random()*3}s infinite alternate;
            "></div>
          `).join('')}
        </div>

        <!-- Glow rings -->
        <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; pointer-events:none;">
          <div style="
            width:300px; height:300px; border-radius:50%;
            border:1px solid rgba(123,47,190,0.2);
            animation: glow-ring 3s ease-in-out infinite;
          "></div>
        </div>
        <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; pointer-events:none;">
          <div style="
            width:200px; height:200px; border-radius:50%;
            border:1px solid rgba(212,160,23,0.2);
            animation: glow-ring 3s ease-in-out 1s infinite;
          "></div>
        </div>

        <!-- Logo -->
        <div class="splash-logo" style="
          position:relative; z-index:10;
          display:flex; flex-direction:column; align-items:center; gap:16px;
          animation: entrance-flash 1.2s cubic-bezier(0.34,1.56,0.64,1) both;
        ">
          <!-- App icon -->
          <div style="
            width:110px; height:110px; border-radius:28px;
            background: linear-gradient(135deg, #4A0D8F 0%, #7B2FBE 40%, #D4A017 100%);
            display:flex; align-items:center; justify-content:center;
            font-size:52px;
            box-shadow: 0 0 60px rgba(123,47,190,0.6), 0 0 120px rgba(212,160,23,0.3);
            animation: glow-pulse 2.5s ease-in-out infinite;
          ">🎙️</div>

          <!-- App name -->
          <div style="text-align:center;">
            <div style="
              font-size:38px; font-weight:900; letter-spacing:-1px;
              background: linear-gradient(135deg, #B57BEE, #FFD700, #9D4EDD);
              -webkit-background-clip:text; -webkit-text-fill-color:transparent;
              background-clip:text;
            ">صوتك</div>
            <div style="font-size:14px; font-weight:600; color:var(--text-secondary); letter-spacing:4px; margin-top:4px;">SAWTAK</div>
          </div>

          <!-- Tagline -->
          <div style="
            font-size:13px; color:var(--text-secondary); font-weight:500;
            margin-top:4px; opacity:0.8;
          ">غرف صوتية | تواصل | مجتمع</div>
        </div>

        <!-- Loading bar -->
        <div style="
          position:absolute; bottom:60px; left:50%; transform:translateX(-50%);
          width:120px; text-align:center;
          animation: fade-in 0.5s ease 1.5s both;
        ">
          <div style="
            width:100%; height:2px; background:rgba(255,255,255,0.1);
            border-radius:999px; overflow:hidden; margin-bottom:12px;
          ">
            <div id="splash-progress" style="
              height:100%; width:0%;
              background:linear-gradient(90deg, var(--purple-primary), var(--gold-bright));
              border-radius:999px;
              transition:width 0.1s linear;
            "></div>
          </div>
          <div style="font-size:11px; color:var(--text-muted);">جاري التحميل...</div>
        </div>

        <!-- Version -->
        <div style="
          position:absolute; bottom:20px;
          font-size:10px; color:var(--text-muted);
        ">الإصدار 1.0.0</div>
      </div>

      <style>
        @keyframes glow-ring {
          0%, 100% { transform:scale(1); opacity:0.5; }
          50% { transform:scale(1.05); opacity:1; }
        }
      </style>
    `;
  },

  init() {
    let progress = 0;
    const bar = document.getElementById('splash-progress');
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        if (bar) bar.style.width = '100%';
        clearInterval(interval);
        setTimeout(() => App.navigate('login'), 400);
      } else {
        if (bar) bar.style.width = progress + '%';
      }
    }, 120);
  }
};
