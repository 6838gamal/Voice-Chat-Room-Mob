import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class MainScaffold extends StatefulWidget {
  final Widget body;
  final int currentIndex;
  const MainScaffold({super.key, required this.body, required this.currentIndex});

  @override State<MainScaffold> createState() => _MainScaffoldState();
}

class _MainScaffoldState extends State<MainScaffold> {
  static const _items = [
    {'icon': Icons.home_rounded,           'label': 'الرئيسية',  'route': '/home'},
    {'icon': Icons.search_rounded,          'label': 'بحث',       'route': '/search'},
    {'icon': Icons.chat_bubble_rounded,     'label': 'رسائل',     'route': '/messages'},
    {'icon': Icons.notifications_rounded,   'label': 'إشعارات',   'route': '/notifications'},
    {'icon': Icons.person_rounded,          'label': 'حسابي',     'route': '/profile'},
  ];

  void _onTap(int idx) {
    if (idx == widget.currentIndex) return;
    Navigator.pushReplacementNamed(context, _items[idx]['route'] as String);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgPrimary,
      body: widget.body,
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: AppColors.bgSecondary,
          border: const Border(top: BorderSide(color: AppColors.borderDefault)),
          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.4), blurRadius: 20, offset: const Offset(0, -4))],
        ),
        child: SafeArea(
          child: SizedBox(
            height: 60,
            child: Row(
              children: List.generate(_items.length, (i) {
                final active = i == widget.currentIndex;
                return Expanded(
                  child: GestureDetector(
                    onTap: () => _onTap(i),
                    behavior: HitTestBehavior.opaque,
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                        if (active)
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                            decoration: BoxDecoration(
                              color: AppColors.purplePrimary.withOpacity(0.2),
                              borderRadius: BorderRadius.circular(20),
                              border: Border.all(color: AppColors.purplePrimary.withOpacity(0.4)),
                            ),
                            child: Row(mainAxisSize: MainAxisSize.min, children: [
                              Icon(_items[i]['icon'] as IconData, size: 18, color: AppColors.purpleLight),
                              const SizedBox(width: 4),
                              Text(_items[i]['label'] as String,
                                style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: AppColors.purpleLight)),
                            ]),
                          )
                        else
                          Icon(_items[i]['icon'] as IconData, size: 22, color: AppColors.textMuted),
                      ]),
                    ),
                  ),
                );
              }),
            ),
          ),
        ),
      ),
    );
  }
}
