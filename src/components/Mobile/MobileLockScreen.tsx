import React, { useState, useEffect, useRef } from 'react';
import './MobileLockScreen.css';

interface MobileLockScreenProps {
  onUnlock: () => void;
  wallpaper: string;
}

const MobileLockScreen: React.FC<MobileLockScreenProps> = ({ onUnlock, wallpaper }) => {
  const [time, setTime] = useState(new Date());
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  
  // Quick Action Button States
  const [flashlightActive, setFlashlightActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [shutterEffect, setShutterEffect] = useState(false);

  const startY = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: false 
  });

  const formattedDate = time.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    const currentY = e.touches[0].clientY;
    const diff = startY.current - currentY;
    if (diff > 0) {
      setSwipeOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
    if (swipeOffset > 120) {
      onUnlock();
    } else {
      setSwipeOffset(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startY.current = e.clientY;
    setIsSwiping(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSwiping) return;
    const currentY = e.clientY;
    const diff = startY.current - currentY;
    if (diff > 0) {
      setSwipeOffset(diff);
    }
  };

  const handleMouseUp = () => {
    if (isSwiping) {
      setIsSwiping(false);
      if (swipeOffset > 120) {
        onUnlock();
      } else {
        setSwipeOffset(0);
      }
    }
  };

  // Simulated button interactions (haptic effect on touch down/up)
  const handleFlashlightClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setFlashlightActive(prev => !prev);
  };

  const handleCameraClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setCameraActive(true);
    setShutterEffect(true);
    setTimeout(() => {
      setShutterEffect(false);
    }, 350);
    setTimeout(() => {
      setCameraActive(false);
    }, 2000);
  };

  // Interactive style values based on swipe
  const opacityValue = Math.max(0, 1 - swipeOffset / 260);
  const scaleValue = Math.max(0.92, 1 - swipeOffset / 2500);

  return (
    <div 
        className={`mobile-lock-screen ${flashlightActive ? 'flashlight-on' : ''}`} 
        style={{ 
            backgroundImage: `url(${wallpaper})`,
            transform: `translateY(-${swipeOffset}px)`,
            transition: isSwiping ? 'none' : 'transform 0.45s cubic-bezier(0.25, 1, 0.2, 1)'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
    >
      {/* Visual shutter effect when camera is pressed */}
      {shutterEffect && <div className="camera-shutter-flash" />}

      {/* Simulated camera view */}
      {cameraActive && (
        <div className="camera-viewfinder-overlay">
          <div className="viewfinder-header">
            <span className="flash-icon">⚡</span>
            <span className="live-badge">LIVE</span>
          </div>
          <div className="viewfinder-center">
            <div className="focus-bracket"></div>
          </div>
          <div className="viewfinder-footer">
            <span className="mode-active">PHOTO</span>
          </div>
        </div>
      )}

      {/* Center Lock Content */}
      <div 
        className="lock-content" 
        style={{ 
          opacity: opacityValue,
          transform: `scale(${scaleValue})`
        }}
      >
        <div className="lock-icon-ios">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
        </div>
        <div className="date-display-ios">{formattedDate}</div>
        <div className="time-display-ios">{formattedTime}</div>

        {/* iOS Lock Screen Notification Card */}
        <div className="lockscreen-notification-card">
          <div className="lock-notif-header">
            <div className="lock-notif-icon">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="white">
                <path d="M4 6h16v12H4z" fill="none" />
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z"/>
              </svg>
            </div>
            <span className="lock-notif-app">System</span>
            <span className="lock-notif-time">now</span>
          </div>
          <div className="lock-notif-body">
            <h4 className="lock-notif-title">Desktop Recommended</h4>
            <p className="lock-notif-desc">This website is best viewed on a desktop.</p>
          </div>
        </div>
      </div>

      {/* Flashlight Beam Simulation */}
      {flashlightActive && <div className="flashlight-beam" />}

      {/* Flashlight and Camera Quick Buttons */}
      <div 
        className="lock-footer-ios" 
        style={{ opacity: opacityValue }}
      >
        <div 
          className={`footer-action-btn ${flashlightActive ? 'active' : ''}`}
          onTouchEnd={handleFlashlightClick}
          onMouseUp={handleFlashlightClick}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M9 2h6v4H9zm1.5 5h3L16 11v9c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2v-9zm2 4v3h1v-3z"/>
          </svg>
        </div>
        <div 
          className={`footer-action-btn ${cameraActive ? 'active' : ''}`}
          onTouchEnd={handleCameraClick}
          onMouseUp={handleCameraClick}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M9 3L7.17 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.17L15 3H9z"/>
          </svg>
        </div>
      </div>

      {/* Bottom swipe indicator */}
      <div className="home-bar-ios">
        <span>Swipe up to unlock</span>
        <div className="bar-indicator"></div>
      </div>
    </div>
  );
};

export default MobileLockScreen;
