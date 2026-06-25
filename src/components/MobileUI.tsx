import React, { useState, useEffect, useMemo } from 'react';
import MobileLoader from './Mobile/MobileLoader';
import MobileLockScreen from './Mobile/MobileLockScreen';
import MobileHome from './Mobile/MobileHome';
import macosWallpaper from '../assets/Wallpapers/macos-wall.jpg';
import mandoWallpaper from '../assets/Wallpapers/mando_wall.jpg';
import sequoiaWallpaper from '../assets/Wallpapers/sequoia_wall.png';
import lakeWallpaper from '../assets/Wallpapers/lake_wall.png';
import cyberpunkWallpaper from '../assets/Wallpapers/cyberpunk_wall.png';
import desertWallpaper from '../assets/Wallpapers/desert_wall.png';
import { useOSStore } from '../store/osStore';
import './MobileUI.css';

const MobileUI: React.FC = () => {
  const activeWallpaper = useOSStore(state => state.wallpaper);

  const currentWallpaperUrl = useMemo(() => {
    switch (activeWallpaper) {
      case 'mando': return mandoWallpaper;
      case 'sequoia': return sequoiaWallpaper;
      case 'lake': return lakeWallpaper;
      case 'cyberpunk': return cyberpunkWallpaper;
      case 'desert': return desertWallpaper;
      case 'light-pillar':
      case 'floating-lines':
        return sequoiaWallpaper;
      case 'standard':
      default:
        return macosWallpaper;
    }
  }, [activeWallpaper]);
  const [stage, setStage] = useState<'loader' | 'active'>(() => {
    return (sessionStorage.getItem('mobile_stage') as 'loader' | 'active') || 'loader';
  });
  const [isLocked, setIsLocked] = useState(() => {
    return sessionStorage.getItem('mobile_unlocked') !== 'true';
  });
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showDesktopNotice, setShowDesktopNotice] = useState(() => {
    return sessionStorage.getItem('mobile_desktop_notice_shown') !== 'true';
  });

  const handleUnlock = () => {
    setIsUnlocking(true);
    // Slide up lock screen then disable it
    setTimeout(() => {
      setIsLocked(false);
      setIsUnlocking(false);
      sessionStorage.setItem('mobile_unlocked', 'true');
      sessionStorage.setItem('mobile_stage', 'active');
    }, 600); // Match transition duration
  };


  const [isNoticeDismissing, setIsNoticeDismissing] = useState(false);

  const handleDismissNotice = () => {
    setIsNoticeDismissing(true);
    setTimeout(() => {
      setShowDesktopNotice(false);
      sessionStorage.setItem('mobile_desktop_notice_shown', 'true');
    }, 450); // Match slide-out transition
  };

  useEffect(() => {
    if (stage === 'active' && !isLocked && showDesktopNotice) {
      const timer = setTimeout(() => {
        handleDismissNotice();
      }, 6000); // Auto dismiss after 6 seconds
      return () => clearTimeout(timer);
    }
  }, [stage, isLocked, showDesktopNotice]);

  return (
    <div className="mobile-ui-root" style={{ backgroundImage: `url(${currentWallpaperUrl})` }}>
      {stage === 'loader' && (
        <MobileLoader onComplete={() => {
          setStage('active');
          sessionStorage.setItem('mobile_stage', 'active');
        }} />
      )}

      {stage === 'active' && (
        <>
          <MobileHome wallpaper={currentWallpaperUrl} />

          {isLocked && (
            <div className={`lockscreen-container ${isUnlocking ? 'slide-up' : ''}`}>
               <MobileLockScreen wallpaper={currentWallpaperUrl} onUnlock={handleUnlock} />
            </div>
          )}

          {showDesktopNotice && !isLocked && (
            <div className={`ios-notification-banner ${isNoticeDismissing ? 'dismissing' : ''}`} onClick={handleDismissNotice}>
              <div className="ios-notification-header">
                <div className="ios-notification-app-info">
                  <div className="ios-notification-icon" style={{ backgroundColor: '#007aff' }}>
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="white">
                      <path d="M4 6h16v12H4z" fill="none" />
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z"/>
                    </svg>
                  </div>
                  <span className="ios-notification-app-name">System</span>
                </div>
                <span className="ios-notification-time">now</span>
              </div>
              <div className="ios-notification-content">
                <h4 className="ios-notification-title">Desktop Experience Recommended</h4>
                <p className="ios-notification-body">For the best experience, explore this portfolio on a desktop or laptop device.</p>
              </div>
              <div className="ios-notification-grabber"></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MobileUI;
