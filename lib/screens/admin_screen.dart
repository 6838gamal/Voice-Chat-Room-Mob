import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/app_data.dart';
import '../widgets/vip_badge.dart';

class AdminScreen extends StatefulWidget {
  const AdminScreen({super.key});
  @override State<AdminScreen> createState() => _AdminScreenState();
}

class _AdminScreenState extends State<AdminScreen> with SingleTickerProviderStateMixin {
  late TabController _tabs;

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
        leading: IconButton(icon: const Icon(Icons.arrow_back_ios), onPressed: () => Navigator.pop(context)),
        title: const Row(children: [
          Text('⚙️ لوحة الإدارة'),
          SizedBox(width: 8),
          _AdminBadge(),
        ]),
        bottom: TabBar(
          controller: _tabs,
          isScrollable: true,
          labelColor: AppColors.purpleLight,
          unselectedLabelColor: AppColors.textMuted,
          indicatorColor: AppColors.purplePrimary,
          tabs: const [Tab(text: '📊 إحصائيات'), Tab(text: '👥 المستخدمون'), Tab(text: '🏠 الغرف'), Tab(text: '🚨 النشاط')],
        ),
      ),
      body: TabBarView(controller: _tabs, children: [
        _buildStats(),
        _buildUsers(),
        _buildRooms(),
        _buildActivity(),
      ]),
    );
  }

  Widget _buildStats() => SingleChildScrollView(
    padding: const EdgeInsets.all(16),
    child: Column(children: [
      GridView.count(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        crossAxisCount: 2,
        mainAxisSpacing: 12,
        crossAxisSpacing: 12,
        childAspectRatio: 1.3,
        children: [
          _StatCard(label:'مستخدمون نشطون', value:'12,450', icon:'👥', color: AppColors.purpleLight),
          _StatCard(label:'غرف مباشرة',     value:'234',    icon:'🔴', color: AppColors.red),
          _StatCard(label:'إجمالي العملات', value:'5.2M',   icon:'🪙', color: AppColors.goldBright),
          _StatCard(label:'هدايا اليوم',    value:'8,900',  icon:'🎁', color: AppColors.green),
          _StatCard(label:'مستخدمو VIP',    value:'1,240',  icon:'👑', color: AppColors.goldPrimary),
          _StatCard(label:'وكالات نشطة',    value:'48',     icon:'🏢', color: AppColors.blue),
        ],
      ),
      const SizedBox(height: 20),
      // Revenue chart placeholder
      Container(
        width: double.infinity,
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(color: AppColors.bgCard, borderRadius: BorderRadius.circular(16), border: Border.all(color: AppColors.borderDefault)),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const Text('💰 إيرادات الأسبوع', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800)),
          const SizedBox(height: 16),
          SizedBox(
            height: 80,
            child: Row(crossAxisAlignment: CrossAxisAlignment.end, mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [0.4,0.6,0.45,0.8,0.7,0.9,1.0].asMap().entries.map((e) {
                final days = ['السبت','الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة'];
                return Column(mainAxisAlignment: MainAxisAlignment.end, children: [
                  Container(width: 28, height: 80*e.value, decoration: BoxDecoration(
                    gradient: AppGradients.purpleGold,
                    borderRadius: BorderRadius.circular(6),
                  )),
                  const SizedBox(height: 4),
                  Text(days[e.key], style: const TextStyle(fontSize: 8, color: AppColors.textMuted)),
                ]);
              }).toList(),
            ),
          ),
        ]),
      ),
    ]),
  );

  Widget _buildUsers() => ListView.builder(
    padding: const EdgeInsets.all(16),
    itemCount: AppData.hosts.length,
    itemBuilder: (_, i) {
      final h = AppData.hosts[i];
      return Container(
        margin: const EdgeInsets.only(bottom: 10),
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(color: AppColors.bgCard, borderRadius: BorderRadius.circular(14), border: Border.all(color: AppColors.borderDefault)),
        child: Row(children: [
          Text(h.avatar, style: const TextStyle(fontSize: 28)),
          const SizedBox(width: 12),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Text(h.name, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700)),
              const SizedBox(width: 6),
              VipBadge(vip: h.vip),
            ]),
            Text('مستوى ${h.level} · 🪙 ${h.coins}', style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
          ])),
          Column(children: [
            GestureDetector(
              onTap: () => _showAdminAction(context, h.name),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(color: AppColors.red.withOpacity(0.15), borderRadius: BorderRadius.circular(8), border: Border.all(color: AppColors.red.withOpacity(0.4))),
                child: const Text('حظر', style: TextStyle(fontSize: 10, color: AppColors.red, fontWeight: FontWeight.w700)),
              ),
            ),
          ]),
        ]),
      );
    },
  );

  Widget _buildRooms() => ListView.builder(
    padding: const EdgeInsets.all(16),
    itemCount: AppData.rooms.length,
    itemBuilder: (_, i) {
      final r = AppData.rooms[i];
      return Container(
        margin: const EdgeInsets.only(bottom: 10),
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(color: AppColors.bgCard, borderRadius: BorderRadius.circular(14), border: Border.all(color: AppColors.borderDefault)),
        child: Row(children: [
          Text(r.bg, style: const TextStyle(fontSize: 28)),
          const SizedBox(width: 12),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(r.name, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700), overflow: TextOverflow.ellipsis),
            Text('${r.members} مستخدم · ${r.tags.join(', ')}', style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
          ])),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(color: AppColors.red.withOpacity(0.15), borderRadius: BorderRadius.circular(8), border: Border.all(color: AppColors.red.withOpacity(0.4))),
            child: const Text('إغلاق', style: TextStyle(fontSize: 10, color: AppColors.red, fontWeight: FontWeight.w700)),
          ),
        ]),
      );
    },
  );

  Widget _buildActivity() {
    final events = [
      {'time':'الآن',   'icon':'🎁', 'msg':'نورة أرسلت هدية 👑 لـ خالد'},
      {'time':'2د',     'icon':'👑', 'msg':'طارق ترقى إلى VIP 5'},
      {'time':'5د',     'icon':'🔴', 'msg':'فُتحت غرفة جديدة: الطرب والأصالة'},
      {'time':'8د',     'icon':'❌', 'msg':'تم حظر مستخدم بسبب مخالفة'},
      {'time':'12د',    'icon':'💎', 'msg':'ريم اشترت SVIP 4 (400K عملة)'},
      {'time':'15د',    'icon':'🔔', 'msg':'إشعار نظام: تحديث منصة v2.1'},
      {'time':'22د',    'icon':'🎮', 'msg':'سباق السيارات: 2,100 لاعب نشط'},
    ];
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: events.length,
      itemBuilder: (_, i) {
        final e = events[i];
        return Container(
          margin: const EdgeInsets.only(bottom: 8),
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
          decoration: BoxDecoration(
            color: i == 0 ? AppColors.glassPurple : AppColors.bgCard,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: i == 0 ? AppColors.borderPurple : AppColors.borderDefault),
          ),
          child: Row(children: [
            Text(e['icon'] as String, style: const TextStyle(fontSize: 20)),
            const SizedBox(width: 12),
            Expanded(child: Text(e['msg'] as String, style: const TextStyle(fontSize: 12))),
            Text(e['time'] as String, style: const TextStyle(fontSize: 10, color: AppColors.textMuted)),
          ]),
        );
      },
    );
  }

  void _showAdminAction(BuildContext context, String name) {
    showDialog(context: context, builder: (_) => AlertDialog(
      backgroundColor: AppColors.bgCard,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      title: const Text('إجراء إداري', textAlign: TextAlign.center),
      content: Text('هل تريد حظر $name؟', textAlign: TextAlign.center),
      actions: [
        TextButton(onPressed: () => Navigator.pop(context), child: const Text('إلغاء', style: TextStyle(color: AppColors.textSecondary))),
        ElevatedButton(
          style: ElevatedButton.styleFrom(backgroundColor: AppColors.red),
          onPressed: () => Navigator.pop(context),
          child: const Text('تأكيد الحظر'),
        ),
      ],
    ));
  }
}

class _StatCard extends StatelessWidget {
  final String label, value, icon;
  final Color color;
  const _StatCard({required this.label, required this.value, required this.icon, required this.color});
  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(
      color: AppColors.bgCard,
      borderRadius: BorderRadius.circular(16),
      border: Border.all(color: color.withOpacity(0.3)),
    ),
    child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisAlignment: MainAxisAlignment.center, children: [
      Text(icon, style: const TextStyle(fontSize: 24)),
      const SizedBox(height: 8),
      Text(value, style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: color)),
      Text(label, style: const TextStyle(fontSize: 10, color: AppColors.textSecondary)),
    ]),
  );
}

class _AdminBadge extends StatelessWidget {
  const _AdminBadge();
  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
    decoration: BoxDecoration(color: AppColors.red.withOpacity(0.15), borderRadius: BorderRadius.circular(999), border: Border.all(color: AppColors.red.withOpacity(0.5))),
    child: const Text('ADMIN', style: TextStyle(fontSize: 9, color: AppColors.red, fontWeight: FontWeight.w800, letterSpacing: 1)),
  );
}
