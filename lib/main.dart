import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'theme/app_theme.dart';
import 'screens/splash_screen.dart';
import 'screens/home_screen.dart';
import 'screens/room_screen.dart';
import 'screens/auth_screen.dart';
import 'screens/profile_screen.dart';
import 'screens/store_screen.dart';
import 'screens/vip_screen.dart';
import 'screens/games_screen.dart';
import 'screens/search_screen.dart';
import 'screens/messages_screen.dart';
import 'screens/notifications_screen.dart';
import 'screens/agencies_screen.dart';
import 'screens/admin_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
    statusBarIconBrightness: Brightness.light,
  ));
  runApp(const SawtakApp());
}

class SawtakApp extends StatelessWidget {
  const SawtakApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'صوتك',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      builder: (context, child) => Directionality(
        textDirection: TextDirection.rtl,
        child: child!,
      ),
      initialRoute: '/splash',
      routes: {
        '/splash':        (_) => const SplashScreen(),
        '/auth':          (_) => const AuthScreen(),
        '/home':          (_) => const HomeScreen(),
        '/profile':       (_) => const ProfileScreen(),
        '/store':         (_) => const StoreScreen(),
        '/vip':           (_) => const VipScreen(),
        '/games':         (_) => const GamesScreen(),
        '/search':        (_) => const SearchScreen(),
        '/messages':      (_) => const MessagesScreen(),
        '/notifications': (_) => const NotificationsScreen(),
        '/agencies':      (_) => const AgenciesScreen(),
        '/admin':         (_) => const AdminScreen(),
      },
      onGenerateRoute: (settings) {
        if (settings.name == '/room') {
          final args = settings.arguments as Map<String, dynamic>?;
          return MaterialPageRoute(
            builder: (_) => RoomScreen(roomId: args?['roomId'] ?? 'r1'),
          );
        }
        return null;
      },
    );
  }
}
