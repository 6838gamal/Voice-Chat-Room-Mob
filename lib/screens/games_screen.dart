import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/app_data.dart';

class GamesScreen extends StatelessWidget {
  const GamesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgPrimary,
      appBar: AppBar(
        backgroundColor: AppColors.bgSecondary,
        title: const Text('🎮 الألعاب'),
        leading: IconButton(icon: const Icon(Icons.arrow_back_ios), onPressed: () => Navigator.pop(context)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          // Banner
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(colors: [Color(0xFF003D1F), Color(0xFF00854C)], begin: Alignment.topRight, end: Alignment.bottomLeft),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Row(children: [
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                const Text('🎯 تحديات اليوم', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: Colors.white)),
                const SizedBox(height: 4),
                const Text('العب وأربح عملات ذهبية', style: TextStyle(fontSize: 12, color: Colors.white70)),
                const SizedBox(height: 10),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20)),
                  child: const Text('ابدأ الآن', style: TextStyle(fontSize: 11, color: Color(0xFF00854C), fontWeight: FontWeight.w800)),
                ),
              ])),
              const Text('🏆', style: TextStyle(fontSize: 56)),
            ]),
          ),

          const SizedBox(height: 20),

          // Leaderboard strip
          const Text('🥇 المتصدرون', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800)),
          const SizedBox(height: 10),
          SizedBox(
            height: 80,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: AppData.hosts.length,
              itemBuilder: (_, i) => Container(
                width: 70, margin: const EdgeInsets.only(left: 8),
                decoration: BoxDecoration(color: AppColors.bgCard, borderRadius: BorderRadius.circular(12), border: Border.all(color: AppColors.borderDefault)),
                child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                  Text(AppData.hosts[i].avatar, style: const TextStyle(fontSize: 22)),
                  Text(AppData.hosts[i].name.split(' ')[0], style: const TextStyle(fontSize: 9), overflow: TextOverflow.ellipsis),
                  Text(['🥇','🥈','🥉','4️⃣','5️⃣'][i], style: const TextStyle(fontSize: 12)),
                ]),
              ),
            ),
          ),

          const SizedBox(height: 20),
          const Text('🎰 الألعاب المتاحة', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800)),
          const SizedBox(height: 12),

          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2, mainAxisSpacing: 12, crossAxisSpacing: 12, childAspectRatio: 1.1),
            itemCount: AppData.games.length,
            itemBuilder: (_, i) {
              final g = AppData.games[i];
              return GestureDetector(
                onTap: () => _showGameDialog(context, g),
                child: Container(
                  decoration: BoxDecoration(
                    color: AppColors.bgCard,
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(color: AppColors.borderDefault),
                  ),
                  child: Stack(children: [
                    Positioned(top: -8, right: -8,
                      child: Text(g['emoji'] as String, style: const TextStyle(fontSize: 56, color: Colors.white12))),
                    Padding(
                      padding: const EdgeInsets.all(14),
                      child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisAlignment: MainAxisAlignment.end, children: [
                        Text(g['emoji'] as String, style: const TextStyle(fontSize: 28)),
                        const SizedBox(height: 6),
                        Text(g['name'] as String, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w800)),
                        const SizedBox(height: 2),
                        Row(children: [
                          const Icon(Icons.people_outline, size: 11, color: AppColors.textMuted),
                          const SizedBox(width: 3),
                          Text('${g['players']} لاعب', style: const TextStyle(fontSize: 10, color: AppColors.textMuted)),
                          const Spacer(),
                          Text(g['prize'] as String, style: const TextStyle(fontSize: 10, color: AppColors.goldBright, fontWeight: FontWeight.w700)),
                        ]),
                      ]),
                    ),
                  ]),
                ),
              );
            },
          ),
          const SizedBox(height: 24),
        ]),
      ),
    );
  }

  void _showGameDialog(BuildContext context, Map g) {
    showDialog(context: context, builder: (_) => AlertDialog(
      backgroundColor: AppColors.bgCard,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      title: Text('${g['emoji']} ${g['name']}', textAlign: TextAlign.center),
      content: Column(mainAxisSize: MainAxisSize.min, children: [
        Text('${g['players']} لاعب نشط الآن', style: const TextStyle(color: AppColors.textSecondary)),
        const SizedBox(height: 8),
        Text('الجائزة: ${g['prize']}', style: const TextStyle(color: AppColors.goldBright, fontWeight: FontWeight.w700)),
      ]),
      actions: [
        TextButton(onPressed: () => Navigator.pop(context), child: const Text('إلغاء', style: TextStyle(color: AppColors.textSecondary))),
        ElevatedButton(onPressed: () => Navigator.pop(context), child: const Text('العب الآن 🎮')),
      ],
    ));
  }
}
