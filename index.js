// OS Detection and Dynamic Download Button Management
class OSDetector {
  constructor() {
    this.userAgent = navigator.userAgent.toLowerCase();
    this.platform = navigator.platform.toLowerCase();
    this.detectedOS = this.detectOS();
    this.init();
  }

  detectOS() {
    // Check for macOS
    if (this.userAgent.includes('mac') || this.platform.includes('mac')) {
      return 'mac';
    }
    
    // Check for Windows
    if (this.userAgent.includes('win') || this.platform.includes('win')) {
      return 'windows';
    }
    
    // Check for Linux
    if (this.userAgent.includes('linux') || this.platform.includes('linux')) {
      return 'linux';
    }
    
    // Check for mobile platforms
    if (this.userAgent.includes('android')) {
      return 'android';
    }
    
    if (this.userAgent.includes('iphone') || this.userAgent.includes('ipad')) {
      return 'ios';
    }
    
    // Default fallback
    return 'unknown';
  }

  getOSDisplayName() {
    const osNames = {
      'windows': 'Windows',
      'mac': 'macOS',
      'linux': 'Linux',
      'android': 'Android',
      'ios': 'iOS',
      'unknown': 'Your Platform'
    };
    return osNames[this.detectedOS] || 'Your Platform';
  }

  getOSEmoji() {
    const osEmojis = {
      'windows': '🪟',
      'mac': '🍎',
      'linux': '🐧',
      'android': '🤖',
      'ios': '📱',
      'unknown': '💻'
    };
    return osEmojis[this.detectedOS] || '💻';
  }

  updateHeroDownloadButtons() {
    const downloadButtons = document.querySelector('.download-buttons');
    if (!downloadButtons) return;

    // Get all download buttons
    const buttons = downloadButtons.querySelectorAll('.download-btn');
    
    // Hide all buttons first
    buttons.forEach(btn => {
      btn.style.display = 'none';
      btn.classList.remove('primary');
    });
    
    // Show only the user's OS button
    let targetButton = null;
    
    if (this.detectedOS === 'windows') {
      targetButton = Array.from(buttons).find(btn => 
        btn.textContent.includes('Windows') || btn.getAttribute('aria-label')?.includes('Windows')
      );
    } else if (this.detectedOS === 'mac') {
      targetButton = Array.from(buttons).find(btn => 
        btn.textContent.includes('macOS') || btn.textContent.includes('Mac') || btn.getAttribute('aria-label')?.includes('Mac')
      );
    } else if (this.detectedOS === 'linux') {
      targetButton = Array.from(buttons).find(btn => 
        btn.textContent.includes('Linux') || btn.getAttribute('aria-label')?.includes('Linux')
      );
    }
    
    // Show and highlight the user's OS button
    if (targetButton) {
      targetButton.style.display = 'inline-flex';
      targetButton.classList.add('primary');
    } else {
      // Fallback: show all buttons if no match found
      buttons.forEach(btn => {
        btn.style.display = 'inline-flex';
      });
    }
  }

  updateDownloadSectionVisibility() {
    // Hide mobile OS sections if detected
    if (this.detectedOS === 'android' || this.detectedOS === 'ios') {
      this.showMobileMessage();
      return;
    }

    // Highlight the detected OS section
    const sections = ['windows', 'mac', 'linux'];
    sections.forEach(os => {
      const section = document.getElementById(`download-${os}`);
      if (section) {
        if (os === this.detectedOS) {
          // Highlight the user's OS section
          section.style.border = '2px solid #667eea';
          section.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
          section.style.transform = 'scale(1.02)';
          section.style.transition = 'all 0.3s ease';
          
          // Add a "Recommended for you" badge
          const badge = document.createElement('div');
          badge.innerHTML = '✨ Recommended for you';
          badge.style.cssText = `
            position: absolute;
            top: -10px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          `;
          section.style.position = 'relative';
          section.appendChild(badge);
        } else {
          // Slightly fade other sections
          section.style.opacity = '0.8';
        }
      }
    });
  }

  showMobileMessage() {
    const downloadSection = document.getElementById('download');
    if (!downloadSection) return;

    const mobileMessage = document.createElement('div');
    mobileMessage.innerHTML = `
      <div style="
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        margin-bottom: 2rem;
      ">
        <h3 style="margin-bottom: 1rem;">📱 Mobile Device Detected</h3>
        <p style="margin-bottom: 1.5rem; opacity: 0.9;">
          LocalClip is designed for desktop platforms. Please visit this page on your 
          ${this.detectedOS === 'ios' ? 'Mac' : 'Windows or Linux'} computer to download.
        </p>
        <p style="font-size: 0.9rem; opacity: 0.8;">
          You can bookmark this page or send the link to your desktop device.
        </p>
      </div>
    `;
    
    const container = downloadSection.querySelector('.container');
    const versionInfo = container.querySelector('.version-info');
    container.insertBefore(mobileMessage, versionInfo);
  }

  updatePageTitle() {
    const currentTitle = document.title;
    if (!currentTitle.includes(this.getOSDisplayName()) && this.detectedOS !== 'unknown') {
      document.title = `LocalClip for ${this.getOSDisplayName()} - ${currentTitle}`;
    }
  }

  addDownloadAnalytics() {
    // Add click tracking for download buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('download-btn')) {
        const buttonText = e.target.textContent.trim();
        const href = e.target.getAttribute('href');
        
        // Log download attempt (you can integrate with your analytics service)
        console.log('Download clicked:', {
          detectedOS: this.detectedOS,
          buttonText: buttonText,
          href: href,
          timestamp: new Date().toISOString()
        });
        
        // You can add Google Analytics, Mixpanel, or other tracking here
        // Example: gtag('event', 'download_click', { os: this.detectedOS });
      }
    });
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.applyOSDetection();
      });
    } else {
      this.applyOSDetection();
    }
  }

  applyOSDetection() {
    try {
      this.updateHeroDownloadButtons();
      this.updateDownloadSectionVisibility();
      this.updatePageTitle();
      this.addDownloadAnalytics();
      
      // Log detection for debugging
      console.log('OS Detection:', {
        detected: this.detectedOS,
        displayName: this.getOSDisplayName(),
        userAgent: this.userAgent,
        platform: this.platform
      });
    } catch (error) {
      console.error('Error applying OS detection:', error);
    }
  }
}

// Initialize OS detection when script loads
const osDetector = new OSDetector();

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = OSDetector;
} 