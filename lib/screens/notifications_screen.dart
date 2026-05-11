import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/bottom_nav.dart';
import '../widgets/vip_badge.dart';

class NotificationsScreen extends StatelessWidget {
  const NotificationsScreen({super.key});

  static final _notifs = [
    {'type':'gift',   'icon':'🎁', 'user':'نورة الأمير', 'vip':'svip-6', 'msg':'أرسلت لك هدية 👑 تاج',    'time':'الآن',  'read':false},
    {'type':'invite', 'icon':'🎤', 'user':'خالد المطير', 'vip':'svip-5', 'msg':'دعاك لغرفة موسيقى الطرب',  'time':'5د',    'read':false},
    {'type':'follow', 'icon':'➕', 'user':'ريم الخليجية','vip':'svip-4', 'msg':'بدأت بمتابعتك',             'time':'22د',   'read':true },
    {'type':'vip',    'icon':'💎', 'user':'النظام',       'vip':'',       'msg':'تمت ترقيتك إلى VIP 3 🎉',  'time':'1س',    'read':false},
    {'type':'gift',   'icon':'🎁', 'user':'طارق الذهبي', 'vip':'vip-6',  'msg':'أرسل لك هدية 🌹 وردة',     'time':'2س',    'read':true },
    {'type':'system', 'icon':'⭐', 'user':'صوتك',         'vip':'',       'msg':'حصلت على 500 نقطة XP!',    'time':'3س',    'read':true },
    {'type':'follow', 'icon':'➕', 'user':'سارة النجمة', 'vip':'vip-5',  'msg':'بدأت بمتابعتك',             'time':'يوم',  'read':true },
    {'type':'invite', 'icon':'🎮', 'user':'لاعب الذهب',  'vip':'vip-4',  'msg':'دعاك للعب سباق السيارات',   'time':'يوم',  'read':true },
  ];

  Color _typeColor(String t) {
    switch (t) {
      case 'gift':   return AppColors.goldBright;
      case 'invite': return AppColors.purpleLight;
      case 'follow': return AppColors.green;
      case 'vip':    return AppColors.goldPrimary;
      default:       return AppColors.blue;
    }
  }

  @override
  Widget build(BuildContext context) {
    final unread = _notifs.where((n) => !(n['read'] as bool)).length;
    return MainScaffold(
      currentIndex: 3,
      body: Column(children: [
        Container(
          color: AppColors.bgSecondary,
          padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top + 10, left: 16, right: 16, bottom: 14),
          child: Row(children: [
            const Text('🔔 الإشعارات', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
            const SizedBox(width: 8),
            if (unread > 0) Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(color: AppColors.purplePrimary, borderRadius: BorderRadius.circular(999)),
              child: Text('$unread جديد', style: const TextStyle(fontSize: 10, color: Colors.white, fontWeight: FontWeight.w700)),
            ),
            const Spacer(),
            const Text('تعليم الكل مقروء', style: TextStyle(fontSize: 11, color: AppColors.purpleLight)),
          ]),
        ),
        Expanded(
          child: ListView.builder(
            itemCount: _notifs.length,
            itemBuilder: (_, i) {
              final n = _notifs[i];
              final unread = !(n['read'] as bool);
              final color = _typeColor(n['type'] as String);
              return Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                decoration: BoxDecoration(
                  color: unread ? AppColors.glassPurple : Colors.transparent,
                  border: Border(bottom: BorderSide(color: AppColors.borderDefault.withOpacity(0.4))),
                ),
                child: Row(children: [
                  Stack(children: [
                    Container(
                      width: 48, height: 48,
                      decoration: BoxDecoration(
                        color: color.withOpacity(0.15),
                        shape: BoxShape.circle,
                        border: Border.all(color: color.withOpacity(0.4)),
                      ),
                      child: Center(child: Text(n['icon'] as String, style: const TextStyle(fontSize: 22))),
                    ),
                    if (unread)
                      Positioned(top: 0, left: 0, child: Container(width: 10, height: 10,
                        decoration: const BoxDecoration(color: AppColors.purplePrimary, shape: BoxShape.circle))),
                  ]),
                  const SizedBox(width: 12),
                  Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Row(children: [
                      Text(n['user'] as String, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700)),
                      const SizedBox(width: 5),
                      if ((n['vip'] as String).isNotEmpty) VipBadge(vip: n['vip'] as String, fontSize: 8),
                    ]),
                    const SizedBox(height: 2),
                    Text(n['msg'] as String, style: const TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                  ])),
                  Text(n['time'] as String, style: const TextStyle(fontSize: 10, color: AppColors.textMuted)),
                ]),
              );
            },
          ),
        ),
      ]),
    );
  }
}
