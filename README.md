# ClipSync Website with OS Detection

This is the frontend website for ClipSync, a clipboard manager application. The website now includes intelligent OS detection that automatically customizes the download experience based on the user's operating system.

## 🚀 Features

### OS Detection & Smart Downloads

- **Automatic OS Detection**: Detects Windows, macOS, Linux, iOS, and Android
- **Smart Download Buttons**: Highlights the appropriate download button for the user's OS
- **Personalized Experience**: Shows "Recommended for you" badges and reorders buttons
- **Mobile Handling**: Special messaging for mobile users directing them to desktop
- **Analytics Ready**: Built-in download tracking for analytics integration

### How It Works

The `index.js` file contains an `OSDetector` class that:

1. **Detects the user's OS** using `navigator.userAgent` and `navigator.platform`
2. **Updates the hero section** by highlighting the appropriate download button
3. **Customizes the download section** with visual emphasis on the user's platform
4. **Handles mobile users** with appropriate messaging
5. **Updates the page title** to include the detected OS
6. **Tracks download clicks** for analytics

## 📁 Files

- `index.html` - Main website page with download sections
- `index.js` - OS detection and dynamic UI updates
- `test-os-detection.html` - Test page to verify OS detection functionality
- Other HTML files: `about.html`, `contribute.html`, `support.html`, `screenshots.html`

## 🔧 Implementation Details

### OS Detection Logic

```javascript
// The script detects OS based on user agent strings:
- Windows: Contains 'win' in user agent
- macOS: Contains 'mac' in user agent
- Linux: Contains 'linux' but not 'android'
- iOS: Contains 'iphone' or 'ipad'
- Android: Contains 'android'
```

### Visual Changes Applied

1. **Hero Section Download Buttons**:

   - Detected OS button gets `primary` class
   - Button text updated with "(Recommended)" label
   - Button moved to first position

2. **Download Section**:

   - User's OS section gets highlighted border and shadow
   - "✨ Recommended for you" badge added
   - Other sections slightly faded (opacity: 0.8)

3. **Mobile Users**:

   - Special message displayed instead of download sections
   - Guidance to visit on desktop device

4. **Page Title**:
   - Updated to include detected OS (e.g., "ClipSync for macOS - ...")

## 🧪 Testing

Open `test-os-detection.html` to:

- See current OS detection results
- Test different user agent strings
- Verify detection logic works correctly

## 🚀 Usage

1. Include the script in your HTML:

```html
<script src="index.js"></script>
```

2. The OS detection runs automatically when the page loads

3. Check browser console for detection logs:

```javascript
// Example console output:
OS Detection: {
  detected: "mac",
  displayName: "macOS",
  userAgent: "mozilla/5.0 (macintosh; intel mac os x 10_15_7)...",
  platform: "macintel"
}
```

## 📊 Analytics Integration

The script includes download tracking. To integrate with your analytics service:

```javascript
// In the addDownloadAnalytics() method, add:
gtag("event", "download_click", {
  os: this.detectedOS,
  button_text: buttonText,
});

// Or for other analytics services:
analytics.track("Download Clicked", {
  detected_os: this.detectedOS,
  button_text: buttonText,
});
```

## 🎨 Customization

### Modify OS Detection

Edit the `detectOS()` method in `index.js` to add new platforms or change detection logic.

### Customize Visual Effects

Modify the `updateDownloadSectionVisibility()` method to change how the detected OS section is highlighted.

### Add New Platforms

1. Add new OS to the detection logic
2. Update `getOSDisplayName()` and `getOSEmoji()` methods
3. Add corresponding download section in HTML

## 🌐 Browser Support

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 📱 Mobile Experience

When mobile devices are detected:

- iOS users see message to visit on Mac
- Android users see message to visit on Windows/Linux
- Download sections are replaced with helpful guidance

## 🔒 Privacy

- All detection happens client-side
- No data sent to external servers
- Uses standard browser APIs only
- Respects user privacy

---

**Note**: The OS detection enhances user experience by showing the most relevant download option first, but all platform downloads remain accessible to users.
