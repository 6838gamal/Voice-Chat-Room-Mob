import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/app_data.dart';
import '../widgets/bottom_nav.dart';
import '../widgets/vip_badge.dart';

class MessagesScreen extends StatelessWidget {
  const MessagesScreen({super.key});

  static final _chats = [
    {'user':'نورة الأمير','avatar':'👸','vip':'svip-6','msg':'كيف حالك اليوم؟ 🌸','time':'الآن','unread':3,'online':true},
    {'user':'خالد المطير','avatar':'🤴','vip':'svip-5','msg':'شفت الغرفة الجديدة؟','time':'5د','unread':0,'online':true},
    {'user':'ريم الخليجية','avatar':'👩‍🎤','vip':'svip-4','msg':'تسلم على الهدية! 💎','time':'22د','unread':1,'online':false},
    {'user':'طارق الذهبي','avatar':'👨‍💼','vip':'vip-6','msg':'متى تدخل الغرفة؟','time':'1س','unread':0,'online':true},
    {'user':'سارة النجمة','avatar':'⭐','vip':'vip-5','msg':'يسلموا يا قلب 😊','time':'3س','unread':0,'online':false},
  ];

  @override
  Widget build(BuildContext context) {
    return MainScaffold(
      currentIndex: 2,
      body: Column(children: [
        Container(
          color: AppColors.bgSecondary,
          padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top + 10, left: 16, right: 16, bottom: 14),
          child: Column(children: [
            const Row(children: [
              Text('💬 رسائلي', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
              Spacer(),
              Icon(Icons.edit_outlined, size: 22, color: AppColors.purpleLight),
            ]),
            const SizedBox(height: 12),
            // Online strip
            SizedBox(
              height: 64,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: AppData.hosts.length,
                itemBuilder: (_, i) {
                  final h = AppData.hosts[i];
                  return Padding(
                    padding: const EdgeInsets.only(left: 14),
                    child: Column(mainAxisSize: MainAxisSize.min, children: [
                      Stack(children: [
                        Text(h.avatar, style: const TextStyle(fontSize: 32)),
                        Positioned(bottom: 0, left: 0, child: Container(width: 10, height: 10,
                          decoration: BoxDecoration(color: AppColors.green, shape: BoxShape.circle, border: Border.all(color: AppColors.bgSecondary, width: 2)))),
                      ]),
                      const SizedBox(height: 2),
                      Text(h.name.split(' ')[0], style: const TextStyle(fontSize: 9, color: AppColors.textSecondary), overflow: TextOverflow.ellipsis),
                    ]),
                  );
                },
              ),
            ),
          ]),
        ),
        Expanded(
          child: ListView.builder(
            itemCount: _chats.length,
            itemBuilder: (ctx, i) {
              final c = _chats[i];
              final unread = c['unread'] as int;
              return GestureDetector(
                onTap: () => _openChat(ctx, c),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  decoration: BoxDecoration(
                    border: Border(bottom: BorderSide(color: AppColors.borderDefault.withOpacity(0.5))),
                  ),
                  child: Row(children: [
                    Stack(children: [
                      Container(
                        width: 52, height: 52,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: (c['vip'] as String).startsWith('svip') ? AppColors.goldBright : AppColors.purpleLight, width: 2),
                        ),
                        child: Center(child: Text(c['avatar'] as String, style: const TextStyle(fontSize: 26))),
                      ),
                      if (c['online'] as bool)
                        Positioned(bottom: 1, left: 1, child: Container(width: 12, height: 12,
                          decoration: BoxDecoration(color: AppColors.green, shape: BoxShape.circle, border: Border.all(color: AppColors.bgPrimary, width: 2)))),
                    ]),
                    const SizedBox(width: 12),
                    Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Row(children: [
                        Text(c['user'] as String, style: TextStyle(fontSize: 14, fontWeight: unread > 0 ? FontWeight.w800 : FontWeight.w600)),
                        const SizedBox(width: 6),
                        VipBadge(vip: c['vip'] as String, fontSize: 8),
                      ]),
                      const SizedBox(height: 2),
                      Text(c['msg'] as String, style: TextStyle(fontSize: 12, color: unread > 0 ? AppColors.textPrimary : AppColors.textSecondary), overflow: TextOverflow.ellipsis),
                    ])),
                    Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
                      Text(c['time'] as String, style: const TextStyle(fontSize: 10, color: AppColors.textMuted)),
                      const SizedBox(height: 4),
                      if (unread > 0) Container(
                        width: 20, height: 20,
                        decoration: const BoxDecoration(color: AppColors.purplePrimary, shape: BoxShape.circle),
                        child: Center(child: Text('$unread', style: const TextStyle(fontSize: 10, color: Colors.white, fontWeight: FontWeight.w800))),
                      ),
                    ]),
                  ]),
                ),
              );
            },
          ),
        ),
      ]),
    );
  }

  void _openChat(BuildContext context, Map chat) {
    final msgs = <Map>[
      {'from': 'other', 'msg': 'أهلاً يا صديقي! كيف حالك؟', 'time': '10:00'},
      {'from': 'me',    'msg': 'الحمد لله بخير! وأنت؟',      'time': '10:01'},
      {'from': 'other', 'msg': chat['msg'],                   'time': '10:05'},
    ];
    final ctrl = TextEditingController();
    final msgsNotifier = ValueNotifier(List.of(msgs));

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.bgSecondary,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (_) => DraggableScrollableSheet(
        initialChildSize: 0.92,
        minChildSize: 0.5,
        maxChildSize: 0.97,
        expand: false,
        builder: (_, scrollCtrl) => Column(children: [
          // Header
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(children: [
              Text(chat['avatar'] as String, style: const TextStyle(fontSize: 28)),
              const SizedBox(width: 10),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(chat['user'] as String, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w800)),
                Text((chat['online'] as bool) ? '🟢 متصل الآن' : '⚫ غير متصل', style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
              ])),
              IconButton(icon: const Icon(Icons.close, color: AppColors.textSecondary), onPressed: () => Navigator.pop(context)),
            ]),
          ),
          const Divider(color: AppColors.borderDefault, height: 1),
          // Chat
          Expanded(
            child: ValueListenableBuilder<List<Map>>(
              valueListenable: msgsNotifier,
              builder: (_, list, __) => ListView.builder(
                controller: scrollCtrl,
                padding: const EdgeInsets.all(14),
                itemCount: list.length,
                itemBuilder: (_, i) {
                  final m = list[i];
                  final isMe = m['from'] == 'me';
                  return Align(
                    alignment: isMe ? Alignment.centerLeft : Alignment.centerRight,
                    child: Container(
                      margin: const EdgeInsets.only(bottom: 10),
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                      constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.7),
                      decoration: BoxDecoration(
                        color: isMe ? AppColors.purplePrimary : AppColors.bgElevated,
                        borderRadius: BorderRadius.circular(18),
                      ),
                      child: Text(m['msg'] as String, style: const TextStyle(fontSize: 13)),
                    ),
                  );
                },
              ),
            ),
          ),
          // Input
          Padding(
            padding: EdgeInsets.only(left: 12, right: 12, bottom: MediaQuery.of(context).viewInsets.bottom + 12, top: 8),
            child: Row(children: [
              Expanded(child: TextField(
                controller: ctrl,
                decoration: InputDecoration(
                  hintText: 'اكتب رسالة...',
                  isDense: true,
                  contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(999), borderSide: const BorderSide(color: AppColors.borderDefault)),
                  enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(999), borderSide: const BorderSide(color: AppColors.borderDefault)),
                  focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(999), borderSide: const BorderSide(color: AppColors.purplePrimary)),
                  filled: true, fillColor: AppColors.bgElevated,
                ),
              )),
              const SizedBox(width: 8),
              GestureDetector(
                onTap: () {
                  if (ctrl.text.trim().isEmpty) return;
                  msgsNotifier.value = [...msgsNotifier.value, {'from':'me','msg':ctrl.text,'time':'الآن'}];
                  ctrl.clear();
                },
                child: Container(
                  width: 40, height: 40,
                  decoration: const BoxDecoration(color: AppColors.purplePrimary, shape: BoxShape.circle),
                  child: const Icon(Icons.send, size: 18, color: Colors.white),
                ),
              ),
            ]),
          ),
        ]),
      ),
    );
  }
}
