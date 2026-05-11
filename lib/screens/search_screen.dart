import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/app_data.dart';
import '../widgets/bottom_nav.dart';
import '../widgets/vip_badge.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});
  @override State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final _ctrl = TextEditingController();
  String _query = '';
  int _filter = 0;

  @override
  void dispose() { _ctrl.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return MainScaffold(
      currentIndex: 1,
      body: Column(children: [
        // Header
        Container(
          color: AppColors.bgSecondary,
          padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top + 10, left: 16, right: 16, bottom: 14),
          child: Column(children: [
            const Align(alignment: Alignment.centerRight, child: Text('🔍 البحث', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800))),
            const SizedBox(height: 12),
            TextField(
              controller: _ctrl,
              onChanged: (v) => setState(() => _query = v),
              style: const TextStyle(fontSize: 14),
              decoration: InputDecoration(
                hintText: 'ابحث عن غرف · مستخدمين · تاقات...',
                prefixIcon: const Icon(Icons.search, color: AppColors.textMuted),
                suffixIcon: _query.isNotEmpty
                  ? IconButton(icon: const Icon(Icons.clear, size: 18), onPressed: () { _ctrl.clear(); setState(() => _query = ''); })
                  : null,
              ),
            ),
            const SizedBox(height: 10),
            // Filter pills
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(children: ['الكل','غرف','مستخدمين','تاقات'].asMap().entries.map((e) => GestureDetector(
                onTap: () => setState(() => _filter = e.key),
                child: Container(
                  margin: const EdgeInsets.only(left: 8),
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                  decoration: BoxDecoration(
                    color: _filter == e.key ? AppColors.purplePrimary : AppColors.bgElevated,
                    borderRadius: BorderRadius.circular(999),
                    border: Border.all(color: _filter == e.key ? AppColors.purplePrimary : AppColors.borderDefault),
                  ),
                  child: Text(e.value, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: _filter == e.key ? Colors.white : AppColors.textSecondary)),
                ),
              )).toList()),
            ),
          ]),
        ),

        Expanded(child: _query.isEmpty ? _buildTrending() : _buildResults()),
      ]),
    );
  }

  Widget _buildTrending() => ListView(padding: const EdgeInsets.all(16), children: [
    const Text('🔥 الأكثر بحثاً', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800)),
    const SizedBox(height: 12),
    Wrap(spacing: 8, runSpacing: 8, children: ['#موسيقى','#خليج','#رومانسية','#ألعاب','#دردشة','#صوت','#طرب','#ترفيه','#شعر','#كوميديا']
      .map((t) => GestureDetector(
        onTap: () { _ctrl.text = t; setState(() => _query = t); },
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
          decoration: BoxDecoration(
            color: AppColors.bgCard,
            borderRadius: BorderRadius.circular(999),
            border: Border.all(color: AppColors.borderDefault),
          ),
          child: Text(t, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
        ),
      )).toList()),
    const SizedBox(height: 24),
    const Text('🎵 غرف موصى بها', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800)),
    const SizedBox(height: 12),
    ...AppData.rooms.take(3).map((r) => _RoomRow(room: r)),
    const SizedBox(height: 24),
    const Text('⭐ مستخدمون موصى بهم', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800)),
    const SizedBox(height: 12),
    ...AppData.hosts.take(3).map((h) => _UserRow(user: h)),
  ]);

  Widget _buildResults() {
    final rooms = AppData.rooms.where((r) => r.name.contains(_query) || r.tags.any((t) => t.contains(_query))).toList();
    final users = AppData.hosts.where((h) => h.name.contains(_query)).toList();
    return ListView(padding: const EdgeInsets.all(16), children: [
      if (rooms.isNotEmpty) ...[
        Text('غرف (${rooms.length})', style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: AppColors.textSecondary)),
        const SizedBox(height: 8),
        ...rooms.map((r) => _RoomRow(room: r)),
        const SizedBox(height: 16),
      ],
      if (users.isNotEmpty) ...[
        Text('مستخدمون (${users.length})', style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: AppColors.textSecondary)),
        const SizedBox(height: 8),
        ...users.map((h) => _UserRow(user: h)),
      ],
      if (rooms.isEmpty && users.isEmpty)
        const Center(child: Padding(padding: EdgeInsets.only(top: 60),
          child: Text('لم يتم العثور على نتائج', style: TextStyle(color: AppColors.textMuted)))),
    ]);
  }
}

class _RoomRow extends StatelessWidget {
  final RoomModel room;
  const _RoomRow({required this.room});
  @override
  Widget build(BuildContext context) => GestureDetector(
    onTap: () => Navigator.pushNamed(context, '/room', arguments: {'roomId': room.id}),
    child: Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(color: AppColors.bgCard, borderRadius: BorderRadius.circular(14), border: Border.all(color: AppColors.borderDefault)),
      child: Row(children: [
        Text(room.bg, style: const TextStyle(fontSize: 28)),
        const SizedBox(width: 12),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(room.name, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700), overflow: TextOverflow.ellipsis),
          Text('${room.members} مستخدم · ${room.tags.join(', ')}', style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
        ])),
        const Icon(Icons.chevron_right, color: AppColors.textMuted, size: 18),
      ]),
    ),
  );
}

class _UserRow extends StatelessWidget {
  final UserModel user;
  const _UserRow({required this.user});
  @override
  Widget build(BuildContext context) => Container(
    margin: const EdgeInsets.only(bottom: 8),
    padding: const EdgeInsets.all(12),
    decoration: BoxDecoration(color: AppColors.bgCard, borderRadius: BorderRadius.circular(14), border: Border.all(color: AppColors.borderDefault)),
    child: Row(children: [
      Text(user.avatar, style: const TextStyle(fontSize: 26)),
      const SizedBox(width: 12),
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(user.name, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700)),
        Text('مستوى ${user.level} · ${user.coins.toString()} عملة', style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
      ])),
      VipBadge(vip: user.vip),
    ]),
  );
}
