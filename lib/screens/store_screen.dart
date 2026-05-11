import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/app_data.dart';
import '../widgets/bottom_nav.dart';

class StoreScreen extends StatefulWidget {
  const StoreScreen({super.key});
  @override State<StoreScreen> createState() => _StoreScreenState();
}

class _StoreScreenState extends State<StoreScreen> with SingleTickerProviderStateMixin {
  late TabController _tabs;
  int _selectedPkg = 1;

  @override
  void initState() { super.initState(); _tabs = TabController(length: 4, vsync: this); }
  @override
  void dispose() { _tabs.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgPrimary,
      appBar: AppBar(
        backgroundColor: AppColors.bgSecondary,
        title: const Text('💎 المتجر'),
        leading: IconButton(icon: const Icon(Icons.arrow_back_ios), onPressed: () => Navigator.pop(context)),
        bottom: TabBar(
          controller: _tabs,
          labelColor: AppColors.purpleLight,
          unselectedLabelColor: AppColors.textMuted,
          indicatorColor: AppColors.purplePrimary,
          isScrollable: true,
          tabs: const [Tab(text: '🪙 عملات'), Tab(text: '🎁 هدايا'), Tab(text: '👑 VIP'), Tab(text: '🖼️ إطارات')],
        ),
      ),
      body: TabBarView(controller: _tabs, children: [
        _buildCoinsTab(),
        _buildGiftsTab(),
        _buildVipTab(),
        _buildFramesTab(),
      ]),
    );
  }

  Widget _buildCoinsTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        // Balance card
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            gradient: AppGradients.purpleGold,
            borderRadius: BorderRadius.circular(20),
            boxShadow: [BoxShadow(color: AppColors.purplePrimary.withOpacity(0.3), blurRadius: 20, offset: const Offset(0, 6))],
          ),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            const Text('رصيدي الحالي', style: TextStyle(fontSize: 12, color: Colors.white70)),
            const SizedBox(height: 6),
            const Text('🪙 12,500', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: Colors.white)),
            const SizedBox(height: 8),
            const Text('أشحن الآن واحصل على عملات إضافية', style: TextStyle(fontSize: 11, color: Colors.white60)),
          ]),
        ),
        const SizedBox(height: 24),
        const Text('اختر الباقة', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800)),
        const SizedBox(height: 12),
        ...AppData.coinPackages.asMap().entries.map((e) {
          final i = e.key; final pkg = e.value;
          final selected = i == _selectedPkg;
          return GestureDetector(
            onTap: () => setState(() => _selectedPkg = i),
            child: Container(
              margin: const EdgeInsets.only(bottom: 10),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: selected ? AppColors.glassPurple : AppColors.bgCard,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: selected ? AppColors.purplePrimary : AppColors.borderDefault, width: selected ? 1.5 : 1),
              ),
              child: Row(children: [
                Text('🪙', style: TextStyle(fontSize: selected ? 32 : 26)),
                const SizedBox(width: 14),
                Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Row(children: [
                    Text('${pkg['coins']} عملة', style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w800)),
                    if ((pkg['bonus'] as int) > 0) ...[
                      const SizedBox(width: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(color: AppColors.green.withOpacity(0.15), borderRadius: BorderRadius.circular(999), border: Border.all(color: AppColors.green.withOpacity(0.4))),
                        child: Text('+${pkg['bonus']} مكافأة', style: const TextStyle(fontSize: 9, color: AppColors.green, fontWeight: FontWeight.w700)),
                      ),
                    ],
                    if (pkg['popular'] as bool) ...[
                      const SizedBox(width: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(gradient: AppGradients.gold, borderRadius: BorderRadius.circular(999)),
                        child: const Text('الأشهر', style: TextStyle(fontSize: 9, color: Colors.black, fontWeight: FontWeight.w800)),
                      ),
                    ],
                  ]),
                  Text('السعر: ${pkg['price']}', style: const TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                ])),
                if (selected) const Icon(Icons.check_circle, color: AppColors.purpleLight, size: 22),
              ]),
            ),
          );
        }),
        const SizedBox(height: 16),
        SizedBox(
          width: double.infinity,
          height: 52,
          child: DecoratedBox(
            decoration: BoxDecoration(gradient: AppGradients.purpleGold, borderRadius: BorderRadius.circular(14)),
            child: ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(backgroundColor: Colors.transparent, shadowColor: Colors.transparent, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14))),
              child: const Text('إتمام الشراء 💳', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800)),
            ),
          ),
        ),
      ]),
    );
  }

  Widget _buildGiftsTab() => GridView.builder(
    padding: const EdgeInsets.all(16),
    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3, mainAxisSpacing: 12, crossAxisSpacing: 12, childAspectRatio: 0.85),
    itemCount: AppData.gifts.length,
    itemBuilder: (_, i) {
      final g = AppData.gifts[i];
      return Container(
        decoration: BoxDecoration(color: AppColors.bgCard, borderRadius: BorderRadius.circular(14), border: Border.all(color: AppColors.borderDefault)),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text(g.emoji, style: const TextStyle(fontSize: 32)),
          const SizedBox(height: 5),
          Text(g.name, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700), textAlign: TextAlign.center),
          const SizedBox(height: 3),
          Text('🪙 ${g.price}', style: const TextStyle(fontSize: 11, color: AppColors.goldBright)),
          const SizedBox(height: 6),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(gradient: AppGradients.gold, borderRadius: BorderRadius.circular(999)),
            child: const Text('إرسال', style: TextStyle(fontSize: 10, color: Colors.black, fontWeight: FontWeight.w700)),
          ),
        ]),
      );
    },
  );

  Widget _buildVipTab() => ListView(padding: const EdgeInsets.all(16), children: [
    ...AppData.vipLevels.map((v) => Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.bgCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Color(v['color'] as int).withOpacity(0.4)),
      ),
      child: Row(children: [
        Text(v['emoji'] as String, style: const TextStyle(fontSize: 28)),
        const SizedBox(width: 14),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(v['name'] as String, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w800)),
          Text((v['perks'] as List).join(' · '), style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
        ])),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
          decoration: BoxDecoration(
            color: Color(v['color'] as int).withOpacity(0.15),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: Color(v['color'] as int).withOpacity(0.5)),
          ),
          child: Text('🪙${v['price']}', style: TextStyle(fontSize: 11, color: Color(v['color'] as int), fontWeight: FontWeight.w700)),
        ),
      ]),
    )),
  ]);

  Widget _buildFramesTab() {
    final frames = ['🔮','🌟','👑','🌈','🔥','💎','🌙','⚡'];
    return GridView.builder(
      padding: const EdgeInsets.all(16),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3, mainAxisSpacing: 12, crossAxisSpacing: 12),
      itemCount: frames.length,
      itemBuilder: (_, i) => Container(
        decoration: BoxDecoration(color: AppColors.bgCard, borderRadius: BorderRadius.circular(16), border: Border.all(color: AppColors.borderDefault)),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text(frames[i], style: const TextStyle(fontSize: 36)),
          const SizedBox(height: 6),
          Text('إطار ${i+1}', style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
          const SizedBox(height: 6),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
            decoration: BoxDecoration(gradient: AppGradients.gold, borderRadius: BorderRadius.circular(999)),
            child: const Text('🪙 500', style: TextStyle(fontSize: 9, color: Colors.black, fontWeight: FontWeight.w700)),
          ),
        ]),
      ),
    );
  }
}
