## Development
1. Follow [instructions for setting up web-ext, Android Studio SDK, and adb](https://extensionworkshop.com/documentation/develop/developing-extensions-for-firefox-for-android/).

2. Get your device's ID: `adb devices`

3. Run on the device (replace `XXX` with the device ID):

(Firefox Nightly)
```
web-ext run -t firefox-android --adb-device XXX --firefox-apk org.mozilla.fenix
```

(Firefox Beta)
```
web-ext run -t firefox-android --adb-device XXX --firefox-apk org.mozilla.firefox_beta
```

4. Build with `web-ext build`. This generates a .zip file.

5. Sign with `web-ext sign`. See [docs](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/#sign-and-submit-update). 
