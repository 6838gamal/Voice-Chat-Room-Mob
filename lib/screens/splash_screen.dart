import 'dart:math';
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});
  @override State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with TickerProviderStateMixin {
  late AnimationController _logoCtrl, _textCtrl, _progressCtrl, _particleCtrl;
  late Animation<double> _logoScale, _logoOpacity, _textOpacity, _progress, _glow;

  @override
  void initState() {
    super.initState();

    _logoCtrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 900));
    _textCtrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 700));
    _progressCtrl = AnimationController(vsync: this, duration: const Duration(seconds: 2));
    _particleCtrl = AnimationController(vsync: this, duration: const Duration(seconds: 3))..repeat();

    _logoScale   = CurvedAnimation(parent: _logoCtrl, curve: Curves.elasticOut).drive(Tween(begin: 0.0, end: 1.0));
    _logoOpacity = CurvedAnimation(parent: _logoCtrl, curve: Curves.easeOut).drive(Tween(begin: 0.0, end: 1.0));
    _textOpacity = CurvedAnimation(parent: _textCtrl, curve: Curves.easeOut).drive(Tween(begin: 0.0, end: 1.0));
    _progress    = CurvedAnimation(parent: _progressCtrl, curve: Curves.easeInOut).drive(Tween(begin: 0.0, end: 1.0));
    _glow        = CurvedAnimation(parent: _particleCtrl, curve: Curves.easeInOut).drive(Tween(begin: 0.8, end: 1.0));

    _logoCtrl.forward().then((_) => _textCtrl.forward());
    Future.delayed(const Duration(milliseconds: 500), () => _progressCtrl.forward());
    Future.delayed(const Duration(milliseconds: 2800), () {
      if (mounted) Navigator.pushReplacementNamed(context, '/auth');
    });
  }

  @override
  void dispose() {
    _logoCtrl.dispose(); _textCtrl.dispose();
    _progressCtrl.dispose(); _particleCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgPrimary,
      body: Stack(children: [
        // Background gradient
        Container(
          decoration: const BoxDecoration(
            gradient: RadialGradient(
              center: Alignment(0, -0.3),
              radius: 0.9,
              colors: [Color(0xFF1A0040), AppColors.bgPrimary],
            ),
          ),
        ),

        // Particles
        AnimatedBuilder(
          animation: _particleCtrl,
          builder: (_, __) => CustomPaint(
            painter: _ParticlePainter(_particleCtrl.value),
            size: Size.infinite,
          ),
        ),

        // Center content
        Center(
          child: Column(mainAxisSize: MainAxisSize.min, children: [
            // Logo with glow
            AnimatedBuilder(
              animation: Listenable.merge([_logoScale, _glow]),
              builder: (_, __) => Transform.scale(
                scale: _logoScale.value,
                child: Opacity(
                  opacity: _logoOpacity.value,
                  child: AnimatedBuilder(
                    animation: _glow,
                    builder: (_, child) => Container(
                      width: 120, height: 120,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(32),
                        gradient: AppGradients.purpleGold,
                        boxShadow: [
                          BoxShadow(
                            color: AppColors.purplePrimary.withOpacity(0.6 * _glow.value),
                            blurRadius: 40 * _glow.value,
                            spreadRadius: 8 * _glow.value,
                          ),
                          BoxShadow(
                            color: AppColors.goldPrimary.withOpacity(0.3 * _glow.value),
                            blurRadius: 60 * _glow.value,
                          ),
                        ],
                      ),
                      child: const Icon(Icons.mic, size: 60, color: Colors.white),
                    ),
                  ),
                ),
              ),
            ),

            const SizedBox(height: 28),

            // Title
            FadeTransition(
              opacity: _textOpacity,
              child: Column(children: [
                Text('صوتك',
                  style: TextStyle(
                    fontSize: 52, fontWeight: FontWeight.w900,
                    foreground: Paint()..shader = const LinearGradient(
                      colors: [AppColors.purpleLight, AppColors.goldBright],
                    ).createShader(const Rect.fromLTWH(0,0,200,60)),
                  ),
                ),
                const SizedBox(height: 4),
                const Text('S A W T A K',
                  style: TextStyle(
                    fontSize: 14, letterSpacing: 6,
                    color: AppColors.textSecondary, fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 8),
                const Text('غرف صوتية | تواصل | مجتمع',
                  style: TextStyle(fontSize: 13, color: AppColors.textMuted),
                ),
              ]),
            ),

            const SizedBox(height: 48),

            // Progress bar
            FadeTransition(
              opacity: _textOpacity,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 64),
                child: Column(children: [
                  AnimatedBuilder(
                    animation: _progress,
                    builder: (_, __) => ClipRRect(
                      borderRadius: BorderRadius.circular(999),
                      child: LinearProgressIndicator(
                        value: _progress.value,
                        backgroundColor: AppColors.borderDefault,
                        valueColor: const AlwaysStoppedAnimation(AppColors.purplePrimary),
                        minHeight: 3,
                      ),
                    ),
                  ),
                  const SizedBox(height: 10),
                  const Text('جارٍ التحميل...', style: TextStyle(fontSize: 11, color: AppColors.textMuted)),
                ]),
              ),
            ),
          ]),
        ),

        // Version
        Positioned(
          bottom: 24, left: 0, right: 0,
          child: Center(
            child: Text('الإصدار 1.0.0', style: const TextStyle(fontSize: 11, color: AppColors.textMuted)),
          ),
        ),
      ]),
    );
  }
}

class _ParticlePainter extends CustomPainter {
  final double t;
  _ParticlePainter(this.t);

  @override
  void paint(Canvas canvas, Size size) {
    final rng = Random(42);
    final paint = Paint()..style = PaintingStyle.fill;
    for (int i = 0; i < 20; i++) {
      final x = rng.nextDouble() * size.width;
      final baseY = rng.nextDouble() * size.height;
      final phase = rng.nextDouble() * 2 * pi;
      final y = baseY + sin(t * 2 * pi + phase) * 12;
      final alpha = (0.2 + 0.3 * sin(t * 2 * pi + phase)).clamp(0.0, 1.0);
      paint.color = (i % 2 == 0 ? AppColors.purplePrimary : AppColors.goldPrimary).withOpacity(alpha);
      canvas.drawCircle(Offset(x, y), 2 + rng.nextDouble() * 2, paint);
    }
  }

  @override
  bool shouldRepaint(_ParticlePainter old) => true;
}
