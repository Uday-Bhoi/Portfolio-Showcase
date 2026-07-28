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
    const [isFontsLoaded, setIsFontsLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;

        if ('fonts' in document) {
            document.fonts.ready.then(() => {
                if (isMounted) setIsFontsLoaded(true);
            }).catch(() => {
                if (isMounted) setIsFontsLoaded(true);
            });
        } else {
            queueMicrotask(() => {
                if (isMounted) setIsFontsLoaded(true);
            });
        }

        if (preloadImage) {
            const img = new Image();
            img.src = preloadImage;
            img.onload = () => { if (isMounted) setIsImageLoaded(true); };
            img.onerror = () => { if (isMounted) setIsImageLoaded(true); };
        } else {
            queueMicrotask(() => {
                if (isMounted) setIsImageLoaded(true);
            });
        }

        return () => {
            isMounted = false;
        };
    }, [preloadImage]);

    useEffect(() => {
        const duration = 2400;
        const interval = 30;
        const step = 100 / (duration / interval);

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    if (isImageLoaded && isFontsLoaded) {
                        clearInterval(timer);
                        setTimeout(() => {
                            setIsFadingOut(true);
                            setTimeout(onBootComplete, 600);
                        }, 300);
                        return 100;
                    }
                    return 99;
                }
                return Math.min(prev + step, 100);
            });
        }, interval);

        const preventDefault = (e: Event) => e.preventDefault();
        window.addEventListener('keydown', preventDefault);
        window.addEventListener('contextmenu', preventDefault);

        return () => {
            clearInterval(timer);
            window.removeEventListener('keydown', preventDefault);
            window.removeEventListener('contextmenu', preventDefault);
        };
    }, [onBootComplete, isImageLoaded, isFontsLoaded]);

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
