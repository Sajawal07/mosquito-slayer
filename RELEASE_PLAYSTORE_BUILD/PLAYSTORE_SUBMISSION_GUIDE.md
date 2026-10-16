# Google Play Store Upload & Testing Guide - Mosquito Slayer

## 📁 Files in this Folder (`RELEASE_PLAYSTORE_BUILD`)

1. **`Mosquito_Slayer_v1.0.apk`**
   - Direct installation file for Android mobile phones and tablets.
   - Use this to test the game directly on your device before publishing.
2. **`Mosquito_Slayer_v1.0.aab`**
   - The official **Android App Bundle (.aab)** file required by Google Play Console for publication.
3. **`playstore_icon_512x512.png`**
   - High-resolution store icon (512 x 512 px, 32-bit PNG) required for Google Play Store listing.
4. **`playstore_feature_graphic_1024x500.png`**
   - Feature graphic banner (1024 x 500 px) required for Google Play Store listing.
5. **`mosquitoslayer-release-key.jks`**
   - The production signing keystore used to sign the APK and AAB.
6. **`KEYSTORE_DETAILS.txt`**
   - Contains alias, passwords, and SHA-1/SHA-256 fingerprints.

---

## 📱 Mobile & Tablet Optimizations Included

- **Dynamic Responsive Scaling**: Uses Phaser `Scale.FIT` and `Scale.CENTER_BOTH` so the game automatically fits any mobile phone (16:9, 18:9, 19.5:9, 20:9) and tablets (4:3, 16:10, large screens) with no stretching or distortion.
- **Portrait Orientation Lock**: Automatically locks into portrait mode, providing consistent vertical gameplay across all devices.
- **True Full-Screen Immersive Mode**: Automatically hides Android status bar and navigation buttons for a full gaming experience.
- **Offline Ready**: Phaser engine and all game assets are bundled directly inside the app; no internet connection or CDN is needed.
- **Touch & Audio Context Support**: Touch gestures unlock WebAudio seamlessly without delay.
- **Target SDK**: Configured for Android 14+ / API 36, meeting all Google Play 2026/2027 policy requirements.

---

## 🚀 Google Play Console Submission Steps

### Step 1: Create New App on Google Play Console
1. Go to [Google Play Console](https://play.google.com/console).
2. Click **Create app**.
3. App name: `Mosquito Slayer`
4. Default language: English (United States)
5. App or game: **Game**
6. Free or paid: **Free**
7. Check the declarations and click **Create app**.

### Step 2: Set Up Store Listing
- **App Name**: Mosquito Slayer
- **Short Description**: Fast-paced mosquito hunting game! Tap, slap, and unlock epic weapons.
- **Full Description**:
  > Experience the ultimate mosquito swatting action! Mosquito Slayer brings thrilling casual arcade gameplay where timing, precision, and quick reflexes are key.
  > 
  > 🦟 Fast-flying mosquito swarms with increasing difficulty.
  > ✋ Multiple weapons: Bare Hand, Flying Chappal / Slipper, and Electric Mosquito Racket!
  > 🔥 Combo multipliers, meme freeze moments, and rage mode challenges.
  > 📱 Fully optimized for smooth performance on both smartphones and tablets.
  > ⚡ Play offline anytime, anywhere!
- **App Icon**: Upload `playstore_icon_512x512.png`.
- **Feature Graphic**: Upload `playstore_feature_graphic_1024x500.png`.
- **Screenshots**: Take 2-4 screenshots while playing on your tablet or phone in portrait mode and upload them to the Phone and Tablet screenshot sections.

### Step 3: Complete App Content Declarations
- **Privacy Policy**: Use the live GitHub Pages URL: `https://sajawal07.github.io/mosquito-slayer/`
- **Ads**: Select "No, my app does not contain ads" (unless you add AdMob later).
- **Target Age**: Select 13+ or appropriate age group.
- **Data Safety**: Select "No data collected or shared".
- **Category**: Games > Arcade or Casual.

### Step 4: Upload the App Bundle (.aab)
1. In the Play Console menu, go to **Production** (or **Internal Testing** / **Closed Testing**).
2. Click **Create new release**.
3. Google Play App Signing: Select **Use Google-generated key** or let Play Console use your uploaded release keystore signature.
4. Drag and drop **`Mosquito_Slayer_v1.0.aab`** into the upload area.
5. Release name: `1.0 (1)`
6. Release notes: `Initial release of Mosquito Slayer! Hunt mosquitoes, unlock weapons, and beat high scores.`
7. Click **Save** and **Review Release**.
8. Submit for review!

---

## 📲 How to Test the APK on Your Phone or Tablet

1. Copy `Mosquito_Slayer_v1.0.apk` to your phone/tablet (via USB cable, Google Drive, or WhatsApp/Telegram).
2. On your device, tap the file and select **Install**.
3. If prompted with *"Install unknown apps"*, enable permission for the file manager or browser.
4. Open **Mosquito Slayer** and enjoy!
