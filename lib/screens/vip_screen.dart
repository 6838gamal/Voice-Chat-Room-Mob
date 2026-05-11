import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/app_data.dart';
import '../widgets/vip_badge.dart';

class VipScreen extends StatelessWidget {
  const VipScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgPrimary,
      body: CustomScrollView(slivers: [
        SliverAppBar(
          expandedHeight: 160,
          pinned: true,
          backgroundColor: AppColors.bgSecondary,
          leading: IconButton(icon: const Icon(Icons.arrow_back_ios), onPressed: () => Navigator.pop(context)),
          flexibleSpace: FlexibleSpaceBar(
            background: Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [Color(0xFF2d1b00), Color(0xFF8B6914), Color(0xFFD4A017)],
                  begin: Alignment.topRight, end: Alignment.bottomLeft,
                ),
              ),
              child: const Center(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                SizedBox(height: 40),
                Text('👑', style: TextStyle(fontSize: 48)),
                Text('نادي VIP & SVIP', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: Colors.white)),
                Text('مميزات حصرية لأعضاء نادي الذهب', style: TextStyle(fontSize: 12, color: Colors.white70)),
              ])),
            ),
          ),
        ),
        SliverToBoxAdapter(child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            const Text('🌟 مستويات VIP', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800)),
            const SizedBox(height: 12),
            ...AppData.vipLevels.map((v) => _VipCard(level: v, isSvip: false)),
            const SizedBox(height: 20),
            const Text('👑 مستويات SVIP', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: AppColors.goldBright)),
            const SizedBox(height: 12),
            ...AppData.svipLevels.map((v) => _VipCard(level: v, isSvip: true)),
            const SizedBox(height: 24),
          ]),
        )),
      ]),
    );
  }
}

class _VipCard extends StatelessWidget {
  final Map level;
  final bool isSvip;
  const _VipCard({required this.level, required this.isSvip});

  @override
  Widget build(BuildContext context) {
    final color = Color(level['color'] as int);
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.bgCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withOpacity(0.4)),
        gradient: LinearGradient(colors: [AppColors.bgCard, color.withOpacity(0.06)], begin: Alignment.centerRight, end: Alignment.centerLeft),
      ),
      child: Row(children: [
        Container(
          width: 52, height: 52,
          decoration: BoxDecoration(
            color: color.withOpacity(0.15),
            shape: BoxShape.circle,
            border: Border.all(color: color.withOpacity(0.5)),
          ),
          child: Center(child: Text(level['emoji'] as String, style: const TextStyle(fontSize: 24))),
        ),
        const SizedBox(width: 14),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Text(level['name'] as String, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w800)),
            const SizedBox(width: 8),
            VipBadge(vip: (level['name'] as String).toLowerCase().replaceAll(' ', '-')),
          ]),
          if (level['perks'] != null) ...[
            const SizedBox(height: 4),
            Text((level['perks'] as List).join(' · '),
              style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
          ],
        ])),
        Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
          Text('🪙 ${_fmt(level['price'] as int)}',
            style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: color)),
          const SizedBox(height: 4),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
            decoration: BoxDecoration(
              color: color.withOpacity(0.15),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text('اشتراك', style: TextStyle(fontSize: 9, color: color, fontWeight: FontWeight.w700)),
          ),
        ]),
      ]),
    );
  }

  String _fmt(int n) {
    if (n >= 1000000) return '${(n / 1000000).toStringAsFixed(1)}M';
    if (n >= 1000) return '${(n / 1000).toStringAsFixed(0)}K';
    return n.toString();
  }
}
