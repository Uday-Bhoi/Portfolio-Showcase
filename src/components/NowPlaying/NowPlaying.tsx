import React from 'react';
import { useMusicStore } from '../../store/musicStore';
import './NowPlaying.css';

const NowPlaying: React.FC = () => {
    const { isPlaying, currentTrackId, togglePlay } = useMusicStore();

    if (!currentTrackId) return null;

    return (
        <div className="system-tray-music" onClick={() => togglePlay()}>
            <span className="material-icons music-note-icon">
                {isPlaying ? 'music_note' : 'play_arrow'}
            </span>
            {isPlaying && (
                <div className="music-bars-mini">
                    <div className="bar-mini"></div>
                    <div className="bar-mini"></div>
                    <div className="bar-mini"></div>
                </div>
            )}
        </div>
    );
};

export default NowPlaying;
