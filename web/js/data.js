// =============================================
// SAWTAK - Mock Data
// =============================================

const AppData = {
  currentUser: {
    id: 'u1',
    name: 'أحمد الريس',
    username: '@ahmed_alrais',
    avatar: '🧑‍💼',
    level: 42,
    vip: 'svip-3',
    coins: 85400,
    diamonds: 2350,
    followers: 1284,
    following: 342,
    agency: 'وكالة النجوم ⭐',
    bio: 'مضيف محترف | عاشق الموسيقى | هنا لنتسلى 🎵',
    country: '🇸🇦',
    gifts_received: 15840,
    online: true,
  },

  rooms: [
    { id: 'r1', name: 'ليالي الطرب 🎵', category: 'موسيقى', host: 'نورة السالم', hostAvatar: '👩', members: 284, maxMembers: 300, bg: '🎤', gradient: 'linear-gradient(135deg,#1a0533,#4A0D8F)', isLive: true, tags: ['موسيقى','طرب','عود'] },
    { id: 'r2', name: 'حكايا الليل ✨', category: 'دردشة', host: 'خالد العمري', hostAvatar: '👨‍🎤', members: 156, maxMembers: 200, bg: '🌙', gradient: 'linear-gradient(135deg,#0d1b2a,#1e3a5f)', isLive: true, tags: ['دردشة','قصص'] },
    { id: 'r3', name: 'نجوم الخليج 🌟', category: 'VIP', host: 'سارة المنصور', hostAvatar: '👸', members: 98, maxMembers: 100, bg: '⭐', gradient: 'linear-gradient(135deg,#2d1b00,#8B6914)', isLive: true, tags: ['VIP','خليجي'] },
    { id: 'r4', name: 'راحة بال 🕊️', category: 'استرخاء', host: 'محمد الزهراني', hostAvatar: '🧘', members: 67, maxMembers: 150, bg: '🌊', gradient: 'linear-gradient(135deg,#003333,#006660)', isLive: false, tags: ['هادئ','راحة'] },
    { id: 'r5', name: 'الروم الملكي 👑', category: 'SVIP', host: 'فهد الأمير', hostAvatar: '🤴', members: 45, maxMembers: 50, bg: '👑', gradient: 'linear-gradient(135deg,#1a0040,#7B2FBE)', isLive: true, tags: ['SVIP','ملكي','حصري'] },
    { id: 'r6', name: 'عزف ومزاج 🎸', category: 'موسيقى', host: 'ليلى حمد', hostAvatar: '🎸', members: 212, maxMembers: 250, bg: '🎸', gradient: 'linear-gradient(135deg,#1a0020,#6B0AC9)', isLive: true, tags: ['موسيقى','عزف'] },
  ],

  hosts: [
    { id: 'h1', name: 'نورة', avatar: '👩‍🎤', level: 58, vip: 'svip-6', coins: 284000, country: '🇸🇦', online: true },
    { id: 'h2', name: 'أنس', avatar: '🧑‍🎤', level: 52, vip: 'svip-4', coins: 198000, country: '🇦🇪', online: true },
    { id: 'h3', name: 'ريم', avatar: '👸', level: 47, vip: 'svip-5', coins: 156000, country: '🇰🇼', online: false },
    { id: 'h4', name: 'طارق', avatar: '🤴', level: 44, vip: 'vip-6', coins: 134000, country: '🇶🇦', online: true },
    { id: 'h5', name: 'هند', avatar: '👩‍💫', level: 40, vip: 'vip-5', coins: 98000, country: '🇧🇭', online: true },
    { id: 'h6', name: 'سعود', avatar: '👨‍💼', level: 38, vip: 'vip-4', coins: 76000, country: '🇴🇲', online: false },
  ],

  agencies: [
    { id: 'a1', name: 'وكالة النجوم', emoji: '⭐', hosts: 48, revenue: '2.4M', rank: 1, badge: 'الماسية', members: 2840 },
    { id: 'a2', name: 'وكالة الذهب', emoji: '🥇', hosts: 36, revenue: '1.8M', rank: 2, badge: 'ذهبية', members: 1920 },
    { id: 'a3', name: 'قمر التوب', emoji: '🌕', hosts: 29, revenue: '1.2M', rank: 3, badge: 'بلاتينية', members: 1540 },
    { id: 'a4', name: 'وكالة الفخر', emoji: '🏆', hosts: 22, revenue: '980K', rank: 4, badge: 'ذهبية', members: 1200 },
    { id: 'a5', name: 'نجوم الخليج', emoji: '🌟', hosts: 18, revenue: '720K', rank: 5, badge: 'فضية', members: 890 },
  ],

  gifts: [
    { id: 'g1', name: 'وردة', emoji: '🌹', price: 10, category: 'عادية' },
    { id: 'g2', name: 'قلب', emoji: '❤️', price: 20, category: 'عادية' },
    { id: 'g3', name: 'ماس', emoji: '💎', price: 100, category: 'خاصة' },
    { id: 'g4', name: 'تاج', emoji: '👑', price: 500, category: 'فاخرة' },
    { id: 'g5', name: 'يخت', emoji: '🛥️', price: 1000, category: 'فاخرة' },
    { id: 'g6', name: 'قصر', emoji: '🏰', price: 5000, category: 'ملكية' },
    { id: 'g7', name: 'طيارة', emoji: '✈️', price: 2000, category: 'فاخرة' },
    { id: 'g8', name: 'هدية', emoji: '🎁', price: 50, category: 'خاصة' },
    { id: 'g9', name: 'نجمة', emoji: '⭐', price: 80, category: 'خاصة' },
    { id: 'g10', name: 'كعكة', emoji: '🎂', price: 150, category: 'خاصة' },
    { id: 'g11', name: 'بالون', emoji: '🎈', price: 30, category: 'عادية' },
    { id: 'g12', name: 'مطر ذهب', emoji: '🌟', price: 10000, category: 'ملكية' },
  ],

  vipLevels: [
    { level: 'VIP 1', class: 'vip-1', icon: '🥉', coins: 1000, perks: ['إطار فضي','دخولية خاصة'] },
    { level: 'VIP 2', class: 'vip-2', icon: '🥈', coins: 5000, perks: ['إطار برونزي','تأثير دخولية','باج خاص'] },
    { level: 'VIP 3', class: 'vip-3', icon: '🥇', coins: 15000, perks: ['إطار ذهبي','تأثيرات خاصة','أولوية الكلام'] },
    { level: 'VIP 4', class: 'vip-4', icon: '💠', coins: 40000, perks: ['إطار أزرق','دخولية مضيئة','مزايا الدردشة'] },
    { level: 'VIP 5', class: 'vip-5', icon: '🔥', coins: 100000, perks: ['إطار ناري','دخولية انفجار','كل مزايا VIP 4'] },
    { level: 'VIP 6', class: 'vip-6', icon: '💜', coins: 250000, perks: ['إطار ملكي','تأثيرات حصرية','أعلى أولوية'] },
  ],

  svipLevels: [
    { level: 'SVIP 1', class: 'svip-1', icon: '🌙', coins: 500000, perks: ['إطار مميز','دخولية SVIP','مساعد شخصي'] },
    { level: 'SVIP 2', class: 'svip-2', icon: '✨', coins: 1000000, perks: ['كل مزايا SVIP 1','صلاحيات إضافية'] },
    { level: 'SVIP 3', class: 'svip-3', icon: '⚡', coins: 2000000, perks: ['تأثيرات سينمائية','إطار متحرك'] },
    { level: 'SVIP 4', class: 'svip-4', icon: '👁️', coins: 4000000, perks: ['تأثيرات ثلاثية الأبعاد','دخولية مذهلة'] },
    { level: 'SVIP 5', class: 'svip-5', icon: '🌌', coins: 8000000, perks: ['إطار كوني','تأثيرات مجرية'] },
    { level: 'SVIP 6', class: 'svip-6', icon: '👑', coins: 15000000, perks: ['الملك التاج','كل الامتيازات','دعم شخصي 24/7'] },
  ],

  games: [
    { id: 'gm1', name: 'المزرعة', emoji: '🌾', desc: 'زرع وحصد وتجارة', players: '2-6', color: '#2d5a27', gradient: 'linear-gradient(135deg,#1a4020,#2d7a24)' },
    { id: 'gm2', name: 'التنين والنمر', emoji: '🐉', desc: 'تحدي الحظ والمهارة', players: '2', color: '#8B0000', gradient: 'linear-gradient(135deg,#4a0000,#8B0000)' },
    { id: 'gm3', name: 'سباق السيارات', emoji: '🏎️', desc: 'تسابق وفز بالجوائز', players: '2-8', color: '#1a3a6b', gradient: 'linear-gradient(135deg,#0d1b2a,#1e3a5f)' },
    { id: 'gm4', name: 'الصناديق', emoji: '📦', desc: 'افتح وكسب الجوائز', players: '1+', color: '#4a2d00', gradient: 'linear-gradient(135deg,#2d1b00,#8B6914)' },
    { id: 'gm5', name: 'صيد السمك', emoji: '🎣', desc: 'استمتع بصيد السمك', players: '1-4', color: '#006060', gradient: 'linear-gradient(135deg,#003333,#006680)' },
    { id: 'gm6', name: 'السلوتس', emoji: '🎰', desc: 'العجلة الحظ الكبيرة', players: '1', color: '#4a0080', gradient: 'linear-gradient(135deg,#1a0040,#7B2FBE)' },
  ],

  roomSeats: [
    { id: 1, user: { name: 'نورة', avatar: '👩‍🎤', vip: 'svip-4' }, isMuted: false, isSpeaking: true, isHost: true },
    { id: 2, user: { name: 'خالد', avatar: '🧑‍💼', vip: 'vip-3' }, isMuted: true, isSpeaking: false, isHost: false },
    { id: 3, user: null },
    { id: 4, user: { name: 'ريم', avatar: '👸', vip: 'svip-2' }, isMuted: false, isSpeaking: false, isHost: false },
    { id: 5, user: null },
    { id: 6, user: { name: 'طارق', avatar: '🤴', vip: 'vip-5' }, isMuted: true, isSpeaking: false, isHost: false },
    { id: 7, user: null },
    { id: 8, user: { name: 'هند', avatar: '👩‍💫', vip: 'vip-4' }, isMuted: false, isSpeaking: true, isHost: false },
    { id: 9, user: { name: 'سعد', avatar: '👨', vip: 'vip-2' }, isMuted: false, isSpeaking: false, isHost: false },
  ],

  messages: [
    { id: 'm1', user: 'نورة السالم', avatar: '👩', msg: 'أهلاً بالجميع في الغرفة 🎉', time: '10:30', type: 'normal', vip: 'svip-4' },
    { id: 'm2', user: 'خالد العمري', avatar: '👨‍🎤', msg: 'شكراً يا نورة على الاستضافة ❤️', time: '10:31', type: 'normal', vip: 'vip-3' },
    { id: 'm3', user: 'ريم المطيري', avatar: '👸', msg: 'ماشاء الله صوت رائع 🎵', time: '10:32', type: 'gift', gift: '👑', giftName: 'تاج', vip: 'svip-2' },
    { id: 'm4', user: 'System', avatar: '⭐', msg: 'طارق انضم للغرفة بدخولية SVIP', time: '10:33', type: 'system' },
    { id: 'm5', user: 'هند القحطاني', avatar: '👩‍💫', msg: 'أحبكم جميعاً 💜', time: '10:34', type: 'normal', vip: 'vip-4' },
    { id: 'm6', user: 'سعد الغامدي', avatar: '👨', msg: 'متى تبدأ الأغاني؟', time: '10:35', type: 'normal', vip: 'vip-2' },
  ],

  notifications: [
    { id: 'n1', type: 'gift', msg: 'نورة أرسلت لك تاجاً ذهبياً 👑', time: '5 دقائق', read: false, avatar: '👩‍🎤' },
    { id: 'n2', type: 'invite', msg: 'خالد يدعوك لغرفة ليالي الطرب', time: '15 دقيقة', read: false, avatar: '👨‍🎤' },
    { id: 'n3', type: 'follow', msg: 'ريم المطيري بدأت تتابعك', time: '1 ساعة', read: false, avatar: '👸' },
    { id: 'n4', type: 'vip', msg: 'تمت ترقيتك إلى SVIP 3 🎊', time: '2 ساعة', read: true, avatar: '⭐' },
    { id: 'n5', type: 'message', msg: 'رسالة جديدة من طارق الأمير', time: '3 ساعات', read: true, avatar: '🤴' },
    { id: 'n6', type: 'system', msg: 'تم قبول طلبك للانضمام لوكالة النجوم', time: '1 يوم', read: true, avatar: '⭐' },
  ],

  chatList: [
    { id: 'c1', name: 'نورة السالم', avatar: '👩‍🎤', lastMsg: 'شكراً جزيلاً يا بطل 🌹', time: '10:45', unread: 3, online: true, vip: 'svip-4' },
    { id: 'c2', name: 'خالد العمري', avatar: '👨‍🎤', lastMsg: 'هل ستحضر الغرفة الليلة؟', time: '09:20', unread: 0, online: true, vip: 'vip-5' },
    { id: 'c3', name: 'ريم المطيري', avatar: '👸', lastMsg: 'صوتك جميل والله 🎵', time: 'أمس', unread: 1, online: false, vip: 'svip-2' },
    { id: 'c4', name: 'طارق الأمير', avatar: '🤴', lastMsg: 'موعدنا في الليل', time: 'أمس', unread: 0, online: true, vip: 'vip-6' },
    { id: 'c5', name: 'هند القحطاني', avatar: '👩‍💫', lastMsg: 'هههههه مضحوك 😂', time: 'الاثنين', unread: 0, online: false, vip: 'vip-4' },
  ],

  storeItems: {
    frames: [
      { id: 'f1', name: 'إطار ذهبي', emoji: '🔶', price: 500, type: 'frame', rarity: 'نادر' },
      { id: 'f2', name: 'إطار ملكي', emoji: '👑', price: 1200, type: 'frame', rarity: 'أسطوري' },
      { id: 'f3', name: 'إطار الماسي', emoji: '💎', price: 800, type: 'frame', rarity: 'خاص' },
      { id: 'f4', name: 'إطار النار', emoji: '🔥', price: 2000, type: 'frame', rarity: 'أسطوري' },
    ],
    entrances: [
      { id: 'e1', name: 'دخولية القمر', emoji: '🌙', price: 800, type: 'entrance', rarity: 'نادر' },
      { id: 'e2', name: 'دخولية التنين', emoji: '🐉', price: 1500, type: 'entrance', rarity: 'أسطوري' },
      { id: 'e3', name: 'دخولية الملك', emoji: '🤴', price: 3000, type: 'entrance', rarity: 'أسطوري' },
    ],
    memberships: [
      { id: 'mem1', name: 'VIP شهري', emoji: '⭐', price: 2999, type: 'membership', duration: 'شهر' },
      { id: 'mem2', name: 'SVIP شهري', emoji: '💜', price: 9999, type: 'membership', duration: 'شهر' },
      { id: 'mem3', name: 'VIP سنوي', emoji: '🌟', price: 24999, type: 'membership', duration: 'سنة' },
    ]
  },

  coinPackages: [
    { id: 'cp1', coins: 1000, bonus: 0, price: '5 ر.س', popular: false },
    { id: 'cp2', coins: 5000, bonus: 500, price: '20 ر.س', popular: false },
    { id: 'cp3', coins: 12000, bonus: 2000, price: '45 ر.س', popular: true },
    { id: 'cp4', coins: 30000, bonus: 8000, price: '99 ر.س', popular: false },
    { id: 'cp5', coins: 100000, bonus: 40000, price: '299 ر.س', popular: false },
  ],
};
