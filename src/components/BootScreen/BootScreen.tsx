import React, { useState, useEffect } from 'react';
import './BootScreen.css';
import { Icons } from '../../assets/icons';

interface BootScreenProps {
    onBootComplete: () => void;
    preloadImage?: string;
}

const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete, preloadImage }) => {
    const [progress, setProgress] = useState(0);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(!preloadImage);

    useEffect(() => {
        if (preloadImage) {
            const img = new Image();
            img.src = preloadImage;
            img.onload = () => setIsImageLoaded(true);
            img.onerror = () => setIsImageLoaded(true); // Continue anyway if load fails
        }
    }, [preloadImage]);

    useEffect(() => {
        const duration = 3000; // 3 seconds
        const interval = 30; // Update every 30ms
        const step = 100 / (duration / interval);

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    // Only finish if image is also loaded
                    if (isImageLoaded) {
                        clearInterval(timer);
                        setTimeout(() => {
                            setIsFadingOut(true);
                            setTimeout(onBootComplete, 800);
                        }, 500);
                        return 100;
                    }
                    return 99; // Hold at 99 until image loads
                }
                return Math.min(prev + step, 100);
            });
        }, interval);

        // Prevent interactions
        const preventDefault = (e: Event) => e.preventDefault();
        window.addEventListener('keydown', preventDefault);
        window.addEventListener('contextmenu', preventDefault);

        return () => {
            clearInterval(timer);
            window.removeEventListener('keydown', preventDefault);
            window.removeEventListener('contextmenu', preventDefault);
        };
    }, [onBootComplete]);

    return (
        <div className={`boot-screen ${isFadingOut ? 'fade-out' : ''}`}>
            <div className="boot-content">
                <img src={Icons.apple} alt="Apple Logo" className="boot-logo" />
                <div className="progress-container">
                    <div
                        className="progress-bar"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default BootScreen;
