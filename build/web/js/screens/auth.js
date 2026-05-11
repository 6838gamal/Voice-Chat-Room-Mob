// =============================================
// AUTH SCREENS - Login & Register
// =============================================
const AuthScreen = {
  state: { mode: 'login', otpSent: false, phone: '', countdown: 60, timer: null },

  render() {
    if (this.state.otpSent) return this.renderOTP();
    if (this.state.mode === 'register') return this.renderRegister();
    return this.renderLogin();
  },

  renderLogin() {
    return `
      <div class="screen" style="
        min-height:100vh; position:relative; overflow:hidden;
        background: radial-gradient(ellipse at top, rgba(123,47,190,0.4) 0%, transparent 55%),
                    var(--bg-primary);
      ">
        <!-- Top decoration -->
        <div style="
          position:absolute; top:-60px; left:-60px;
          width:240px; height:240px; border-radius:50%;
          background:radial-gradient(circle, rgba(123,47,190,0.3), transparent 70%);
          pointer-events:none;
        "></div>
        <div style="
          position:absolute; top:-40px; right:-40px;
          width:160px; height:160px; border-radius:50%;
          background:radial-gradient(circle, rgba(212,160,23,0.2), transparent 70%);
          pointer-events:none;
        "></div>

        <div style="padding:60px 28px 40px; min-height:100vh; display:flex; flex-direction:column;">
          <!-- Logo -->
          <div style="text-align:center; margin-bottom:40px; animation:screen-enter 0.4s ease both;">
            <div style="
              width:70px; height:70px; border-radius:18px; margin:0 auto 14px;
              background:linear-gradient(135deg,#4A0D8F,#7B2FBE,#D4A017);
              display:flex; align-items:center; justify-content:center;
              font-size:32px;
              box-shadow:0 0 40px rgba(123,47,190,0.5);
            ">🎙️</div>
            <div style="
              font-size:28px; font-weight:900;
              background:linear-gradient(135deg,#B57BEE,#FFD700);
              -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
            ">صوتك</div>
            <div style="font-size:12px; color:var(--text-secondary); margin-top:4px;">مرحباً بك مجدداً 👋</div>
          </div>

          <!-- Form -->
          <div style="flex:1; animation:screen-enter 0.4s ease 0.1s both;">
            <h2 style="font-size:22px; font-weight:800; margin-bottom:24px;">تسجيل الدخول</h2>

            <!-- Social Buttons -->
            <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:24px;">
              <button class="btn btn-ghost btn-full btn-lg" onclick="AuthScreen.socialLogin('google')" style="gap:12px; font-size:14px;">
                <span style="font-size:20px;">🔵</span>
                المتابعة مع Google
              </button>
              <button class="btn btn-ghost btn-full btn-lg" onclick="AuthScreen.socialLogin('apple')" style="gap:12px; font-size:14px;">
                <span style="font-size:20px;">🍎</span>
                المتابعة مع Apple
              </button>
              <button class="btn btn-ghost btn-full btn-lg" onclick="AuthScreen.socialLogin('facebook')" style="gap:12px; font-size:14px;">
                <span style="font-size:20px;">📘</span>
                المتابعة مع Facebook
              </button>
            </div>

            <!-- Divider -->
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:24px;">
              <div style="flex:1; height:1px; background:var(--border-subtle);"></div>
              <span style="font-size:12px; color:var(--text-muted);">أو عبر الهاتف</span>
              <div style="flex:1; height:1px; background:var(--border-subtle);"></div>
            </div>

            <!-- Phone input -->
            <div style="margin-bottom:16px;">
              <div style="
                display:flex; align-items:center;
                background:var(--bg-elevated); border:1.5px solid var(--border-default);
                border-radius:var(--r-lg); overflow:hidden; transition:var(--transition-base);
              " id="phone-wrap">
                <div style="
                  padding:14px 12px; border-left:1px solid var(--border-subtle);
                  color:var(--text-secondary); font-size:13px; font-weight:600; white-space:nowrap;
                  cursor:pointer;
                " onclick="AuthScreen.changeCountry()">🇸🇦 +966</div>
                <input type="tel" id="phone-input" placeholder="5xxxxxxxx"
                  style="
                    flex:1; background:none; border:none; outline:none;
                    padding:14px 12px; color:var(--text-primary);
                    font-family:inherit; font-size:15px; direction:ltr; text-align:right;
                  "
                  onkeyup="AuthScreen.onPhoneInput(this)"
                  onfocus="document.getElementById('phone-wrap').style.borderColor='var(--purple-primary)'"
                  onblur="document.getElementById('phone-wrap').style.borderColor='var(--border-default)'"
                >
              </div>
            </div>

            <button class="btn btn-primary btn-full btn-lg" id="send-otp-btn" onclick="AuthScreen.sendOTP()">
              إرسال رمز التحقق
            </button>

            <div style="text-align:center; margin-top:28px; font-size:13px; color:var(--text-secondary);">
              ليس لديك حساب؟
              <span style="color:var(--purple-light); font-weight:700; cursor:pointer;" onclick="AuthScreen.switchMode('register')">
                إنشاء حساب
              </span>
            </div>
          </div>

          <!-- Terms -->
          <div style="text-align:center; font-size:11px; color:var(--text-muted); margin-top:20px; line-height:1.6;">
            بالمتابعة، أنت توافق على<br>
            <span style="color:var(--purple-light);">شروط الخدمة</span> و
            <span style="color:var(--purple-light);">سياسة الخصوصية</span>
          </div>
        </div>
      </div>
    `;
  },

  renderRegister() {
    return `
      <div class="screen" style="
        min-height:100vh; position:relative; overflow:hidden;
        background: radial-gradient(ellipse at top, rgba(123,47,190,0.4) 0%, transparent 55%), var(--bg-primary);
      ">
        <div style="padding:60px 28px 40px; min-height:100vh; display:flex; flex-direction:column;">
          <div style="text-align:center; margin-bottom:32px;">
            <div style="font-size:28px; margin-bottom:8px;">✨</div>
            <h2 style="font-size:24px; font-weight:800;">إنشاء حساب جديد</h2>
            <p style="font-size:13px; color:var(--text-secondary); margin-top:6px;">انضم لمجتمع صوتك</p>
          </div>

          <div style="display:flex; flex-direction:column; gap:14px; flex:1;">
            <div class="input-group">
              <label class="input-label">الاسم الكامل</label>
              <div class="input-icon-wrap">
                <span class="input-icon">👤</span>
                <input type="text" class="input-field" placeholder="اسمك هنا" id="reg-name">
              </div>
            </div>
            <div class="input-group">
              <label class="input-label">اسم المستخدم</label>
              <div class="input-icon-wrap">
                <span class="input-icon">@</span>
                <input type="text" class="input-field" placeholder="username" id="reg-username" style="direction:ltr;text-align:right;">
              </div>
            </div>
            <div class="input-group">
              <label class="input-label">رقم الهاتف</label>
              <div style="
                display:flex; align-items:center;
                background:var(--bg-elevated); border:1.5px solid var(--border-default);
                border-radius:var(--r-lg); overflow:hidden;
              ">
                <div style="padding:14px 12px; border-left:1px solid var(--border-subtle); color:var(--text-secondary); font-size:13px; font-weight:600;">🇸🇦 +966</div>
                <input type="tel" placeholder="5xxxxxxxx" style="flex:1;background:none;border:none;outline:none;padding:14px 12px;color:var(--text-primary);font-family:inherit;font-size:15px;direction:ltr;text-align:right;" id="reg-phone">
              </div>
            </div>
            <div class="input-group">
              <label class="input-label">الجنس</label>
              <div style="display:flex; gap:10px;">
                <button class="btn btn-ghost" style="flex:1; gap:8px;" id="gender-male" onclick="AuthScreen.selectGender('male')">👨 ذكر</button>
                <button class="btn btn-ghost" style="flex:1; gap:8px;" id="gender-female" onclick="AuthScreen.selectGender('female')">👩 أنثى</button>
              </div>
            </div>
            <div class="input-group">
              <label class="input-label">الدولة</label>
              <select class="input-field">
                <option value="sa">🇸🇦 المملكة العربية السعودية</option>
                <option value="ae">🇦🇪 الإمارات العربية المتحدة</option>
                <option value="kw">🇰🇼 الكويت</option>
                <option value="qa">🇶🇦 قطر</option>
                <option value="bh">🇧🇭 البحرين</option>
                <option value="om">🇴🇲 عُمان</option>
              </select>
            </div>

            <button class="btn btn-primary btn-full btn-lg" onclick="AuthScreen.register()" style="margin-top:8px;">
              إنشاء الحساب
            </button>

            <div style="text-align:center; font-size:13px; color:var(--text-secondary);">
              لديك حساب بالفعل؟
              <span style="color:var(--purple-light); font-weight:700; cursor:pointer;" onclick="AuthScreen.switchMode('login')">تسجيل الدخول</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderOTP() {
    return `
      <div class="screen" style="
        min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center;
        padding:40px 28px;
        background: radial-gradient(ellipse at top, rgba(123,47,190,0.4) 0%, transparent 55%), var(--bg-primary);
      ">
        <div style="text-align:center; margin-bottom:40px; animation:screen-enter 0.4s ease both;">
          <div style="
            width:80px; height:80px; border-radius:50%; margin:0 auto 20px;
            background:var(--glass-purple); border:2px solid var(--border-purple);
            display:flex; align-items:center; justify-content:center; font-size:36px;
          ">📱</div>
          <h2 style="font-size:22px; font-weight:800; margin-bottom:8px;">التحقق من الهاتف</h2>
          <p style="font-size:13px; color:var(--text-secondary); line-height:1.6;">
            أرسلنا رمز التحقق إلى<br>
            <span style="color:var(--text-primary); font-weight:700; direction:ltr; display:inline-block;">+966 ${this.state.phone}</span>
          </p>
        </div>

        <!-- OTP Inputs -->
        <div style="display:flex; gap:10px; margin-bottom:32px; direction:ltr;" id="otp-container">
          ${[1,2,3,4,5,6].map(i => `
            <input type="number" maxlength="1" class="otp-input" id="otp-${i}"
              style="
                width:48px; height:56px; text-align:center;
                background:var(--bg-elevated); border:2px solid var(--border-default);
                border-radius:var(--r-lg); color:var(--text-primary);
                font-size:22px; font-weight:700; font-family:inherit; outline:none;
                transition:var(--transition-base);
              "
              oninput="AuthScreen.onOTPInput(this, ${i})"
              onfocus="this.style.borderColor='var(--purple-primary)'; this.style.boxShadow='0 0 0 3px rgba(123,47,190,0.2)'"
              onblur="this.style.borderColor='var(--border-default)'; this.style.boxShadow='none'"
            >
          `).join('')}
        </div>

        <button class="btn btn-primary btn-full btn-lg" onclick="AuthScreen.verifyOTP()" style="margin-bottom:20px;">
          تأكيد الرمز
        </button>

        <div style="font-size:13px; color:var(--text-secondary); text-align:center;">
          لم تستلم الرمز؟
          <span id="resend-btn" style="color:var(--purple-light); font-weight:700; cursor:pointer;" onclick="AuthScreen.resendOTP()">
            إعادة الإرسال (<span id="countdown">${this.state.countdown}</span>)
          </span>
        </div>

        <button onclick="AuthScreen.backFromOTP()" style="
          margin-top:20px; background:none; border:none; color:var(--text-secondary);
          font-family:inherit; font-size:13px; cursor:pointer;
        ">← تغيير رقم الهاتف</button>
      </div>
    `;
  },

  init() {
    if (this.state.otpSent && this.state.countdown > 0) {
      this.startCountdown();
    }
  },

  startCountdown() {
    if (this.state.timer) clearInterval(this.state.timer);
    this.state.timer = setInterval(() => {
      this.state.countdown--;
      const el = document.getElementById('countdown');
      if (el) el.textContent = this.state.countdown;
      if (this.state.countdown <= 0) {
        clearInterval(this.state.timer);
        const resend = document.getElementById('resend-btn');
        if (resend) resend.textContent = 'إعادة الإرسال';
      }
    }, 1000);
  },

  onPhoneInput(input) {
    const val = input.value.replace(/\D/g,'');
    input.value = val;
  },

  onOTPInput(input, index) {
    const val = input.value.slice(-1);
    input.value = val;
    input.style.borderColor = val ? 'var(--purple-primary)' : 'var(--border-default)';
    if (val && index < 6) {
      document.getElementById('otp-' + (index+1))?.focus();
    }
  },

  socialLogin(provider) {
    App.showToast(`جاري الدخول عبر ${provider}...`);
    setTimeout(() => App.navigate('home'), 1000);
  },

  sendOTP() {
    const phone = document.getElementById('phone-input')?.value;
    if (!phone || phone.length < 9) {
      App.showToast('يرجى إدخال رقم هاتف صحيح', 'error');
      return;
    }
    this.state.phone = phone;
    this.state.otpSent = true;
    this.state.countdown = 60;
    App.renderScreen('login');
    setTimeout(() => this.startCountdown(), 100);
  },

  verifyOTP() {
    const otp = [1,2,3,4,5,6].map(i => document.getElementById('otp-'+i)?.value || '').join('');
    if (otp.length < 6) { App.showToast('أدخل الرمز كاملاً', 'error'); return; }
    App.showToast('جاري التحقق...', 'success');
    setTimeout(() => App.navigate('home'), 800);
  },

  resendOTP() {
    if (this.state.countdown > 0) return;
    this.state.countdown = 60;
    this.startCountdown();
    App.showToast('تم إعادة إرسال الرمز', 'success');
  },

  backFromOTP() {
    this.state.otpSent = false;
    if (this.state.timer) clearInterval(this.state.timer);
    App.renderScreen('login');
  },

  switchMode(mode) {
    this.state.mode = mode;
    this.state.otpSent = false;
    App.renderScreen('login');
  },

  selectGender(gender) {
    document.getElementById('gender-male').className = `btn ${gender==='male'?'btn-primary':'btn-ghost'}`;
    document.getElementById('gender-female').className = `btn ${gender==='female'?'btn-primary':'btn-ghost'}`;
  },

  register() {
    const name = document.getElementById('reg-name')?.value;
    if (!name) { App.showToast('أدخل اسمك', 'error'); return; }
    App.showToast('جاري إنشاء حسابك...', 'success');
    setTimeout(() => App.navigate('home'), 1000);
  },

  changeCountry() {
    App.showToast('اختيار الدولة قريباً');
  },
};
