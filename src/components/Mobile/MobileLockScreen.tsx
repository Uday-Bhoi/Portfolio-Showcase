import React, { useState, useEffect, useRef } from 'react';
import './MobileLockScreen.css';
import { Icons } from '../../assets/icons';

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
    if (swipeOffset > 150) {
      onUnlock();
    } else {
      setSwipeOffset(0);
    }
  };

  // Also support click for dev testing
  const handleClick = () => {
    onUnlock();
  };

  return (
    <div 
        className="mobile-lock-screen" 
        style={{ 
            backgroundImage: `url(${wallpaper})`,
            transform: `translateY(-${swipeOffset}px)`,
            transition: isSwiping ? 'none' : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
    >
      <div className="status-bar-lock">
        <div className="status-left">
           <span>Carrier</span>
           <img src={Icons.wifi} alt="" className="status-icon" />
        </div>
        <div className="status-right">
            <span style={{ fontSize: '12px', fontWeight: 'bold', marginRight: '4px' }}>5G</span>
           <img src={Icons.battery} alt="" className="status-icon" />
        </div>
      </div>

      <div className="lock-content" style={{ opacity: 1 - swipeOffset / 400 }}>
        <div className="lock-icon-ios">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
            <path d="M12 13a2 2 0 100-4 2 2 0 000 4z"/>
            <path fillRule="evenodd" d="M6 10V7a6 6 0 1112 0v3h1a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h1zm2 0h8V7a4 4 0 10-8 0v3z" clipRule="evenodd"/>
          </svg>
        </div>
        <div className="time-display-ios">{formattedTime}</div>
        <div className="date-display-ios">{formattedDate}</div>
      </div>

      <div className="lock-widgets-container">
          {/* Future iOS widgets could go here */}
      </div>

      <div className="lock-footer-ios">
        <div className="footer-action-btn">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M13 3a1 1 0 011 1v2a1 1 0 11-2 0V4a1 1 0 011-1zm4.8 2.2a1 1 0 010 1.4L16.4 8a1 1 0 11-1.4-1.4l1.4-1.4a1 1 0 011.4 0zM21 12a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zm-3.2 5.4a1 1 0 01-1.4 0l-1.4-1.4a1 1 0 111.4-1.4l1.4 1.4a1 1 0 010 1.4zM13 18a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm-6.8-.2a1 1 0 010-1.4l1.4-1.4a1 1 0 111.4 1.4l-1.4 1.4a1 1 0 01-1.4 0zM3 12a1 1 0 011-1h2a1 1 0 110 2H4a1 1 0 01-1-1zm2.2-6.8a1 1 0 011.4 0L8 6.6a1 1 0 11-1.4 1.4l-1.4-1.4a1 1 0 010-1.4z" />
          </svg>
        </div>
        <div className="footer-action-btn">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M4 5a3 3 0 013-3h10a3 3 0 013 3v14a3 3 0 01-3 3H7a3 3 0 01-3-3V5zm3-1a1 1 0 00-1 1v14a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H7z" />
            <path d="M12 17a3 3 0 100-6 3 3 0 000 6z" />
          </svg>
        </div>
      </div>

      <div className="home-bar-ios" onClick={handleClick}>
        <div className="bar-indicator"></div>
        <span>Swipe up to unlock</span>
      </div>
    </div>
  );
};

export default MobileLockScreen;
