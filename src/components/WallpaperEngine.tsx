import React, { memo } from 'react';
import { useOSStore } from '../store/osStore';
import LightPillar from './Backgrounds/LightPillar/LightPillar';
import FloatingLines from './Backgrounds/FloatingLines/FloatingLines';
import macosWallpaper from '../assets/Wallpapers/macos-wall.jpg';

const WallpaperEngine: React.FC = () => {
    const theme = useOSStore(state => state.theme);
    const wallpaper = useOSStore(state => state.wallpaper);

    return (
        <div className="background-layer">
            <div
                className={`wallpaper-static ${wallpaper === 'standard' ? 'visible' : ''}`}
                style={{ backgroundImage: `url(${macosWallpaper})` }}
            />
            {wallpaper === 'light-pillar' && (
                <div className="wallpaper-animated">
                    <LightPillar
                        topColor={theme === 'dark' ? '#1a1a2e' : '#5227FF'}
                        bottomColor={theme === 'dark' ? '#16213e' : '#FF9FFC'}
                        intensity={0.8}
                        rotationSpeed={0.2}
                        interactive={true}
                    />
                </div>
            )}
            {wallpaper === 'floating-lines' && (
                <div className="wallpaper-animated">
                    <FloatingLines
                        enabledWaves={["top", "middle", "bottom"]}
                        lineCount={5}
                        lineDistance={5}
                        bendRadius={5}
                        bendStrength={-0.5}
                        interactive={true}
                        parallax={true}
                        linesGradient={theme === 'dark' ? ['#000000', '#2d3436', '#636e72'] : undefined}
                    />
                </div>
            )}
        </div>
    );
};

export default memo(WallpaperEngine);
