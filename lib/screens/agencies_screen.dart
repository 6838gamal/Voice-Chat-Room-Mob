import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/app_data.dart';
import '../widgets/vip_badge.dart';

class AgenciesScreen extends StatelessWidget {
  const AgenciesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgPrimary,
      appBar: AppBar(
        backgroundColor: AppColors.bgSecondary,
        title: const Text('🏢 الوكالات والمضيفون'),
        leading: IconButton(icon: const Icon(Icons.arrow_back_ios), onPressed: () => Navigator.pop(context)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          // Podium
          const Text('🏆 منصة المتصدرين', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800)),
          const SizedBox(height: 16),
          Row(mainAxisAlignment: MainAxisAlignment.center, crossAxisAlignment: CrossAxisAlignment.end, children: [
            _PodiumEntry(host: AppData.hosts[1], rank: 2, height: 90),
            const SizedBox(width: 8),
            _PodiumEntry(host: AppData.hosts[0], rank: 1, height: 120),
            const SizedBox(width: 8),
            _PodiumEntry(host: AppData.hosts[2], rank: 3, height: 70),
          ]),
          const SizedBox(height: 24),

          // Agencies
          const Text('🏢 الوكالات الرسمية', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800)),
          const SizedBox(height: 12),
          ...AppData.agencies.map((a) => Container(
            margin: const EdgeInsets.only(bottom: 10),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(color: AppColors.bgCard, borderRadius: BorderRadius.circular(16), border: Border.all(color: AppColors.borderDefault)),
            child: Row(children: [
              Container(
                width: 52, height: 52,
                decoration: BoxDecoration(
                  gradient: AppGradients.purpleGold,
                  borderRadius: BorderRadius.circular(14),
                ),
                child: Center(child: Text(a['emoji'] as String, style: const TextStyle(fontSize: 26))),
              ),
              const SizedBox(width: 14),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(a['name'] as String, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w800)),
                Text('${a['members']} عضو · المركز ${a['rank']}', style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
              ])),
              Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
                Text('${a['earnings']} 🪙', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: AppColors.goldBright)),
                const SizedBox(height: 4),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(gradient: AppGradients.purpleGold, borderRadius: BorderRadius.circular(999)),
                  child: const Text('انضم', style: TextStyle(fontSize: 9, color: Colors.white, fontWeight: FontWeight.w700)),
                ),
              ]),
            ]),
          )),

          const SizedBox(height: 20),
          const Text('⭐ أبرز المضيفين', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800)),
          const SizedBox(height: 12),
          ...AppData.hosts.asMap().entries.map((e) {
            final i = e.key; final h = e.value;
            return Container(
              margin: const EdgeInsets.only(bottom: 8),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(color: AppColors.bgCard, borderRadius: BorderRadius.circular(14), border: Border.all(color: AppColors.borderDefault)),
              child: Row(children: [
                Text(['🥇','🥈','🥉','4','5'][i], style: const TextStyle(fontSize: 22)),
                const SizedBox(width: 12),
                Text(h.avatar, style: const TextStyle(fontSize: 28)),
                const SizedBox(width: 12),
                Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Row(children: [
                    Text(h.name, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700)),
                    const SizedBox(width: 6),
                    VipBadge(vip: h.vip),
                  ]),
                  Text('مستوى ${h.level} · 🪙 ${h.coins.toString()}', style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
                ])),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  decoration: BoxDecoration(color: AppColors.glassPurple, borderRadius: BorderRadius.circular(20), border: Border.all(color: AppColors.borderPurple)),
                  child: const Text('متابعة', style: TextStyle(fontSize: 11, color: AppColors.purpleLight, fontWeight: FontWeight.w700)),
                ),
              ]),
            );
          }),
          const SizedBox(height: 24),
        ]),
      ),
    );
  }
}

class _PodiumEntry extends StatelessWidget {
  final UserModel host;
  final int rank;
  final double height;
  const _PodiumEntry({required this.host, required this.rank, required this.height});

  @override
  Widget build(BuildContext context) {
    final isFirst = rank == 1;
    return Column(mainAxisSize: MainAxisSize.min, children: [
      if (isFirst) const Text('👑', style: TextStyle(fontSize: 20)),
      Text(host.avatar, style: TextStyle(fontSize: isFirst ? 40 : 30)),
      const SizedBox(height: 4),
      Text(host.name.split(' ')[0], style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w700), overflow: TextOverflow.ellipsis),
      VipBadge(vip: host.vip, fontSize: 8),
      const SizedBox(height: 6),
      Container(
        width: isFirst ? 90 : 70,
        height: height,
        decoration: BoxDecoration(
          gradient: isFirst ? AppGradients.gold : AppGradients.purpleGold,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
        ),
        child: Center(child: Text(
          rank == 1 ? '🥇' : rank == 2 ? '🥈' : '🥉',
          style: const TextStyle(fontSize: 24),
        )),
      ),
    ]);
  }
}
