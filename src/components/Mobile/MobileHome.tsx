import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Icons } from '../../assets/icons';
import MobileMusicWidget from './MobileMusicWidget';
import MobileRemindersWidget from './MobileRemindersWidget';
import MobileControlCenter from './MobileControlCenter';
import { useMusicStore } from '../../store/musicStore';
import './MobileHome.css';

// App Components
import InternetExplorer from '../../apps/InternetExplorer';
import Portfolio from '../../apps/Portfolio';
import Music from '../../apps/Music/Music';
import Settings from '../../apps/Settings/Settings';
import Resume from '../../apps/Resume';

const MobileHome: React.FC<{ wallpaper: string }> = ({ wallpaper }) => {
  const [time, setTime] = useState(new Date());
  const [activeApp, setActiveApp] = useState<string | null>(() => {
    return sessionStorage.getItem('mobile_active_app') || null;
  });
  const [isClosing, setIsClosing] = useState(false);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);

  // Dynamic Island States & Music Store integration
  const { currentTrackId, tracks, isPlaying } = useMusicStore();
  const currentTrack = tracks.find(t => t.id === currentTrackId) || tracks[0];
  const [islandMode, setIslandMode] = useState<'normal' | 'unlock' | 'music' | 'silent' | 'charging'>('normal');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = useMemo(() => {
    return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });
  }, [time]);

  // Handle Dynamic Island unlock and playback states
  useEffect(() => {
    if (sessionStorage.getItem('mobile_just_unlocked') === 'true') {
      queueMicrotask(() => setIslandMode('unlock'));
      sessionStorage.removeItem('mobile_just_unlocked');
      const timer = setTimeout(() => {
        setIslandMode(isPlaying ? 'music' : 'normal');
      }, 2200);
      return () => clearTimeout(timer);
    } else if (isPlaying) {
      queueMicrotask(() => setIslandMode('music'));
    } else {
      queueMicrotask(() => setIslandMode('normal'));
    }
  }, [isPlaying]);

  const handleIslandClick = () => {
    if (isPlaying) {
      setActiveApp('music');
      sessionStorage.setItem('mobile_active_app', 'music');
    } else {
      setIslandMode('silent');
      setTimeout(() => {
        setIslandMode(isPlaying ? 'music' : 'normal');
      }, 2000);
    }
  };

  const apps = [
    { type: 'safari', name: 'Safari', icon: Icons.safari, component: <InternetExplorer /> },
    { type: 'portfolio', name: 'Meet Uday', icon: Icons.portfolio, component: <Portfolio /> },
    { type: 'music', name: 'Music', icon: Icons.music, component: <Music /> },
    { type: 'resume', name: 'Resume', icon: Icons.resume, component: <Resume /> },
    { type: 'settings', name: 'Settings', icon: Icons.settings, component: <Settings /> },
    { type: 'github', name: 'GitHub', icon: Icons.github, onClick: () => window.open('https://github.com/Uday-Bhoi', '_blank') },
  ];

  const openApp = (type: string, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    document.documentElement.style.setProperty('--click-x', `${x}px`);
    document.documentElement.style.setProperty('--click-y', `${y}px`);
    
    setActiveApp(type);
    sessionStorage.setItem('mobile_active_app', type);
  };

  const closeApp = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveApp(null);
      setIsClosing(false);
      sessionStorage.removeItem('mobile_active_app');
    }, 350);
  };

  const swipeStartY = useRef(0);
  const isSwipingCC = useRef(false);

  const handleStatusTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    swipeStartY.current = clientY;
    isSwipingCC.current = true;
  };

  const handleStatusTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isSwipingCC.current) return;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const diff = clientY - swipeStartY.current;
    if (diff > 20) {
      setIsControlCenterOpen(true);
      isSwipingCC.current = false;
    }
  };

  const handleStatusTouchEnd = () => {
    isSwipingCC.current = false;
  };

  return (
    <div className="mobile-home-container" style={{ backgroundImage: `url(${wallpaper})` }}>
      {/* iOS Fixed Top Status Bar with Control Center Gesture Trigger */}
      <div 
        className={`iphone-status-bar ${activeApp ? 'status-app-open' : ''}`}
        onClick={() => setIsControlCenterOpen(true)}
        onTouchStart={handleStatusTouchStart}
        onTouchMove={handleStatusTouchMove}
        onTouchEnd={handleStatusTouchEnd}
        onMouseDown={handleStatusTouchStart}
        onMouseMove={handleStatusTouchMove}
        onMouseUp={handleStatusTouchEnd}
      >
        <div className="status-left">
          <span className="time">{formattedTime}</span>
          <span className="mute-bell-icon">🔔</span>
        </div>
        
        {/* Interactive Dynamic Island Cutout */}
        <div 
          className={`dynamic-island island-${islandMode}`} 
          onClick={(e) => { e.stopPropagation(); handleIslandClick(); }}
        >
          <div className="island-inner-content">
            {islandMode === 'unlock' && (
              <div className="island-unlock-status">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="#30D158">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="island-text">Unlocked</span>
              </div>
            )}
            
            {islandMode === 'silent' && (
              <div className="island-silent-status">
                <span className="silent-bell">🔔</span>
                <span className="island-text">Silent</span>
              </div>
            )}
            
            {islandMode === 'music' && currentTrack && (
              <div className="island-music-status">
                <img 
                  src={currentTrack.cover || Icons.music} 
                  className="island-album-art" 
                  alt="" 
                />
                <div className="island-music-waveform">
                  <div className="wave-bar bar-1"></div>
                  <div className="wave-bar bar-2"></div>
                  <div className="wave-bar bar-3"></div>
                </div>
              </div>
            )}

            {islandMode === 'normal' && (
              <div className="island-indicator"></div>
            )}
          </div>
        </div>

        <div className="status-right">
          <img src={Icons.wifi} className="status-icon" alt="" />
          <span className="network-type">5G</span>
          <div className="battery-container">
             <span className="battery-pct">42</span>
             <div className="battery-icon-wrapper">
                <div className="battery-level" style={{ width: '42%' }}></div>
             </div>
          </div>
        </div>
      </div>

      {/* Control Center Overlay Component */}
      <MobileControlCenter 
        isOpen={isControlCenterOpen} 
        onClose={() => setIsControlCenterOpen(false)} 
      />

      {/* Main Home Screen Scrollable Area */}
      <div className="home-screen-scroll-area">
        {/* iOS 18 Widgets Column */}
        <div className="widgets-column-ios18">
          <MobileMusicWidget onClick={(e) => openApp('music', e)} />
          <MobileRemindersWidget />
        </div>

        {/* Home Screen App Grid matching reference image */}
        <div className="iphone-home-screen-grid">
          {apps.map((app) => (
            <div 
              key={app.type} 
              className="ios-app-icon"
              onClick={(e) => app.onClick ? app.onClick() : openApp(app.type, e)}
            >
              <div className="icon-wrapper">
                <img src={app.icon} alt={app.name} />
              </div>
              <span className="app-label">{app.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Dock matching reference image */}
      <div className="iphone-dock-wrapper">
        <div className="iphone-dock">
          <div className="dock-item" onClick={(e) => openApp('safari', e)}>
            <img src={Icons.safari} alt="Safari" />
          </div>
          <div className="dock-item" onClick={(e) => openApp('portfolio', e)}>
            <img src={Icons.portfolio} alt="Meet Uday" />
          </div>
          <div className="dock-item" onClick={(e) => openApp('music', e)}>
            <img src={Icons.music} alt="Music" />
          </div>
          <div className="dock-item" onClick={(e) => openApp('settings', e)}>
            <img src={Icons.settings} alt="Settings" />
          </div>
        </div>
      </div>

      {/* Global iOS Bottom Home Indicator Bar */}
      <div 
        className={`home-indicator-global ${activeApp ? 'app-open' : ''}`} 
        onClick={activeApp ? closeApp : undefined}
      ></div>

      {/* App Overlay */}
      {activeApp && (
        <div className={`mobile-app-overlay ${isClosing ? 'closing' : ''} mobile-app-${activeApp}`}>
          <div className="app-header">
            <button className="back-button" onClick={closeApp}>
              <span className="back-arrow">‹</span>
              <span>Back</span>
            </button>
            <h2 className="app-header-title">{apps.find(a => a.type === activeApp)?.name}</h2>
            <div className="header-right-placeholder"></div>
          </div>
          <div className="app-content-mobile">
            {apps.find(a => a.type === activeApp)?.component}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileHome;

