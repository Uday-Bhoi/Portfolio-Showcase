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
  const [activeApp, setActiveApp] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = useMemo(() => {
    return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
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

  return (
    <div className="mobile-home-container" style={{ backgroundImage: `url(${wallpaper})` }}>
      {/* Status Bar */}
      <div className="iphone-status-bar">
        <span className="time">{formattedTime.split(' ')[0]}</span>
        <div className="dynamic-island">
            <div className="island-content">
                <div className="island-indicator"></div>
            </div>
        </div>
        <div className="status-right">
          <img src={Icons.wifi} className="status-icon" alt="" />
          <span className="network-type">5G</span>
          <img src={Icons.battery} className="status-icon" alt="" style={{ width: '25px', filter: 'none' }} />
        </div>
      </div>

      {/* Hero Section - Music Widget */}
      <div className="mobile-hero-section">
          <MobileMusicWidget />
      </div>

      {/* Home Screen Grid */}
      <div className="iphone-home-screen">
        {apps.map((app) => (
          <div 
            key={app.type} 
            className="ios-app-icon"
            onClick={() => app.onClick ? app.onClick() : setActiveApp(app.type)}
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
              onClick={() => setActiveApp(dockApp.type)}
            >
              <img src={dockApp.icon} alt="" />
            </div>
          ))}
        </div>
      </div>

      <div className="home-indicator"></div>

      {/* App Overlay */}
      {activeApp && (
        <div className="mobile-app-overlay">
          <div className="app-header">
            <button className="back-button" onClick={() => setActiveApp(null)}>
              <span style={{ fontSize: '24px', marginRight: '4px' }}>‹</span>
              Home
            </button>
            <h2>{apps.find(a => a.type === activeApp)?.name}</h2>
          </div>
          <div className="app-content-mobile">
            {apps.find(a => a.type === activeApp)?.component}
            <div className="home-indicator" onClick={() => setActiveApp(null)} style={{ cursor: 'pointer', background: 'rgba(0,0,0,0.1)' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileHome;
