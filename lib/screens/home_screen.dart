import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/app_data.dart';
import '../widgets/bottom_nav.dart';
import '../widgets/vip_badge.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});
  @override State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _scroll = ScrollController();

  @override
  Widget build(BuildContext context) {
    return MainScaffold(
      currentIndex: 0,
      body: CustomScrollView(slivers: [
        // App bar
        SliverAppBar(
          pinned: true,
          backgroundColor: AppColors.bgSecondary,
          expandedHeight: 0,
          title: Row(children: [
            Container(
              width: 32, height: 32,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                gradient: AppGradients.purpleGold,
              ),
              child: const Icon(Icons.mic, size: 18, color: Colors.white),
            ),
            const SizedBox(width: 8),
            const Text('صوتك', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w900)),
            const Spacer(),
            GestureDetector(
              onTap: () => Navigator.pushNamed(context, '/notifications'),
              child: Stack(children: [
                const Icon(Icons.notifications_outlined, size: 26),
                Positioned(top: 0, left: 0,
                  child: Container(width: 8, height: 8,
                    decoration: const BoxDecoration(color: AppColors.red, shape: BoxShape.circle))),
              ]),
            ),
            const SizedBox(width: 14),
            GestureDetector(
              onTap: () => Navigator.pushNamed(context, '/admin'),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: AppColors.red.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: AppColors.red.withOpacity(0.4)),
                ),
                child: const Text('أدمن', style: TextStyle(fontSize: 10, color: AppColors.red, fontWeight: FontWeight.w700)),
              ),
            ),
          ]),
          actions: const [SizedBox(width: 16)],
        ),

        SliverToBoxAdapter(child: Column(children: [

          // VIP Banner
          _buildVipBanner(),

          // Active users strip
          _buildActiveUsers(),

          // Section: Live rooms
          _sectionHeader('🔴 غرف مباشرة الآن', onSeeAll: () {}),
          _buildRoomsGrid(),

          // Section: Top hosts
          _sectionHeader('🏆 أبرز المضيفين', onSeeAll: () => Navigator.pushNamed(context, '/agencies')),
          _buildHostsList(),

          // Quick actions
          _buildQuickActions(),

          const SizedBox(height: 100),
        ])),
      ]),
    );
  }

  Widget _buildVipBanner() {
    return Container(
      height: 110,
      margin: const EdgeInsets.fromLTRB(16, 12, 16, 0),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: const LinearGradient(
          colors: [Color(0xFF2d1b00), Color(0xFF8B6914), Color(0xFFD4A017), Color(0xFF8B6914), Color(0xFF2d1b00)],
          begin: Alignment.centerRight, end: Alignment.centerLeft,
        ),
        boxShadow: [BoxShadow(color: AppColors.goldPrimary.withOpacity(0.3), blurRadius: 20, offset: const Offset(0, 6))],
      ),
      child: Stack(children: [
        // Shimmer overlay
        Positioned.fill(child: ClipRRect(
          borderRadius: BorderRadius.circular(20),
          child: const _ShimmerOverlay(),
        )),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
          child: Row(children: [
            Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisAlignment: MainAxisAlignment.center, children: [
              const Text('👑 انضم إلى نادي VIP', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: Colors.white)),
              const SizedBox(height: 4),
              const Text('مميزات حصرية · دخوليات ملكية', style: TextStyle(fontSize: 11, color: Color(0xFFFFD700))),
              const SizedBox(height: 8),
              GestureDetector(
                onTap: () => Navigator.pushNamed(context, '/vip'),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 5),
                  decoration: BoxDecoration(
                    color: Colors.black.withOpacity(0.4),
                    borderRadius: BorderRadius.circular(999),
                    border: Border.all(color: Colors.white.withOpacity(0.3)),
                  ),
                  child: const Text('اكتشف المميزات ←', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: Colors.white)),
                ),
              ),
            ])),
            const Text('✨', style: TextStyle(fontSize: 52)),
          ]),
        ),
      ]),
    );
  }

  Widget _buildActiveUsers() {
    final users = AppData.hosts;
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      const Padding(
        padding: EdgeInsets.fromLTRB(16, 16, 16, 10),
        child: Text('💚 متصلون الآن', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: AppColors.textSecondary)),
      ),
      SizedBox(
        height: 72,
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.symmetric(horizontal: 16),
          itemCount: users.length,
          itemBuilder: (_, i) {
            final u = users[i];
            return Padding(
              padding: const EdgeInsets.only(left: 12),
              child: Column(mainAxisSize: MainAxisSize.min, children: [
                Stack(children: [
                  Container(
                    width: 44, height: 44,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: u.vip.startsWith('svip') ? AppColors.goldBright : AppColors.purpleLight,
                        width: 2,
                      ),
                    ),
                    child: Center(child: Text(u.avatar, style: const TextStyle(fontSize: 22))),
                  ),
                  Positioned(bottom: 0, left: 0,
                    child: Container(width: 12, height: 12,
                      decoration: BoxDecoration(color: AppColors.green, shape: BoxShape.circle,
                        border: Border.all(color: AppColors.bgPrimary, width: 2)))),
                ]),
                const SizedBox(height: 4),
                Text(u.name.split(' ')[0], style: const TextStyle(fontSize: 9, color: AppColors.textSecondary)),
              ]),
            );
          },
        ),
      ),
    ]);
  }

  Widget _buildRoomsGrid() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 0, 16, 0),
      child: GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2, mainAxisSpacing: 12, crossAxisSpacing: 12, childAspectRatio: 0.95,
        ),
        itemCount: AppData.rooms.length,
        itemBuilder: (_, i) => _RoomCard(room: AppData.rooms[i]),
      ),
    );
  }

  Widget _buildHostsList() {
    return SizedBox(
      height: 130,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        itemCount: AppData.hosts.length,
        itemBuilder: (_, i) => _HostCard(host: AppData.hosts[i], rank: i + 1),
      ),
    );
  }

  Widget _buildQuickActions() {
    final actions = [
      {'icon': '🎮', 'label': 'ألعاب',    'route': '/games'},
      {'icon': '🏢', 'label': 'وكالات',   'route': '/agencies'},
      {'icon': '💎', 'label': 'المتجر',   'route': '/store'},
      {'icon': '🔍', 'label': 'بحث',      'route': '/search'},
    ];
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        _sectionHeader('⚡ اختصارات', onSeeAll: null),
        Row(children: actions.map((a) => Expanded(
          child: GestureDetector(
            onTap: () => Navigator.pushNamed(context, a['route']!),
            child: Container(
              margin: const EdgeInsets.only(left: 8),
              padding: const EdgeInsets.symmetric(vertical: 16),
              decoration: BoxDecoration(
                color: AppColors.bgCard,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.borderDefault),
              ),
              child: Column(children: [
                Text(a['icon']!, style: const TextStyle(fontSize: 24)),
                const SizedBox(height: 6),
                Text(a['label']!, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700)),
              ]),
            ),
          ),
        )).toList()),
      ]),
    );
  }

  Widget _sectionHeader(String title, {required VoidCallback? onSeeAll}) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 20, 16, 12),
      child: Row(children: [
        Text(title, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w800)),
        const Spacer(),
        if (onSeeAll != null)
          GestureDetector(
            onTap: onSeeAll,
            child: const Text('عرض الكل', style: TextStyle(fontSize: 12, color: AppColors.purpleLight)),
          ),
      ]),
    );
  }
}

