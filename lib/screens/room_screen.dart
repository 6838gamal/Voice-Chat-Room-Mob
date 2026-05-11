import 'dart:math';
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/app_data.dart';
import '../widgets/vip_badge.dart';

class RoomScreen extends StatefulWidget {
  final String roomId;
  const RoomScreen({super.key, required this.roomId});
  @override State<RoomScreen> createState() => _RoomScreenState();
}

class _RoomScreenState extends State<RoomScreen> with TickerProviderStateMixin {
  bool _muted = false, _handRaised = false;
  int _tab = 0;
  final _chatCtrl = TextEditingController();
  late AnimationController _speakCtrl, _giftCtrl;
  late Animation<double> _speakAnim;
  List<Map<String, dynamic>> _chatMsgs = List.from(AppData.chatMessages);
  List<_GiftFly> _flyingGifts = [];

  late RoomModel _room;

  @override
  void initState() {
    super.initState();
    _room = AppData.rooms.firstWhere((r) => r.id == widget.roomId, orElse: () => AppData.rooms[0]);
    _speakCtrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 800))..repeat(reverse: true);
    _giftCtrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 2200));
    _speakAnim = CurvedAnimation(parent: _speakCtrl, curve: Curves.easeInOut).drive(Tween(begin: 1.0, end: 1.15));
  }

  @override
  void dispose() {
    _speakCtrl.dispose(); _giftCtrl.dispose(); _chatCtrl.dispose();
    super.dispose();
  }

  void _sendGift(GiftModel g) {
    Navigator.pop(context);
    setState(() {
      _flyingGifts.add(_GiftFly(gift: g, sender: 'أنت', id: DateTime.now().millisecondsSinceEpoch));
      _chatMsgs.add({'user': 'أنت', 'avatar': '🧑', 'msg': 'أرسل ${g.emoji} ${g.name}', 'vip': 'vip-3'});
    });
    Future.delayed(const Duration(milliseconds: 2500), () {
      if (mounted) setState(() => _flyingGifts.removeWhere((f) => f.sender == 'أنت'));
    });
  }

  void _sendMsg() {
    if (_chatCtrl.text.trim().isEmpty) return;
    setState(() {
      _chatMsgs.add({'user': 'أنت', 'avatar': '🧑', 'msg': _chatCtrl.text, 'vip': 'vip-3'});
      _chatCtrl.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgPrimary,
      body: Stack(children: [
        // Background glow
        Positioned(top: 0, left: 0, right: 0, height: 300,
          child: Container(
            decoration: BoxDecoration(
              gradient: RadialGradient(
                center: Alignment.topCenter,
                radius: 1,
                colors: [AppColors.purplePrimary.withOpacity(0.2), Colors.transparent],
              ),
            ),
          ),
        ),

        // Main content
        Column(children: [
          _buildHeader(),
          _buildRoomEmoji(),
          _buildSeats(),
          _buildBottomPanel(),
        ]),

        // Flying gifts overlay
        ..._flyingGifts.map((f) => _GiftFlyWidget(fly: f)),
      ]),
    );
  }

  Widget _buildHeader() {
    return Container(
      color: AppColors.bgSecondary.withOpacity(0.8),
      padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top + 8, left: 16, right: 16, bottom: 12),
      child: Row(children: [
        GestureDetector(
          onTap: () => Navigator.pop(context),
          child: Container(
            width: 36, height: 36,
            decoration: BoxDecoration(
              color: AppColors.glassBg,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: AppColors.borderDefault),
            ),
            child: const Icon(Icons.arrow_forward_ios, size: 16, color: AppColors.textPrimary),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(_room.name, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w800),
            overflow: TextOverflow.ellipsis),
          Row(children: [
            Container(width: 6, height: 6, decoration: const BoxDecoration(color: AppColors.red, shape: BoxShape.circle)),
            const SizedBox(width: 4),
            Text('${_room.members} مستخدم · مباشر', style: const TextStyle(fontSize: 10, color: AppColors.textSecondary)),
          ]),
        ])),
        GestureDetector(
          onTap: () => Navigator.pushNamed(context, '/store'),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
            decoration: BoxDecoration(
              gradient: AppGradients.gold,
              borderRadius: BorderRadius.circular(20),
            ),
            child: const Text('💎 إشحن', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: Colors.black)),
          ),
        ),
        const SizedBox(width: 10),
        const Icon(Icons.more_vert, color: AppColors.textSecondary),
      ]),
    );
  }

  Widget _buildRoomEmoji() {
    return SizedBox(
      height: 70,
      child: Stack(children: [
        Center(child: Text(_room.bg, style: const TextStyle(fontSize: 50))),
        Positioned.fill(child: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter, end: Alignment.bottomCenter,
              colors: [Colors.transparent, AppColors.bgPrimary],
            ),
          ),
        )),
        Positioned(bottom: 8, left: 16,
          child: Wrap(spacing: 6, children: _room.tags.map((t) => Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
            decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.5),
              borderRadius: BorderRadius.circular(999),
            ),
            child: Text('#$t', style: const TextStyle(fontSize: 9, color: AppColors.textSecondary)),
          )).toList()),
        ),
      ]),
    );
  }

  Widget _buildSeats() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(children: [
        // Host seat
        _SeatWidget(seat: AppData.seats[0], isHost: true, speakAnim: _speakAnim),
        const SizedBox(height: 12),
        // Other seats grid
        GridView.count(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisCount: 4,
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          childAspectRatio: 0.85,
          children: AppData.seats.skip(1).map((s) => _SeatWidget(seat: s, speakAnim: _speakAnim)).toList(),
        ),
      ]),
    );
  }

  Widget _buildBottomPanel() {
    return Expanded(
      child: Container(
        decoration: BoxDecoration(
          color: AppColors.bgSecondary.withOpacity(0.95),
          border: const Border(top: BorderSide(color: AppColors.borderDefault)),
        ),
        child: Column(children: [
          // Tabs
          Container(
            decoration: const BoxDecoration(border: Border(bottom: BorderSide(color: AppColors.borderDefault))),
            child: Row(
              children: [
                _tab_(0, '💬 دردشة'),
                _tab_(1, '👥 أعضاء'),
                _tab_(2, '🎁 هدايا'),
              ],
            ),
          ),

          // Content
          Expanded(child: _tab == 0 ? _buildChat() : _tab == 1 ? _buildMembers() : _buildGiftsGrid()),

          // Chat input
          if (_tab == 0)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              child: Row(children: [
                Expanded(child: TextField(
                  controller: _chatCtrl,
                  style: const TextStyle(fontSize: 13),
                  decoration: InputDecoration(
                    hintText: 'اكتب رسالة...',
                    contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                    isDense: true,
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(999), borderSide: const BorderSide(color: AppColors.borderDefault)),
                    enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(999), borderSide: const BorderSide(color: AppColors.borderDefault)),
                    focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(999), borderSide: const BorderSide(color: AppColors.purplePrimary)),
                    filled: true, fillColor: AppColors.bgElevated,
                  ),
                  onSubmitted: (_) => _sendMsg(),
                )),
                const SizedBox(width: 8),
                GestureDetector(
                  onTap: _sendMsg,
                  child: Container(
                    width: 36, height: 36,
                    decoration: const BoxDecoration(color: AppColors.purplePrimary, shape: BoxShape.circle),
                    child: const Icon(Icons.send, size: 16, color: Colors.white),
                  ),
                ),
              ]),
            ),

          // Controls
          _buildControls(),
        ]),
      ),
    );
  }

  Widget _tab_(int idx, String label) => Expanded(
    child: GestureDetector(
      onTap: () => setState(() => _tab = idx),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10),
        decoration: BoxDecoration(
          border: Border(bottom: BorderSide(
            color: _tab == idx ? AppColors.purplePrimary : Colors.transparent,
            width: 2,
          )),
        ),
        child: Text(label, textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 12, fontWeight: FontWeight.w700,
            color: _tab == idx ? AppColors.purpleLight : AppColors.textMuted,
          ),
        ),
      ),
    ),
  );

  Widget _buildChat() {
    return ListView.builder(
      padding: const EdgeInsets.all(10),
      itemCount: _chatMsgs.length,
      itemBuilder: (_, i) {
        final m = _chatMsgs[i];
        return Padding(
          padding: const EdgeInsets.only(bottom: 8),
          child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(m['avatar'] ?? '👤', style: const TextStyle(fontSize: 18)),
            const SizedBox(width: 8),
            Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                Text(m['user'] ?? '', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.purpleLight)),
                if ((m['vip'] ?? '').isNotEmpty) ...[
                  const SizedBox(width: 4),
                  VipBadge(vip: m['vip']),
                ],
              ]),
              Text(m['msg'] ?? '', style: const TextStyle(fontSize: 12, color: AppColors.textPrimary)),
            ])),
          ]),
        );
      },
    );
  }

  Widget _buildMembers() {
    return ListView(
      padding: const EdgeInsets.all(10),
      children: AppData.seats.where((s) => s.user != null).map((s) => ListTile(
        dense: true,
        leading: Text(s.user!.avatar, style: const TextStyle(fontSize: 24)),
        title: Text(s.user!.name, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700)),
        trailing: Row(mainAxisSize: MainAxisSize.min, children: [
          VipBadge(vip: s.user!.vip),
          const SizedBox(width: 8),
          Icon(s.isMuted ? Icons.mic_off : Icons.mic, size: 16, color: s.isMuted ? AppColors.red : AppColors.green),
        ]),
      )).toList(),
    );
  }

  Widget _buildGiftsGrid() {
    return GridView.builder(
      padding: const EdgeInsets.all(8),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 4, mainAxisSpacing: 8, crossAxisSpacing: 8, childAspectRatio: 0.85,
      ),
      itemCount: AppData.gifts.length,
      itemBuilder: (_, i) {
        final g = AppData.gifts[i];
        return GestureDetector(
          onTap: () => _showGiftModal(),
          child: Container(
            decoration: BoxDecoration(
              color: AppColors.bgElevated,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppColors.borderDefault),
            ),
            child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
              Text(g.emoji, style: const TextStyle(fontSize: 24)),
              const SizedBox(height: 3),
              Text(g.name, style: const TextStyle(fontSize: 9, color: AppColors.textSecondary), textAlign: TextAlign.center),
              Text('🪙${g.price}', style: const TextStyle(fontSize: 9, color: AppColors.goldBright)),
            ]),
          ),
        );
      },
    );
  }

  void _showGiftModal() {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.bgSecondary,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (_) => Padding(
        padding: const EdgeInsets.all(20),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          Container(width: 40, height: 4, decoration: BoxDecoration(color: AppColors.borderDefault, borderRadius: BorderRadius.circular(2))),
          const SizedBox(height: 16),
          const Text('🎁 إرسال هدية', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800)),
          const SizedBox(height: 16),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 4, mainAxisSpacing: 10, crossAxisSpacing: 10, childAspectRatio: 0.8,
            ),
            itemCount: AppData.gifts.length,
            itemBuilder: (_, i) {
              final g = AppData.gifts[i];
              return GestureDetector(
                onTap: () => _sendGift(g),
                child: Container(
                  decoration: BoxDecoration(
                    color: AppColors.bgElevated,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: AppColors.borderDefault),
                  ),
                  child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                    Text(g.emoji, style: const TextStyle(fontSize: 26)),
                    const SizedBox(height: 2),
                    Text(g.name, style: const TextStyle(fontSize: 9, color: AppColors.textSecondary), textAlign: TextAlign.center),
                    Text('🪙${g.price}', style: const TextStyle(fontSize: 9, color: AppColors.goldBright)),
                  ]),
                ),
              );
            },
          ),
          const SizedBox(height: 8),
          Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
            const Text('رصيدك: 🪙 12,500', style: TextStyle(fontSize: 12, color: AppColors.textSecondary)),
            GestureDetector(
              onTap: () { Navigator.pop(context); Navigator.pushNamed(context, '/store'); },
              child: const Text('شحن 💳', style: TextStyle(fontSize: 12, color: AppColors.purpleLight, fontWeight: FontWeight.w700)),
            ),
          ]),
        ]),
      ),
    );
  }

  Widget _buildControls() {
    return Container(
      padding: EdgeInsets.only(left: 16, right: 16, top: 10, bottom: MediaQuery.of(context).padding.bottom + 10),
      decoration: const BoxDecoration(border: Border(top: BorderSide(color: AppColors.borderDefault))),
      child: Row(mainAxisAlignment: MainAxisAlignment.spaceAround, children: [
        _controlBtn(
          icon: _muted ? Icons.mic_off : Icons.mic,
          label: _muted ? 'إلغاء كتم' : 'كتم',
          color: _muted ? AppColors.red : AppColors.glassBg,
          borderColor: _muted ? AppColors.red : AppColors.borderDefault,
          onTap: () => setState(() => _muted = !_muted),
        ),
        _controlBtn(
          icon: Icons.pan_tool_outlined,
          label: 'رفع يد',
          color: _handRaised ? AppColors.glassGold : AppColors.glassBg,
          borderColor: _handRaised ? AppColors.goldPrimary : AppColors.borderDefault,
          onTap: () => setState(() => _handRaised = !_handRaised),
        ),
        _controlBtn(
          icon: Icons.card_giftcard,
          label: 'هدية',
          color: AppColors.glassGold,
          borderColor: AppColors.borderGold,
          onTap: _showGiftModal,
        ),
        _controlBtn(
          icon: Icons.favorite_border,
          label: 'قلوب',
          color: Colors.red.withOpacity(0.1),
          borderColor: AppColors.red.withOpacity(0.3),
          onTap: () {},
        ),
        _controlBtn(
          icon: Icons.exit_to_app,
          label: 'خروج',
          color: AppColors.red.withOpacity(0.1),
          borderColor: AppColors.red,
          iconColor: AppColors.red,
          onTap: () => Navigator.pop(context),
        ),
      ]),
    );
  }

  Widget _controlBtn({
    required IconData icon,
    required String label,
    required Color color,
    required Color borderColor,
    Color? iconColor,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Column(mainAxisSize: MainAxisSize.min, children: [
        Container(
          width: 46, height: 46,
          decoration: BoxDecoration(
            color: color, shape: BoxShape.circle,
            border: Border.all(color: borderColor, width: 1.5),
          ),
          child: Icon(icon, size: 20, color: iconColor ?? AppColors.textPrimary),
        ),
        const SizedBox(height: 3),
        Text(label, style: const TextStyle(fontSize: 9, color: AppColors.textSecondary)),
      ]),
    );
  }
}

