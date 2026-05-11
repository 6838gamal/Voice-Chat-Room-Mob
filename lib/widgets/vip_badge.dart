import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class VipBadge extends StatelessWidget {
  final String vip;
  final double fontSize;

  const VipBadge({super.key, required this.vip, this.fontSize = 9});

  Color get _color {
    if (vip.startsWith('svip')) return AppColors.goldBright;
    return AppColors.purpleLight;
  }

  Color get _bg {
    if (vip.startsWith('svip')) return AppColors.glassGold;
    return AppColors.glassPurple;
  }

  String get _label => vip.toUpperCase();

  String get _icon {
    if (vip == 'svip-6') return '👑';
    if (vip == 'svip-5') return '🌠';
    if (vip.startsWith('svip')) return '💫';
    if (vip == 'vip-6') return '🌟';
    if (vip == 'vip-5') return '⚡';
    return '✨';
  }

  @override
  Widget build(BuildContext context) {
    if (vip.isEmpty) return const SizedBox.shrink();
    return Container(
      padding: EdgeInsets.symmetric(horizontal: fontSize * 0.8, vertical: 2),
      decoration: BoxDecoration(
        color: _bg,
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: _color.withOpacity(0.5)),
      ),
      child: Text(
        '$_icon $_label',
        style: TextStyle(
          fontSize: fontSize,
          fontWeight: FontWeight.w800,
          color: _color,
        ),
      ),
    );
  }
}
