class RoomModel {
  final String id, name, bg;
  final int members;
  final List<String> tags;
  final String gradient;
  const RoomModel({required this.id, required this.name, required this.bg,
    required this.members, required this.tags, required this.gradient});
}

class UserModel {
  final String id, name, avatar, vip;
  final int coins, level;
  const UserModel({required this.id, required this.name, required this.avatar,
    required this.vip, this.coins = 0, this.level = 1});
}

class SeatModel {
  final int id;
  final UserModel? user;
  final bool isMuted, isSpeaking;
  const SeatModel({required this.id, this.user, this.isMuted = false, this.isSpeaking = false});
}

class GiftModel {
  final String id, emoji, name;
  final int price;
  const GiftModel({required this.id, required this.emoji, required this.name, required this.price});
}

class AppData {
  static const currentUser = UserModel(
    id: 'me', name: 'أنا', avatar: '🧑', vip: 'vip-3', coins: 12500, level: 24,
  );

  static const rooms = [
    RoomModel(id:'r1', name:'🎵 غرفة الموسيقى والطرب', bg:'🎶', members:234,
      tags:['موسيقى','طرب','عود'], gradient:'linear-gradient(135deg,#4A0D8F,#7B2FBE)'),
    RoomModel(id:'r2', name:'💬 دردشة الخليج', bg:'🌙', members:189,
      tags:['خليج','سوالف','كيف'], gradient:'linear-gradient(135deg,#8B6914,#D4A017)'),
    RoomModel(id:'r3', name:'🎤 إذاعة صوتك', bg:'📻', members:312,
      tags:['إذاعة','أخبار','برامج'], gradient:'linear-gradient(135deg,#1a0040,#4A0D8F)'),
    RoomModel(id:'r4', name:'🌹 غرفة الرومانسية', bg:'💕', members:156,
      tags:['رومانسية','شعر','حب'], gradient:'linear-gradient(135deg,#7B003C,#D4006B)'),
    RoomModel(id:'r5', name:'🎮 ليلة الألعاب', bg:'🕹️', members:278,
      tags:['ألعاب','تحديات','فن'], gradient:'linear-gradient(135deg,#003D1F,#00854C)'),
    RoomModel(id:'r6', name:'☕ قهوة الصباح', bg:'🌄', members:98,
      tags:['صباح','قهوة','ترحيب'], gradient:'linear-gradient(135deg,#3D1A00,#854C00)'),
  ];

  static const hosts = [
    UserModel(id:'h1', name:'نورة الأمير',   avatar:'👸', vip:'svip-6', coins:980000, level:95),
    UserModel(id:'h2', name:'خالد المطير',   avatar:'🤴', vip:'svip-5', coins:756000, level:88),
    UserModel(id:'h3', name:'ريم الخليجية', avatar:'👩‍🎤', vip:'svip-4', coins:521000, level:82),
    UserModel(id:'h4', name:'طارق الذهبي',  avatar:'👨‍💼', vip:'vip-6',  coins:320000, level:76),
    UserModel(id:'h5', name:'سارة النجمة',  avatar:'⭐',   vip:'vip-5',  coins:198000, level:70),
  ];

  static final seats = [
    const SeatModel(id:1, user:UserModel(id:'h1',name:'نورة',avatar:'👸',vip:'svip-6'), isSpeaking:true),
    const SeatModel(id:2, user:UserModel(id:'h2',name:'خالد',avatar:'🤴',vip:'svip-4'), isMuted:false),
    const SeatModel(id:3, user:UserModel(id:'h3',name:'ريم',avatar:'👩',vip:'vip-6'), isMuted:true),
    const SeatModel(id:4, user:UserModel(id:'h4',name:'سعود',avatar:'👨',vip:'vip-3')),
    const SeatModel(id:5),
    const SeatModel(id:6, user:UserModel(id:'h5',name:'ليلى',avatar:'🧕',vip:'vip-2')),
    const SeatModel(id:7),
    const SeatModel(id:8),
    const SeatModel(id:9),
  ];

  static const gifts = [
    GiftModel(id:'g1',  emoji:'🌹', name:'وردة',       price:10),
    GiftModel(id:'g2',  emoji:'💐', name:'باقة زهور',  price:50),
    GiftModel(id:'g3',  emoji:'🍫', name:'شوكولاتة',   price:99),
    GiftModel(id:'g4',  emoji:'💎', name:'ماسة',        price:200),
    GiftModel(id:'g5',  emoji:'🏆', name:'كأس',         price:500),
    GiftModel(id:'g6',  emoji:'👑', name:'تاج',         price:1000),
    GiftModel(id:'g7',  emoji:'🚀', name:'صاروخ',       price:2000),
    GiftModel(id:'g8',  emoji:'🏰', name:'قصر',         price:5000),
    GiftModel(id:'g9',  emoji:'🌌', name:'مجرة',        price:10000),
    GiftModel(id:'g10', emoji:'🦋', name:'فراشة',       price:30),
    GiftModel(id:'g11', emoji:'⭐', name:'نجمة',        price:100),
    GiftModel(id:'g12', emoji:'🎵', name:'موسيقى',      price:150),
  ];

