import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});
  @override State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> with SingleTickerProviderStateMixin {
  late TabController _tabs;
  final _phoneCtrl = TextEditingController();
  final _nameCtrl = TextEditingController();
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    _tabs = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabs.dispose(); _phoneCtrl.dispose(); _nameCtrl.dispose();
    super.dispose();
  }

  void _login() {
    setState(() => _loading = true);
    Future.delayed(const Duration(milliseconds: 1200), () {
      if (mounted) Navigator.pushReplacementNamed(context, '/home');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(children: [
        Container(
          decoration: const BoxDecoration(
            gradient: RadialGradient(
              center: Alignment(0, -0.5),
              radius: 0.8,
              colors: [Color(0xFF1A0040), AppColors.bgPrimary],
            ),
          ),
        ),
        SafeArea(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(children: [
              const SizedBox(height: 32),

              // Logo
              Container(
                width: 80, height: 80,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(22),
                  gradient: AppGradients.purpleGold,
                  boxShadow: [BoxShadow(color: AppColors.purplePrimary.withOpacity(0.5), blurRadius: 24)],
                ),
                child: const Icon(Icons.mic, size: 40, color: Colors.white),
              ),
              const SizedBox(height: 16),
              const Text('صوتك', style: TextStyle(fontSize: 32, fontWeight: FontWeight.w900)),
              const Text('انضم إلى مجتمع الأصوات', style: TextStyle(color: AppColors.textSecondary, fontSize: 13)),
              const SizedBox(height: 32),

              // Tabs
              Container(
                decoration: BoxDecoration(
                  color: AppColors.bgElevated,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: AppColors.borderDefault),
                ),
                child: TabBar(
                  controller: _tabs,
                  indicator: BoxDecoration(
                    borderRadius: BorderRadius.circular(12),
                    gradient: AppGradients.purpleGold,
                  ),
                  labelColor: Colors.white,
                  unselectedLabelColor: AppColors.textSecondary,
                  labelStyle: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14),
                  tabs: const [Tab(text: 'تسجيل الدخول'), Tab(text: 'إنشاء حساب')],
                ),
              ),
              const SizedBox(height: 24),

              SizedBox(
                height: 340,
                child: TabBarView(controller: _tabs, children: [
                  // Login tab
                  _buildForm(isLogin: true),
                  // Register tab
                  _buildForm(isLogin: false),
                ]),
              ),

              const SizedBox(height: 20),

              // Social login
              const Row(children: [
                Expanded(child: Divider(color: AppColors.borderDefault)),
                Padding(padding: EdgeInsets.symmetric(horizontal: 12),
                  child: Text('أو', style: TextStyle(color: AppColors.textMuted, fontSize: 12))),
                Expanded(child: Divider(color: AppColors.borderDefault)),
              ]),
              const SizedBox(height: 16),
              Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                _socialBtn('Google', '🇬', const Color(0xFF4285F4)),
                const SizedBox(width: 12),
                _socialBtn('Apple', '', const Color(0xFF333333)),
                const SizedBox(width: 12),
                _socialBtn('Facebook', 'f', const Color(0xFF1877F2)),
              ]),
            ]),
          ),
        ),
      ]),
    );
  }

  Widget _buildForm({required bool isLogin}) {
    return Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
      if (!isLogin) ...[
        TextField(
          controller: _nameCtrl,
          decoration: const InputDecoration(hintText: 'الاسم الكامل', prefixIcon: Icon(Icons.person_outline, color: AppColors.purpleLight)),
          style: const TextStyle(color: AppColors.textPrimary),
        ),
        const SizedBox(height: 14),
      ],
      TextField(
        controller: _phoneCtrl,
        keyboardType: TextInputType.phone,
        decoration: InputDecoration(
          hintText: isLogin ? 'رقم الجوال' : 'رقم الجوال للتحقق',
          prefixIcon: const Icon(Icons.phone_outlined, color: AppColors.purpleLight),
          suffixIcon: isLogin ? null : Container(
            margin: const EdgeInsets.all(8),
            padding: const EdgeInsets.symmetric(horizontal: 8),
            decoration: BoxDecoration(
              color: AppColors.purplePrimary,
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Text('إرسال', style: TextStyle(fontSize: 11, color: Colors.white)),
          ),
        ),
        style: const TextStyle(color: AppColors.textPrimary),
      ),
      const SizedBox(height: 14),
      TextField(
        obscureText: true,
        decoration: InputDecoration(
          hintText: isLogin ? 'كلمة المرور' : 'كود التحقق OTP',
          prefixIcon: Icon(
            isLogin ? Icons.lock_outline : Icons.sms_outlined,
            color: AppColors.purpleLight,
          ),
        ),
        style: const TextStyle(color: AppColors.textPrimary),
      ),
      const SizedBox(height: 24),
      _loading
        ? const Center(child: CircularProgressIndicator(color: AppColors.purplePrimary))
        : Container(
            height: 52,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(14),
              gradient: AppGradients.purpleGold,
              boxShadow: [BoxShadow(color: AppColors.purplePrimary.withOpacity(0.4), blurRadius: 16, offset: const Offset(0, 6))],
            ),
            child: Material(
              color: Colors.transparent,
              child: InkWell(
                borderRadius: BorderRadius.circular(14),
                onTap: _login,
                child: Center(child: Text(
                  isLogin ? 'دخول 🚀' : 'إنشاء الحساب ✨',
                  style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: Colors.white),
                )),
              ),
            ),
          ),
    ]);
  }

  Widget _socialBtn(String label, String icon, Color color) {
    return GestureDetector(
      onTap: _login,
      child: Container(
        width: 72, height: 44,
        decoration: BoxDecoration(
          color: color.withOpacity(0.15),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: color.withOpacity(0.4)),
        ),
        child: Center(child: Text(icon.isEmpty ? '🍎' : icon,
          style: TextStyle(color: color, fontWeight: FontWeight.w800, fontSize: 16))),
      ),
    );
  }
}