class _SeatWidget extends StatelessWidget {
  final SeatModel seat;
  final bool isHost;
  final Animation<double> speakAnim;
  const _SeatWidget({required this.seat, this.isHost = false, required this.speakAnim});

  @override
  Widget build(BuildContext context) {
    final size = isHost ? 72.0 : 48.0;
    final fontSize = isHost ? 32.0 : 22.0;

    if (seat.user == null) {
      return GestureDetector(
        onTap: () {},
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          Container(
            width: size, height: size,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: AppColors.bgElevated,
              border: Border.all(color: AppColors.borderDefault, style: BorderStyle.solid),
            ),
            child: Icon(Icons.add, size: isHost ? 28 : 18, color: AppColors.textMuted),
          ),
          const SizedBox(height: 4),
          Text('مقعد ${seat.id}', style: const TextStyle(fontSize: 9, color: AppColors.textMuted)),
        ]),
      );
    }

    return GestureDetector(
      onTap: () {},
      child: Column(mainAxisSize: MainAxisSize.min, children: [
        AnimatedBuilder(
          animation: speakAnim,
          builder: (_, child) => Transform.scale(
            scale: seat.isSpeaking ? speakAnim.value : 1.0,
            child: Container(
              width: size, height: size,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: seat.isSpeaking ? AppColors.green : (seat.user!.vip.startsWith('svip') ? AppColors.goldBright : AppColors.purpleLight),
                  width: isHost ? 3 : 2,
                ),
                boxShadow: seat.isSpeaking ? [BoxShadow(color: AppColors.green.withOpacity(0.5), blurRadius: 12)] : null,
              ),
              child: Stack(alignment: Alignment.center, children: [
                Text(seat.user!.avatar, style: TextStyle(fontSize: fontSize)),
                if (isHost)
                  Positioned(top: -4, right: -4,
                    child: const Text('👑', style: TextStyle(fontSize: 14))),
                Positioned(bottom: 0, left: 0,
                  child: Container(
                    padding: const EdgeInsets.all(2),
                    decoration: const BoxDecoration(color: AppColors.bgPrimary, shape: BoxShape.circle),
                    child: Icon(seat.isMuted ? Icons.mic_off : Icons.mic,
                      size: 10,
                      color: seat.isMuted ? AppColors.red : AppColors.green,
                    ),
                  ),
                ),
              ]),
            ),
          ),
        ),
        const SizedBox(height: 4),
        Text(seat.user!.name.split(' ')[0],
          style: TextStyle(fontSize: isHost ? 12 : 9, fontWeight: FontWeight.w700),
          overflow: TextOverflow.ellipsis),
        VipBadge(vip: seat.user!.vip, fontSize: 7),
      ]),
    );
  }
}