  static const vipLevels = [
    {'level':1,'name':'VIP 1','emoji':'🔮','price':500,  'color':0xFF9D4EDD,'perks':['إطار خاص','رمز مميز']},
    {'level':2,'name':'VIP 2','emoji':'💜','price':1500, 'color':0xFF7B2FBE,'perks':['دخولية متميزة','دردشة خاصة']},
    {'level':3,'name':'VIP 3','emoji':'✨','price':3000, 'color':0xFF6A0DAD,'perks':['مضاعفة النقاط','أيقونة مميزة']},
    {'level':4,'name':'VIP 4','emoji':'🔥','price':6000, 'color':0xFF5A0D9F,'perks':['غرفة خاصة','دعم أولوية']},
    {'level':5,'name':'VIP 5','emoji':'⚡','price':12000,'color':0xFF4A0D8F,'perks':['تأثيرات صوتية','شارة ذهبية']},
    {'level':6,'name':'VIP 6','emoji':'🌟','price':25000,'color':0xFF3A0D7F,'perks':['كل المميزات','دخولية ملكية']},
  ];

  static const svipLevels = [
    {'level':1,'name':'SVIP 1','emoji':'💫','price':50000, 'color':0xFFD4A017},
    {'level':2,'name':'SVIP 2','emoji':'🌙','price':100000,'color':0xFFE8B020},
    {'level':3,'name':'SVIP 3','emoji':'🌠','price':200000,'color':0xFFFFBF00},
    {'level':4,'name':'SVIP 4','emoji':'🌌','price':400000,'color':0xFFFFD700},
    {'level':5,'name':'SVIP 5','emoji':'👁️','price':800000,'color':0xFFE040FB},
    {'level':6,'name':'SVIP 6','emoji':'👑','price':2000000,'color':0xFFFFD700},
  ];

  static const games = [
    {'id':'g1','name':'مزرعة الذهب','emoji':'🌾','players':1240,'prize':'5000 🪙'},
    {'id':'g2','name':'تنين الحظ',  'emoji':'🐉','players':890, 'prize':'10000 🪙'},
    {'id':'g3','name':'سباق السيارات','emoji':'🏎️','players':2100,'prize':'3000 🪙'},
    {'id':'g4','name':'الصناديق',   'emoji':'📦','players':3400,'prize':'20000 🪙'},
    {'id':'g5','name':'صيد السمك',  'emoji':'🐟','players':760, 'prize':'2000 🪙'},
    {'id':'g6','name':'السلوتس',    'emoji':'🎰','players':5600,'prize':'50000 🪙'},
  ];

  static const chatMessages = [
    {'user':'نورة',   'avatar':'👸','msg':'أهلاً بالجميع 🌹',          'vip':'svip-6'},
    {'user':'خالد',   'avatar':'🤴','msg':'مرحباً يا أهل الخير!',       'vip':'svip-4'},
    {'user':'سعود',   'avatar':'👨','msg':'والله يسعدكم الجميع',        'vip':'vip-3'},
    {'user':'ليلى',   'avatar':'🧕','msg':'غرفتكم حلوة ما شاء الله 💜','vip':'vip-2'},
    {'user':'النظام', 'avatar':'⭐','msg':'طارق أرسل هدية 👑 تاج',    'vip':'',  },
    {'user':'ريم',    'avatar':'👩','msg':'يسلموا يا ناس الطيبين 😊',   'vip':'vip-6'},
  ];

  static const coinPackages = [
    {'coins':1000,  'price':'5.99\$',  'bonus':0,   'popular':false},
    {'coins':5000,  'price':'24.99\$', 'bonus':500, 'popular':true },
    {'coins':15000, 'price':'69.99\$', 'bonus':2000,'popular':false},
    {'coins':50000, 'price':'199.99\$','bonus':8000,'popular':false},
  ];

  static const agencies = [
    {'name':'وكالة النجوم',  'emoji':'⭐','members':45,'rank':1,'earnings':'450K'},
    {'name':'فريق الملوك',  'emoji':'👑','members':38,'rank':2,'earnings':'380K'},
    {'name':'بيت الفن',     'emoji':'🎨','members':52,'rank':3,'earnings':'310K'},
    {'name':'نخبة الخليج',  'emoji':'🌟','members':29,'rank':4,'earnings':'250K'},
  ];
}
