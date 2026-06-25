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
    if (swipeOffset > 100) {
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
      if (swipeOffset > 100) {
        onUnlock();
      } else {
        setSwipeOffset(0);
      }
    }
  };

  const handleClick = () => {
    onUnlock();
  };

  return (
    <div 
        className="mobile-lock-screen" 
        style={{ 
            backgroundImage: `url(${wallpaper})`,
            transform: `translateY(-${swipeOffset}px)`,
            transition: isSwiping ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
    >
      {/* Center Lock Content */}
      <div className="lock-content" style={{ opacity: Math.max(0, 1 - swipeOffset / 300) }}>
        <div className="lock-icon-ios">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
        </div>
        <div className="date-display-ios">{formattedDate}</div>
        <div className="time-display-ios">{formattedTime}</div>
      </div>

      {/* Flashlight and Camera Quick Buttons */}
      <div className="lock-footer-ios" style={{ opacity: Math.max(0, 1 - swipeOffset / 200) }}>
        <div className="footer-action-btn">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
            <path d="M9 2h6v4H9zm1.5 5h3L16 11v9c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2v-9zm2 4v3h1v-3z"/>
          </svg>
        </div>
        <div className="footer-action-btn">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
            <path d="M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M9 3L7.17 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.17L15 3H9z"/>
          </svg>
        </div>
      </div>

      {/* Bottom swipe indicator */}
      <div className="home-bar-ios" onClick={handleClick}>
        <span>Swipe up to unlock</span>
        <div className="bar-indicator"></div>
      </div>
    </div>
  );
};

export default MobileLockScreen;
