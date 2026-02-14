import React, { useState, useEffect } from 'react';
import './BootScreen.css';
import { Icons } from '../../assets/icons';

interface BootScreenProps {
    onBootComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        const duration = 3000; // 3 seconds
        const interval = 30; // Update every 30ms
        const step = 100 / (duration / interval);

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        setIsFadingOut(true);
                        setTimeout(onBootComplete, 800);
                    }, 500);
                    return 100;
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
