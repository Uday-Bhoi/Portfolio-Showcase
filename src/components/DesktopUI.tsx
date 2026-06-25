import React, { useState, useEffect, useMemo } from 'react';
import { Icons } from '../assets/icons';
import { useOSStore } from '../store/osStore';
import type { AppType } from '../types/os';
import Window from './Window/Window';
import Launchpad from './Launchpad/Launchpad';

// App Components
import InternetExplorer from '../apps/InternetExplorer'; // Safari
import MyComputer from '../apps/MyComputer'; // Finder
import Portfolio from '../apps/Portfolio';
import Music from '../apps/Music/Music';
import Settings from '../apps/Settings/Settings';
import Resume from '../apps/Resume';
import MusicWidget from './MusicWidget/MusicWidget';
import NowPlaying from './NowPlaying/NowPlaying';
import CalendarWidget from './CalendarWidget/CalendarWidget';
import BatteryIndicator from './BatteryIndicator/BatteryIndicator';

const MENU_DATA: Record<string, { label: string; items: { label: string; shortcut?: string; divider?: boolean }[] }> = {
  apple: {
    label: '',
    items: [
      { label: 'About This Mac' },
      { label: '', divider: true },
      { label: 'System Settings...', shortcut: '⌘,' },
      { label: 'App Store...', shortcut: '⌘A' },
      { label: '', divider: true },
      { label: 'Recent Items' },
      { label: '', divider: true },
      { label: 'Force Quit...', shortcut: '⌥⌘⎋' },
      { label: '', divider: true },
      { label: 'Sleep' },
      { label: 'Restart...' },
      { label: 'Shut Down...' },
      { label: '', divider: true },
      { label: 'Lock Screen', shortcut: '⌃⌘Q' },
      { label: 'Log Out...', shortcut: '⇧⌘Q' }
    ]
  },
  finder: {
    label: 'Finder',
    items: [
      { label: 'About Finder' },
      { label: '', divider: true },
      { label: 'Preferences...', shortcut: '⌘,' },
      { label: '', divider: true },
      { label: 'Empty Trash...', shortcut: '⇧⌘⌫' },
      { label: '', divider: true },
      { label: 'Hide Finder', shortcut: '⌘H' },
      { label: 'Hide Others', shortcut: '⌥⌘H' },
      { label: 'Show All' }
    ]
  },
  file: {
    label: 'File',
    items: [
      { label: 'New Finder Window', shortcut: '⌘N' },
      { label: 'New Folder', shortcut: '⇧⌘N' },
      { label: 'New Smart Folder' },
      { label: 'New Tab', shortcut: '⌘T' },
      { label: 'Open', shortcut: '⌘O' },
      { label: 'Open With' },
      { label: 'Print', shortcut: '⌘P' },
      { label: '', divider: true },
      { label: 'Close Window', shortcut: '⌘W' }
    ]
  },
  edit: {
    label: 'Edit',
    items: [
      { label: 'Undo', shortcut: '⌘Z' },
      { label: 'Redo', shortcut: '⇧⌘Z' },
      { label: '', divider: true },
      { label: 'Cut', shortcut: '⌘X' },
      { label: 'Copy', shortcut: '⌘C' },
      { label: 'Paste', shortcut: '⌘V' },
      { label: 'Select All', shortcut: '⌘A' },
      { label: '', divider: true },
      { label: 'Show Clipboard' },
      { label: '', divider: true },
      { label: 'Start Dictation...' },
      { label: 'Emoji & Symbols', shortcut: '⌃⌘Space' }
    ]
  },
  view: {
    label: 'View',
    items: [
      { label: 'as Icons', shortcut: '⌘1' },
      { label: 'as List', shortcut: '⌘2' },
      { label: 'as Columns', shortcut: '⌘3' },
      { label: 'as Gallery', shortcut: '⌘4' },
      { label: '', divider: true },
      { label: 'Hide Sidebar', shortcut: '⌃⌘S' },
      { label: 'Show Preview', shortcut: '⇧⌘P' },
      { label: '', divider: true },
      { label: 'Enter Full Screen', shortcut: '⌃⌘F' }
    ]
  },
  go: {
    label: 'Go',
    items: [
      { label: 'Back', shortcut: '⌘[' },
      { label: 'Forward', shortcut: '⌘]' },
      { label: 'Enclosing Folder', shortcut: '⌘↑' },
      { label: '', divider: true },
      { label: 'Recents', shortcut: '⇧⌘F' },
      { label: 'Documents', shortcut: '⇧⌘O' },
      { label: 'Desktop', shortcut: '⇧⌘D' },
      { label: 'Downloads', shortcut: '⌥⌘L' },
      { label: 'Home', shortcut: '⇧⌘H' },
      { label: 'Computer', shortcut: '⇧⌘C' },
      { label: 'AirDrop', shortcut: '⇧⌘R' },
      { label: 'Network', shortcut: '⇧⌘K' },
      { label: 'iCloud Drive', shortcut: '⇧⌘I' },
      { label: 'Applications', shortcut: '⇧⌘A' },
      { label: 'Utilities', shortcut: '⇧⌘U' },
      { label: '', divider: true },
      { label: 'Go to Folder...', shortcut: '⇧⌘G' },
      { label: 'Connect to Server...', shortcut: '⌘K' }
    ]
  },
  window: {
    label: 'Window',
    items: [
      { label: 'Minimize', shortcut: '⌘M' },
      { label: 'Zoom' },
      { label: 'Move Window to Left Side of Screen' },
      { label: 'Move Window to Right Side of Screen' },
      { label: '', divider: true },
      { label: 'Cycle Through Windows', shortcut: '⌘`' },
      { label: '', divider: true },
      { label: 'Bring All to Front' }
    ]
  },
  help: {
    label: 'Help',
    items: [
      { label: 'Search' },
      { label: 'macOS Help' }
    ]
  }
};

