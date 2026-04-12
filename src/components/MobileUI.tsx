import React, { useState } from 'react';
import MobileLoader from './Mobile/MobileLoader';
import MobileLockScreen from './Mobile/MobileLockScreen';
import MobileHome from './Mobile/MobileHome';
import iosWallpaper from '../assets/Wallpapers/macos-wall.jpg';
import './MobileUI.css';

const MobileUI: React.FC = () => {
  const [stage, setStage] = useState<'loader' | 'lockscreen' | 'home'>('loader');
  const [showDesktopNotice, setShowDesktopNotice] = useState(true);

  const handleUnlock = () => {
    // Transition to home immediately, let the children handle animations
    setStage('home');
  };

  return (
    <div className="mobile-ui-root" style={{ backgroundImage: `url(${iosWallpaper})` }}>
      {stage === 'loader' && (
        <MobileLoader onComplete={() => setStage('lockscreen')} />
      )}

      {stage === 'lockscreen' && (
        <MobileLockScreen wallpaper={iosWallpaper} onUnlock={handleUnlock} />
      )}

      {stage === 'home' && (
        <>
            <MobileHome wallpaper={iosWallpaper} />
            {showDesktopNotice && (
                <div className="desktop-notice-overlay">
                    <div className="desktop-notice-modal">
                        <div className="notice-icon">🖥️</div>
                        <h3>Desktop Recommended</h3>
                        <p>For the full macOS experience, including windows and advanced features, please visit this site on a desktop or laptop.</p>
                        <button onClick={() => setShowDesktopNotice(false)}>Continue to Mobile</button>
                    </div>
                </div>
            )}
        </>
      )}
    </div>
  );
};

export default MobileUI;
