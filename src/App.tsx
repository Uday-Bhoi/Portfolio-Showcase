import React, { useState, useEffect } from 'react';
import DesktopUI from './components/DesktopUI';
import MobileUI from './components/MobileUI';
import BootScreen from './components/BootScreen/BootScreen';
import macosWallpaper from './assets/Wallpapers/macos-wall.jpg';
import { useOSStore } from './store/osStore';

import AudioEngine from './core/AudioEngine';

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isBooting, setIsBooting] = useState(true);
  const { openWindow, theme } = useOSStore();

  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
    document.body.className = `theme-${theme}`;
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div style={{ opacity: isBooting ? 0 : 1, transition: 'opacity 0.6s ease-in-out', width: '100%', height: '100%' }}>
        {isMobile ? <MobileUI /> : <DesktopUI />}
      </div>
      {isBooting && (
        <BootScreen
          preloadImage={macosWallpaper}
          onBootComplete={() => {
            setIsBooting(false);
            // Automatically open portfolio on startup for desktop
            if (window.innerWidth > 768) {
              setTimeout(() => {
                openWindow('portfolio', 'meetuday.exe');
              }, 300);
            }
          }}
        />
      )}
      <AudioEngine />
    </>
  );
};

export default App;