import WallpaperEngine from './WallpaperEngine';

const DesktopUI: React.FC = () => {
  const {
    windows,
    openWindow,
    activeApp,
    toggleLaunchpad,
    theme
  } = useOSStore();

  const [time, setTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    // Real-time Clock
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const apps = useMemo(() => [
    { type: 'finder', name: 'Finder', icon: Icons.finder },
    { type: 'launchpad', name: 'Launchpad', icon: Icons.launchpad },
    { type: 'safari', name: 'Safari', icon: Icons.safari },
    { type: 'portfolio', name: 'Portfolio', icon: Icons.portfolio },
    { type: 'music', name: 'Music', icon: Icons.music },
    { type: 'settings', name: 'Settings', icon: Icons.settings },
    { type: 'trash', name: 'Trash', icon: Icons.trash },
  ], []);

  const renderAppContent = (type: string) => {
    switch (type) {
      case 'finder': return <MyComputer />;
      case 'safari': return <InternetExplorer />;
      case 'portfolio': return <Portfolio />;
      case 'music': return <Music />;
      case 'resume': return <Resume />;
      case 'settings': return <Settings />;
      case 'trash': return <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Trash is empty</div>;
      default: return <div style={{ padding: '20px' }}>{type} content coming soon</div>;
    }
  };

  // Format date like reference: Fri Sep 5  1:21 PM
  const formattedDate = useMemo(() => {
    const weekday = time.toLocaleDateString('en-US', { weekday: 'short' });
    const month = time.toLocaleDateString('en-US', { month: 'short' });
    const day = time.getDate();
    const clock = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${weekday} ${month} ${day}  ${clock}`;
  }, [time]);

  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    if (activeMenu) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [activeMenu]);

  const isAnyWindowMaximized = useMemo(() => windows.some(win => win.isMaximized && !win.isMinimized), [windows]);

  return (
    <div className={`desktop fade-in-desktop theme-${theme}`}>
      <WallpaperEngine />
      {/* 1. macOS Top Menu Bar - Clean horizontal bar, no notch */}
      <nav className="menu-bar">
        <div className="menu-left">
          <div className="menu-item-container">
            <img
              src={Icons.apple}
              className={`apple-logo ${activeMenu === 'apple' ? 'active' : ''}`}
              alt="Apple"
              onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'apple' ? null : 'apple'); }}
              onMouseEnter={() => activeMenu && setActiveMenu('apple')}
            />
            {activeMenu === 'apple' && (
              <div className="menu-dropdown" style={{ left: 0 }}>
                {MENU_DATA.apple.items.map((item, i) => (
                  item.divider ? <div key={i} className="dropdown-divider" /> :
                    <div key={i} className="dropdown-item">
                      <span>{item.label}</span>
                      {item.shortcut && <span className="dropdown-shortcut">{item.shortcut}</span>}
                    </div>
                ))}
              </div>
            )}
          </div>

          <div className="menu-item-container">
            <span
              className={`menu-item bold ${activeMenu === 'finder' ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'finder' ? null : 'finder'); }}
              onMouseEnter={() => activeMenu && setActiveMenu('finder')}
            >
              {activeApp || 'Finder'}
            </span>
            {activeMenu === 'finder' && (
              <div className="menu-dropdown" style={{ left: 0 }}>
                {MENU_DATA.finder.items.map((item, i) => (
                  item.divider ? <div key={i} className="dropdown-divider" /> :
                    <div key={i} className="dropdown-item">
                      <span>{item.label}</span>
                      {item.shortcut && <span className="dropdown-shortcut">{item.shortcut}</span>}
                    </div>
                ))}
              </div>
            )}
          </div>

          {['file', 'edit', 'view', 'go', 'window', 'help'].map((m) => (
            <div key={m} className="menu-item-container hide-on-mobile">
              <span
                className={`menu-item ${activeMenu === m ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === m ? null : m); }}
                onMouseEnter={() => activeMenu && setActiveMenu(m)}
              >
                {MENU_DATA[m].label}
              </span>
              {activeMenu === m && (
                <div className="menu-dropdown">
                  {MENU_DATA[m].items.map((item, i) => (
                    item.divider ? <div key={i} className="dropdown-divider" /> :
                      <div key={i} className="dropdown-item">
                        <span>{item.label}</span>
                        {item.shortcut && <span className="dropdown-shortcut">{item.shortcut}</span>}
                      </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="menu-right">
          <div className="system-icon-group" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <NowPlaying />
            
            {/* AirPlay Icon */}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="system-icon">
              <title>AirPlay</title>
              <rect x="3" y="4" width="18" height="12" rx="2" />
              <path d="M12 16L8 20H16L12 16Z" fill="currentColor" />
            </svg>

            {/* Bluetooth Icon */}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="system-icon">
              <title>Bluetooth</title>
              <path d="M6.5 6.5L17.5 17.5L12 23V1L17.5 6.5L6.5 17.5" />
            </svg>

            {/* WiFi Icon */}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="system-icon">
              <title>WiFi</title>
              <path d="M12 18h.01" strokeWidth="3" />
              <path d="M8.5 14.5a5 5 0 0 1 7 0" />
              <path d="M5 11.5a10 10 0 0 1 14 0" />
              <path d="M1.5 8.5a15 15 0 0 1 21 0" />
            </svg>

            <BatteryIndicator />

            {/* Spotlight Search Icon */}
            <svg 
              viewBox="0 0 24 24" 
              width="16" height="16" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="system-icon cursor-pointer" 
              onClick={() => toggleLaunchpad(true)}
            >
              <title>Spotlight</title>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            {/* Control Center Icon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', position: 'relative' }}>
              <svg 
                viewBox="0 0 24 24" 
                width="16" height="16" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="system-icon cursor-pointer" 
                onClick={() => openWindow('settings', 'System Settings')}
              >
                <title>System Settings</title>
                <line x1="4" y1="21" x2="4" y2="14" />
                <line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" />
                <line x1="20" y1="12" x2="20" y2="3" />
                <line x1="2" y1="14" x2="6" y2="14" />
                <line x1="10" y1="8" x2="14" y2="8" />
                <line x1="18" y1="16" x2="22" y2="16" />
              </svg>
              <div className="notification-dot"></div>
            </div>
          </div>
          <span className="menu-time">{formattedDate}</span>
        </div>
      </nav>

      {/* 2. Desktop Workspace Content - Widgets removed */}
      <main className="desktop-content">
        <div className={`widgets-layer ${isAnyWindowMaximized ? 'behind-windows' : ''}`}>
          <MusicWidget />
          <CalendarWidget />
        </div>
        {/* Desktop Folder Icon */}
        <div className="desktop-icons">
          <div className="mac-icon" onDoubleClick={() => openWindow('finder', 'Finder')}>
            <img src={Icons.folder} alt="Files" />
            <span>Files</span>
          </div>
          <div className="mac-icon" onDoubleClick={() => openWindow('portfolio', 'meetuday.exe')}>
            <img src={Icons.portfolio} alt="Portfolio" />
            <span>meetuday.exe</span>
          </div>
          <div className="mac-icon" onClick={() => window.open('https://github.com/Uday-Bhoi', '_blank')}>
            <img src={Icons.github} alt="GitHub" />
            <span>GitHub</span>
          </div>
          <div className="mac-icon" onClick={() => openWindow('resume', 'Resume.pdf')}>
            <img src={Icons.resume} alt="Resume" />
            <span>Resume.pdf</span>
          </div>
        </div>

        {/* Dynamic Windows Rendering */}
        <div className="windows-layer">
          {windows.map((win) => (
            <Window
              key={win.id}
              id={win.id}
              title={win.title}
              zIndex={win.zIndex}
              isMinimized={win.isMinimized}
              isMaximized={win.isMaximized}
            >
              {renderAppContent(win.type)}
            </Window>
          ))}
        </div>
      </main>

      <Launchpad />

      {/* 3. Bottom macOS Dock */}
      <section className={`dock-container ${isAnyWindowMaximized ? 'full-screen' : ''}`}>
        <div className="dock">
          {apps.map(app => {
            const isOpen = windows.some(win => win.type === app.type);
            return (
              <div
                key={app.type}
                className={`dock-item ${isOpen ? 'active' : ''}`}
                onClick={() => {
                  if (app.type === 'launchpad') {
                    toggleLaunchpad();
                  } else {
                    openWindow(app.type as AppType, app.name);
                  }
                }}
              >
                <img src={app.icon} alt={app.name} />
                <div className="dock-tooltip">{app.name}</div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default DesktopUI;
