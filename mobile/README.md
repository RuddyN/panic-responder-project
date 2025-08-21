# Welcome to your Expo app 👋

## Get started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Start the app

   ```bash
   npx expo start

   // w for web
   // i for ios
   ```

3. If you want to run on IOS you might need to do this first

   ```bash
   npx pod-install
   ```

   if you still encounter an issue then rebuild the ios app using

   ```
   npx expo run:ios
   ```

   If you are having issues getting the location to work add this to your info.plist

   ```
     // found here ./ios/mobile/info.plist

     <key>NSLocationWhenInUseUsageDescription</key>
     <string>We need this information to get your location to know where to send response</string>
     <key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
     <string>We need your location at all times because we are the Monolith and privacy is a fallacy.</string>

   ```

   Then rerun the app with

    ```
    npx expo start

    // type i for ios
    ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo
