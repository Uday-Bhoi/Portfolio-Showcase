import React from 'react';
import './MobilePinterestWidget.css';

const MobilePinterestWidget: React.FC = () => {
  const images = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
  ];

  return (
    <div className="pinterest-widget-wrapper">
      <div className="pinterest-widget-card">
        {images.map((url, idx) => (
          <div key={idx} className="pinterest-photo-item">
            <img src={url} alt={`Gallery item ${idx + 1}`} />
          </div>
        ))}
      </div>
      <span className="widget-caption-label">Pinterest</span>
    </div>
  );
};

export default MobilePinterestWidget;
