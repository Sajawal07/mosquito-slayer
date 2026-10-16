# 🦟 Mosquito Slayer - Android Mobile & Tablet Game

[![Google Play Ready](https://img.shields.io/badge/Google%20Play-Ready%20Target%20SDK%2036-green?logo=googleplay)](https://play.google.com/console)
[![Platform](https://img.shields.io/badge/Platform-Android%20(Phones%20%26%20Tablets)-blue?logo=android)](https://developer.android.com/)
[![License](https://img.shields.io/badge/License-Proprietary-orange)]()
[![Offline](https://img.shields.io/badge/Mode-100%25%20Offline-brightgreen)]()

An addictive, fast-paced casual arcade action game for Android devices. Swat, slap, and zap buzzing mosquitoes with increasing speed and difficulty using various unlockable weapons!

---

## 🎮 Game Features

- **⚡ Animated Splash Screen**: Custom high-energy splash screen with an electric gaming progress bar loader (0% to 100%) and dynamic tips.
- **📱 100% Portrait Mobile & Tablet Fit**: Built with dynamic scaling (`Phaser.Scale.FIT` and `CENTER_BOTH`) for optimal vertical gameplay.
- **✋ Unlockable Weapons**:
  - **Bare Hand**: Quick and trusty starting weapon.
  - **Flying Chappal / Slipper**: High impact, medium radius.
  - **Electric Mosquito Racket**: Huge zap radius with electric audio effects!
- **😂 Savage Miss Reactions**: Miss a mosquito and get hit with hilarious meme freeze popups and savage dialogues.
- **📳 Haptic Vibration**: Optional tactile feedback on every hit/slap.
- **🔒 100% Offline & Private**: Zero data collection, no background tracking, no third-party ads.
- **🚀 Google Play Store Ready**: Target SDK 36, signed AAB & APK, complete store graphic assets included.

---

## 📜 Privacy Policy & Terms of Service

The official Google Play Store Privacy Policy and Terms of Service is hosted live via GitHub Pages:
🔗 **[https://sajawal07.github.io/mosquito-slayer/](https://sajawal07.github.io/mosquito-slayer/)**

---

## 🛠️ Built With

- **Engine**: [Phaser 3](https://phaser.io/)
- **Native Runtime**: [Capacitor](https://capacitorjs.com/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Target Platform**: Android 7.0+ (API 24 to API 36)

---

## 💻 Local Development & Build

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build web distribution
npm run build

# Sync assets to native Android project
npx cap sync android

# Build Release APK and AAB with Gradle
cd android
./gradlew assembleRelease bundleRelease
```

---

## 👤 Developer

- **Developer**: Muhammad Sajawal ([@Sajawal07](https://github.com/Sajawal07))
- **Email**: [sajawal0005@gmail.com](mailto:sajawal0005@gmail.com)
