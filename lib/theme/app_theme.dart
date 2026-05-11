import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors {
  static const bgPrimary    = Color(0xFF08080F);
  static const bgSecondary  = Color(0xFF0E0E1A);
  static const bgElevated   = Color(0xFF141424);
  static const bgCard       = Color(0xFF1A1A2E);

  static const purplePrimary = Color(0xFF7B2FBE);
  static const purpleLight   = Color(0xFF9D4EDD);
  static const purpleDark    = Color(0xFF4A0D8F);
  static const purpleGlow    = Color(0xFF6A0DAD);

  static const goldPrimary   = Color(0xFFD4A017);
  static const goldBright    = Color(0xFFFFD700);
  static const goldDark      = Color(0xFF8B6914);

  static const textPrimary   = Color(0xFFF0F0F8);
  static const textSecondary = Color(0xFF9898B8);
  static const textMuted     = Color(0xFF4A4A6A);

  static const borderDefault = Color(0xFF2A2A40);
  static const borderPurple  = Color(0x557B2FBE);
  static const borderGold    = Color(0x55D4A017);

  static const green  = Color(0xFF00E676);
  static const red    = Color(0xFFFF4B4B);
  static const blue   = Color(0xFF2979FF);
  static const orange = Color(0xFFFF6D00);

  // Glass overlays
  static const glassBg       = Color(0x1AFFFFFF);
  static const glassBgStrong = Color(0x26FFFFFF);
  static const glassGold     = Color(0x1AD4A017);
  static const glassPurple   = Color(0x1A7B2FBE);
}

class AppTheme {
  static ThemeData get darkTheme {
    final base = ThemeData.dark();
    return base.copyWith(
      scaffoldBackgroundColor: AppColors.bgPrimary,
      colorScheme: const ColorScheme.dark(
        primary:   AppColors.purplePrimary,
        secondary: AppColors.goldPrimary,
        surface:   AppColors.bgSecondary,
        error:     AppColors.red,
      ),
      textTheme: GoogleFonts.cairoTextTheme(base.textTheme).apply(
        bodyColor:      AppColors.textPrimary,
        displayColor:   AppColors.textPrimary,
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        titleTextStyle: GoogleFonts.cairo(
          color: AppColors.textPrimary,
          fontSize: 18,
          fontWeight: FontWeight.w800,
        ),
        iconTheme: const IconThemeData(color: AppColors.textPrimary),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: AppColors.bgSecondary,
        selectedItemColor: AppColors.purpleLight,
        unselectedItemColor: AppColors.textMuted,
        type: BottomNavigationBarType.fixed,
        elevation: 0,
      ),
      cardTheme: CardThemeData(
        color: AppColors.bgCard,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: AppColors.borderDefault),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.bgElevated,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.borderDefault),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.borderDefault),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.purplePrimary),
        ),
        hintStyle: const TextStyle(color: AppColors.textMuted),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.purplePrimary,
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          textStyle: GoogleFonts.cairo(fontSize: 15, fontWeight: FontWeight.w700),
        ),
      ),
      dividerColor: AppColors.borderDefault,
    );
  }
}

// Reusable gradient decorations
class AppGradients {
  static const purpleGold = LinearGradient(
    colors: [AppColors.purpleDark, AppColors.purplePrimary, AppColors.goldDark],
    begin: Alignment.topRight,
    end: Alignment.bottomLeft,
  );

  static const bgCard = LinearGradient(
    colors: [AppColors.bgCard, AppColors.bgElevated],
    begin: Alignment.topRight,
    end: Alignment.bottomLeft,
  );

  static const gold = LinearGradient(
    colors: [AppColors.goldDark, AppColors.goldBright, AppColors.goldDark],
    begin: Alignment.centerRight,
    end: Alignment.centerLeft,
  );

  static const svip = LinearGradient(
    colors: [Color(0xFF2d1b00), AppColors.goldDark, AppColors.goldBright, AppColors.goldDark, Color(0xFF2d1b00)],
    begin: Alignment.centerRight,
    end: Alignment.centerLeft,
  );
}
