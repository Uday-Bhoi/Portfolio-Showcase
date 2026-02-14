import React from 'react';
import { useMusicStore } from '../../store/musicStore';
import { useOSStore } from '../../store/osStore';
import './MusicWidget.css';

const MusicWidget: React.FC = () => {
    const {
        currentTrackId,
        tracks,
        isPlaying,
        togglePlay,
        nextTrack,
        prevTrack,
        volume,
        setVolume,
        currentTime,
        duration
    } = useMusicStore();
    const { openWindow } = useOSStore();

    const currentTrack = tracks.find(t => t.id === currentTrackId);

    return (
        <div className="music-widget" onClick={() => openWindow('music', 'Music')}>
            <div className="widget-content">
                {currentTrack ? (
                    <>
                        <img src={currentTrack.cover} alt={currentTrack.title} className="widget-cover" />
                        <div className="widget-info">
                            <div className="widget-title">{currentTrack.title}</div>
                            <div className="widget-artist">{currentTrack.artist}</div>
                        </div>
                        <div className="widget-controls" onClick={(e) => e.stopPropagation()}>
                            <button onClick={prevTrack} className="widget-btn mini">
                                <span className="material-icons">skip_previous</span>
                            </button>
                            <button onClick={() => togglePlay()} className="widget-btn main">
                                <span className="material-icons">{isPlaying ? 'pause' : 'play_arrow'}</span>
                            </button>
                            <button onClick={nextTrack} className="widget-btn mini">
                                <span className="material-icons">skip_next</span>
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="widget-empty">
                        <span className="material-icons widget-icon-large">music_note</span>
                        <div className="widget-info">
                            <div className="widget-title">Apple Music</div>
                            <div className="widget-artist">Select a track to start</div>
                        </div>
                    </div>
                )}
            </div>

            {currentTrack && (
                <div className="widget-footer" onClick={(e) => e.stopPropagation()}>
                    <div className="widget-progress-container">
                        <div
                            className="widget-progress-bar"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                        ></div>
                    </div>
                    <div className="widget-volume-row">
                        <span className="material-icons mini-vol-icon">volume_down</span>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="widget-volume-slider"
                        />
                        <span className="material-icons mini-vol-icon">volume_up</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MusicWidget;
