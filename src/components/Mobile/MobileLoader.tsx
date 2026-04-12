import React, { useEffect, useState } from 'react';
import './MobileLoader.css';

const GREETINGS = ['Namaste', 'Hello', 'Hola', 'Bonjour', 'Ciao', 'Konnichiwa'];

const MobileLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 400);

    const finishTimer = setTimeout(() => {
        onComplete();
    }, 2500);

    return () => {
        clearInterval(timer);
        clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className="mobile-loader">
      <div className="greeting-text animate-greeting">
        {GREETINGS[index]}
      </div>
    </div>
  );
};

export default MobileLoader;