class _RoomCard extends StatelessWidget {
  final RoomModel room;
  const _RoomCard({required this.room});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => Navigator.pushNamed(context, '/room', arguments: {'roomId': room.id}),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(18),
          color: AppColors.bgCard,
          border: Border.all(color: AppColors.borderDefault),
        ),
        child: Stack(children: [
          // BG glow
          Positioned(top: 0, right: 0,
            child: Container(width: 80, height: 80,
              decoration: BoxDecoration(
                gradient: RadialGradient(
                  colors: [AppColors.purplePrimary.withOpacity(0.25), Colors.transparent],
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(14),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                Text(room.bg, style: const TextStyle(fontSize: 30)),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
                  decoration: BoxDecoration(
                    color: AppColors.red.withOpacity(0.15),
                    borderRadius: BorderRadius.circular(999),
                    border: Border.all(color: AppColors.red.withOpacity(0.4)),
                  ),
                  child: const Row(mainAxisSize: MainAxisSize.min, children: [
                    Icon(Icons.circle, size: 6, color: AppColors.red),
                    SizedBox(width: 3),
                    Text('مباشر', style: TextStyle(fontSize: 9, color: AppColors.red, fontWeight: FontWeight.w700)),
                  ]),
                ),
              ]),
              const SizedBox(height: 8),
              Text(room.name, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700),
                maxLines: 2, overflow: TextOverflow.ellipsis),
              const Spacer(),
              Row(children: [
                const Icon(Icons.people_outline, size: 12, color: AppColors.textMuted),
                const SizedBox(width: 4),
                Text('${room.members}', style: const TextStyle(fontSize: 11, color: AppColors.textMuted)),
                const Spacer(),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: AppColors.glassPurple,
                    borderRadius: BorderRadius.circular(999),
                  ),
                  child: const Text('دخول', style: TextStyle(fontSize: 9, color: AppColors.purpleLight, fontWeight: FontWeight.w700)),
                ),
              ]),
            ]),
          ),
        ]),
      ),
    );
  }
}

class _HostCard extends StatelessWidget {
  final UserModel host;
  final int rank;
  const _HostCard({required this.host, required this.rank});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 100,
      margin: const EdgeInsets.only(left: 10),
      decoration: BoxDecoration(
        color: AppColors.bgCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.borderDefault),
      ),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Stack(alignment: Alignment.topLeft, children: [
            Text(host.avatar, style: const TextStyle(fontSize: 32)),
            Container(
              padding: const EdgeInsets.all(2),
              decoration: const BoxDecoration(color: AppColors.bgPrimary, shape: BoxShape.circle),
              child: Text(rank <= 3 ? ['🥇','🥈','🥉'][rank-1] : '#$rank',
                style: const TextStyle(fontSize: 11)),
            ),
          ]),
          const SizedBox(height: 6),
          Text(host.name.split(' ')[0], style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700),
            textAlign: TextAlign.center, overflow: TextOverflow.ellipsis),
          const SizedBox(height: 4),
          VipBadge(vip: host.vip),
        ]),
      ),
    );
  }
}

class _ShimmerOverlay extends StatefulWidget {
  const _ShimmerOverlay();
  @override State<_ShimmerOverlay> createState() => _ShimmerOverlayState();
}

class _ShimmerOverlayState extends State<_ShimmerOverlay> with SingleTickerProviderStateMixin {
  late AnimationController _ctrl;
  late Animation<double> _anim;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 1800))..repeat();
    _anim = _ctrl.drive(Tween(begin: -1.0, end: 2.0));
  }

  @override
  void dispose() { _ctrl.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _anim,
      builder: (_, __) => Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment(_anim.value - 1, 0),
            end: Alignment(_anim.value, 0),
            colors: [Colors.transparent, Colors.white.withOpacity(0.12), Colors.transparent],
          ),
        ),
      ),
    );
  }
}
