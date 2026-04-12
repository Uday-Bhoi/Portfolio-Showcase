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
  const { openWindow } = useOSStore();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isBooting) {
    return (
      <BootScreen
        preloadImage={macosWallpaper}
        onBootComplete={() => {
          setIsBooting(false);
          // Automatically open portfolio on startup for desktop
          if (window.innerWidth > 768) {
            setTimeout(() => {
              openWindow('portfolio', 'meetuday.exe');
            }, 500);
          }
        }}
      />
    );
  }

  return (
    <>
      {isMobile ? <MobileUI /> : <DesktopUI />}
      <AudioEngine />
    </>
  );
};

export default App;