class _GiftFly {
  final GiftModel gift;
  final String sender;
  final int id;
  _GiftFly({required this.gift, required this.sender, required this.id});
}

class _GiftFlyWidget extends StatefulWidget {
  final _GiftFly fly;
  const _GiftFlyWidget({required this.fly, super.key});
  @override State<_GiftFlyWidget> createState() => _GiftFlyWidgetState();
}

class _GiftFlyWidgetState extends State<_GiftFlyWidget> with SingleTickerProviderStateMixin {
  late AnimationController _ctrl;
  late Animation<double> _y, _opacity, _scale;
  double _left = 0;

  @override
  void initState() {
    super.initState();
    _left = 0.2 + Random().nextDouble() * 0.5;
    _ctrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 2200))..forward();
    _y       = _ctrl.drive(CurveTween(curve: Curves.easeOut)).drive(Tween(begin: 0.0, end: -200.0));
    _scale   = _ctrl.drive(CurveTween(curve: Curves.elasticOut)).drive(Tween(begin: 0.0, end: 1.0));
    _opacity = _ctrl.drive(CurveTween(curve: const Interval(0.7, 1.0))).drive(Tween(begin: 1.0, end: 0.0));
  }

  @override
  void dispose() { _ctrl.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Positioned(
      bottom: 160,
      left: MediaQuery.of(context).size.width * _left,
      child: AnimatedBuilder(
        animation: _ctrl,
        builder: (_, __) => Transform.translate(
          offset: Offset(0, _y.value),
          child: Opacity(
            opacity: 1.0 - _opacity.value,
            child: Transform.scale(
              scale: _scale.value,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: Colors.black.withOpacity(0.75),
                  borderRadius: BorderRadius.circular(999),
                  border: Border.all(color: Colors.white.withOpacity(0.15)),
                  boxShadow: [BoxShadow(color: AppColors.purplePrimary.withOpacity(0.4), blurRadius: 12)],
                ),
                child: Row(mainAxisSize: MainAxisSize.min, children: [
                  Text(widget.fly.gift.emoji, style: const TextStyle(fontSize: 20)),
                  const SizedBox(width: 6),
                  Text(widget.fly.gift.name, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
                  const SizedBox(width: 4),
                  Text('🪙${widget.fly.gift.price}', style: const TextStyle(fontSize: 11, color: AppColors.goldBright)),
                ]),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
