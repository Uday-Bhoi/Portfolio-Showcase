import React, { useState, useEffect, useMemo } from 'react';
import { Icons } from '../../assets/icons';
import MobileMusicWidget from './MobileMusicWidget';
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

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = useMemo(() => {
    // 24-hour style format for status bar
    return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });
  }, [time]);

  const apps = [
    { type: 'safari', name: 'Safari', icon: Icons.safari, component: <InternetExplorer /> },
    { type: 'portfolio', name: 'Meet Uday', icon: Icons.portfolio, component: <Portfolio /> },
    { type: 'music', name: 'Music', icon: Icons.music, component: <Music /> },
    { type: 'resume', name: 'Resume', icon: Icons.resume, component: <Resume /> },
    { type: 'settings', name: 'Settings', icon: Icons.settings, component: <Settings /> },
    { type: 'github', name: 'GitHub', icon: Icons.github, onClick: () => window.open('https://github.com/Uday-Bhoi', '_blank') },
  ];

  const dockApps = [
    { type: 'safari', icon: Icons.safari },
    { type: 'portfolio', icon: Icons.portfolio },
    { type: 'music', icon: Icons.music },
    { type: 'settings', icon: Icons.settings },
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
    }, 350); // Match CSS close animation duration
  };

  return (
    <div className="mobile-home-container" style={{ backgroundImage: `url(${wallpaper})` }}>
      {/* iOS Fixed Status Bar */}
      <div className={`iphone-status-bar ${activeApp ? 'status-app-open' : ''}`}>
        <span className="time">{formattedTime}</span>
        <div className="dynamic-island">
            <div className="island-content">
                <div className="island-indicator"></div>
            </div>
        </div>
        <div className="status-right">
          <img src={Icons.wifi} className="status-icon" alt="" />
          <span className="network-type">5G</span>
          <div className="battery-container">
             <span className="battery-pct">88%</span>
             <div className="battery-icon-wrapper">
               <div className="battery-level" style={{ width: '88%' }}></div>
             </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Music Widget */}
      <div className="mobile-hero-section">
          <MobileMusicWidget onClick={(e) => openApp('music', e)} />
      </div>

      {/* Home Screen Grid */}
      <div className="iphone-home-screen">
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

      {/* Dock */}
      <div className="iphone-dock-wrapper">
        <div className="iphone-dock">
          {dockApps.map((dockApp) => (
            <div 
              key={dockApp.type} 
              className="dock-item"
              onClick={(e) => openApp(dockApp.type, e)}
            >
              <img src={dockApp.icon} alt="" />
            </div>
          ))}
        </div>
      </div>

      {/* Global iOS Bottom Home Indicator Gesture Bar */}
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
