import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/app_data.dart';
import '../widgets/bottom_nav.dart';
import '../widgets/vip_badge.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});
  @override State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> with SingleTickerProviderStateMixin {
  late TabController _tabs;

  @override
  void initState() { super.initState(); _tabs = TabController(length: 3, vsync: this); }
  @override
  void dispose() { _tabs.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    final u = AppData.currentUser;
    return MainScaffold(
      currentIndex: 4,
      body: CustomScrollView(slivers: [
        // Header
        SliverToBoxAdapter(child: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              colors: [Color(0xFF1A0040), AppColors.bgPrimary],
              begin: Alignment.topCenter, end: Alignment.bottomCenter,
            ),
          ),
          padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top + 8, bottom: 24),
          child: Column(children: [
            // Top actions
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                const Text('حسابي', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
                Row(children: [
                  _iconBtn(Icons.settings_outlined, () {}),
                  const SizedBox(width: 8),
                  _iconBtn(Icons.share_outlined, () {}),
                ]),
              ]),
            ),
            const SizedBox(height: 20),

            // Avatar
            Stack(alignment: Alignment.center, children: [
              Container(
                width: 100, height: 100,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: AppGradients.purpleGold,
                  boxShadow: [BoxShadow(color: AppColors.purplePrimary.withOpacity(0.5), blurRadius: 24)],
                ),
                child: Center(child: Text(u.avatar, style: const TextStyle(fontSize: 48))),
              ),
              Positioned(bottom: 0, left: MediaQuery.of(context).size.width / 2 + 26,
                child: Container(
                  width: 28, height: 28,
                  decoration: BoxDecoration(
                    color: AppColors.purplePrimary, shape: BoxShape.circle,
                    border: Border.all(color: AppColors.bgPrimary, width: 2),
                  ),
                  child: const Icon(Icons.camera_alt, size: 14, color: Colors.white),
                ),
              ),
            ]),
            const SizedBox(height: 12),

            Text(u.name, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900)),
            const SizedBox(height: 6),
            VipBadge(vip: u.vip, fontSize: 11),
            const SizedBox(height: 6),
            Text('@sawtak_user_${u.id}', style: const TextStyle(fontSize: 12, color: AppColors.textMuted)),
            const SizedBox(height: 16),

            // Stats
            Row(mainAxisAlignment: MainAxisAlignment.center, children: [
              _stat('24', 'المستوى'),
              _divider(),
              _stat('12,500', 'عملاتي 🪙'),
              _divider(),
              _stat('1,240', 'متابع'),
              _divider(),
              _stat('380', 'أتابع'),
            ]),
            const SizedBox(height: 16),

            // XP bar
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 32),
              child: Column(children: [
                Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                  const Text('XP', style: TextStyle(fontSize: 11, color: AppColors.textSecondary)),
                  const Text('المستوى التالي: 25', style: TextStyle(fontSize: 11, color: AppColors.textSecondary)),
                ]),
                const SizedBox(height: 4),
                ClipRRect(
                  borderRadius: BorderRadius.circular(999),
                  child: const LinearProgressIndicator(
                    value: 0.72,
                    minHeight: 8,
                    backgroundColor: AppColors.borderDefault,
                    valueColor: AlwaysStoppedAnimation(AppColors.purplePrimary),
                  ),
                ),
                const SizedBox(height: 4),
                const Text('7,200 / 10,000 XP', style: TextStyle(fontSize: 10, color: AppColors.textMuted)),
              ]),
            ),

            const SizedBox(height: 16),
            // Action buttons
            Row(mainAxisAlignment: MainAxisAlignment.center, children: [
              _actionBtn('✏️ تعديل', AppColors.purplePrimary, () {}),
              const SizedBox(width: 10),
              _actionBtn('💎 VIP', AppColors.goldDark, () => Navigator.pushNamed(context, '/vip')),
              const SizedBox(width: 10),
              _actionBtn('🎮 ألعاب', AppColors.bgCard, () => Navigator.pushNamed(context, '/games')),
            ]),
          ]),
        )),

        // Tabs
        SliverPersistentHeader(
          pinned: true,
          delegate: _TabsDelegate(TabBar(
            controller: _tabs,
            labelColor: AppColors.purpleLight,
            unselectedLabelColor: AppColors.textMuted,
            indicatorColor: AppColors.purplePrimary,
            tabs: const [Tab(text: '🎁 هداياي'), Tab(text: '🏆 إنجازاتي'), Tab(text: '📝 حائطي')],
          )),
        ),

        SliverFillRemaining(
          child: TabBarView(controller: _tabs, children: [
            _buildGiftsTab(),
            _buildAchievementsTab(),
            _buildWallTab(),
          ]),
        ),
      ]),
    );
  }

  Widget _stat(String val, String label) => Padding(
    padding: const EdgeInsets.symmetric(horizontal: 14),
    child: Column(children: [
      Text(val, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900)),
      Text(label, style: const TextStyle(fontSize: 10, color: AppColors.textSecondary)),
    ]),
  );

  Widget _divider() => Container(width: 1, height: 30, color: AppColors.borderDefault);

  Widget _iconBtn(IconData icon, VoidCallback onTap) => GestureDetector(
    onTap: onTap,
    child: Container(
      width: 36, height: 36,
      decoration: BoxDecoration(color: AppColors.glassBg, borderRadius: BorderRadius.circular(10), border: Border.all(color: AppColors.borderDefault)),
      child: Icon(icon, size: 18, color: AppColors.textSecondary),
    ),
  );

  Widget _actionBtn(String label, Color bg, VoidCallback onTap) => GestureDetector(
    onTap: onTap,
    child: Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(20), border: Border.all(color: AppColors.borderDefault)),
      child: Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
    ),
  );

  Widget _buildGiftsTab() => GridView.builder(
    padding: const EdgeInsets.all(16),
    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3, mainAxisSpacing: 12, crossAxisSpacing: 12),
    itemCount: AppData.gifts.length,
    itemBuilder: (_, i) => Container(
      decoration: BoxDecoration(color: AppColors.bgCard, borderRadius: BorderRadius.circular(12), border: Border.all(color: AppColors.borderDefault)),
      child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        Text(AppData.gifts[i].emoji, style: const TextStyle(fontSize: 28)),
        const SizedBox(height: 4),
        Text(AppData.gifts[i].name, style: const TextStyle(fontSize: 10, color: AppColors.textSecondary), textAlign: TextAlign.center),
        Text('x${(i + 1) * 3}', style: const TextStyle(fontSize: 9, color: AppColors.purpleLight)),
      ]),
    ),
  );

  Widget _buildAchievementsTab() {
    final ach = [
      {'icon':'🌟','name':'نجم الموسيقى','desc':'استمعت 100 ساعة','done':true},
      {'icon':'🎁','name':'كريم القلب','desc':'أرسلت 500 هدية','done':true},
      {'icon':'🔥','name':'المتحمس','desc':'دخول 30 يوم متتالي','done':false},
      {'icon':'👑','name':'ملك الغرفة','desc':'استضفت 50 غرفة','done':false},
      {'icon':'💎','name':'حامل الجوهرة','desc':'أنفق 100K عملة','done':true},
      {'icon':'🏆','name':'الأسطوري','desc':'الوصول للمستوى 50','done':false},
    ];
    return ListView(padding: const EdgeInsets.all(16), children: ach.map((a) => Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: (a['done'] as bool) ? AppColors.glassPurple : AppColors.bgElevated,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: (a['done'] as bool) ? AppColors.borderPurple : AppColors.borderDefault),
      ),
      child: Row(children: [
        Text(a['icon'] as String, style: const TextStyle(fontSize: 28)),
        const SizedBox(width: 14),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(a['name'] as String, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700)),
          Text(a['desc'] as String, style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
        ])),
        Icon((a['done'] as bool) ? Icons.check_circle : Icons.radio_button_unchecked,
          color: (a['done'] as bool) ? AppColors.green : AppColors.textMuted, size: 22),
      ]),
    )).toList());
  }

  Widget _buildWallTab() => ListView(padding: const EdgeInsets.all(16), children: [
    ...AppData.chatMessages.map((m) => Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(color: AppColors.bgCard, borderRadius: BorderRadius.circular(12), border: Border.all(color: AppColors.borderDefault)),
      child: Row(children: [
        Text(m['avatar'] ?? '👤', style: const TextStyle(fontSize: 20)),
        const SizedBox(width: 10),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(m['user'] ?? '', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: AppColors.purpleLight)),
          Text(m['msg'] ?? '', style: const TextStyle(fontSize: 12)),
        ])),
      ]),
    )),
  ]);
}

class _TabsDelegate extends SliverPersistentHeaderDelegate {
  final TabBar tabBar;
  const _TabsDelegate(this.tabBar);
  @override double get minExtent => tabBar.preferredSize.height;
  @override double get maxExtent => tabBar.preferredSize.height;
  @override Widget build(_, __, ___) => Container(color: AppColors.bgSecondary, child: tabBar);
  @override bool shouldRebuild(_) => false;
}
