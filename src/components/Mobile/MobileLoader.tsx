import React, { useEffect, useState } from 'react';
import { Icons } from '../../assets/icons';
import './MobileLoader.css';

const MobileLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random incremental steps to feel realistic
        const increment = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        onComplete();
      }, 500); // Hold for a split second after completion
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div className="mobile-loader">
      <div className="boot-content">
        <img 
          src={Icons.apple} 
          alt="Apple Logo" 
          className="apple-logo-img" 
        />
        <div className="ios-progress-bar-container">
          <div className="ios-progress-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default MobileLoader;
