import React from 'react';
import './SpotifyWidget.css';

const SpotifyWidget: React.FC = () => {
    return (
        <div className="spotify-widget">
            <iframe
                data-testid="embed-iframe"
                className="spotify-embed"
                src="https://open.spotify.com/embed/playlist/2sYJ6VYlX4bSqaXUHMlDey?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ borderRadius: '12px' }}
            ></iframe>
        </div>
    );
};

export default SpotifyWidget;
