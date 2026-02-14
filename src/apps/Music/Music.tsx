import React from 'react';
import { useMusicStore } from '../../store/musicStore';
import './Music.css';

const Music: React.FC = () => {
    const {
        tracks,
        currentTrackId,
        isPlaying,
        playTrack,
        togglePlay,
        nextTrack,
        prevTrack,
        volume,
        setVolume,
        currentTime,
        duration,
        setProgress,
        isShuffle,
        toggleShuffle,
        loopMode,
        setLoopMode
    } = useMusicStore();

    const currentTrack = tracks.find(t => t.id === currentTrackId);

    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProgress(parseFloat(e.target.value));
    };

    return (
        <div className="music-app">
            <div className="music-sidebar">
                <div className="sidebar-group">
                    <h3>Apple Music</h3>
                    <div className="sidebar-item active">
                        <span className="material-icons">play_circle_filled</span>
                        Listen Now
                    </div>
                    <div className="sidebar-item">
                        <span className="material-icons">grid_view</span>
                        Browse
                    </div>
                    <div className="sidebar-item">
                        <span className="material-icons">radio</span>
                        Radio
                    </div>
                </div>
                <div className="sidebar-group">
                    <h3>Library</h3>
                    <div className="sidebar-item">
                        <span className="material-icons">history</span>
                        Recently Added
                    </div>
                    <div className="sidebar-item">
                        <span className="material-icons">person</span>
                        Artists
                    </div>
                    <div className="sidebar-item">
                        <span className="material-icons">album</span>
                        Albums
                    </div>
                    <div className="sidebar-item">
                        <span className="material-icons">music_note</span>
                        Songs
                    </div>
                </div>
            </div>

            <div className="music-main">
                {/* Modern Apple Music Header with Controls */}
                <div className="music-player-header">
                    <div className="playback-center">
                        <div className="main-controls">
                            <button onClick={toggleShuffle} className={`control-btn secondary ${isShuffle ? 'active' : ''}`}>
                                <span className="material-icons">shuffle</span>
                            </button>
                            <button onClick={prevTrack} className="control-btn">
                                <span className="material-icons">skip_previous</span>
                            </button>
                            <button onClick={() => togglePlay()} className="control-btn play-btn">
                                <span className="material-icons">
                                    {isPlaying ? 'pause' : 'play_arrow'}
                                </span>
                            </button>
                            <button onClick={nextTrack} className="control-btn">
                                <span className="material-icons">skip_next</span>
                            </button>
                            <button
                                onClick={() => setLoopMode(loopMode === 'all' ? 'one' : loopMode === 'one' ? 'none' : 'all')}
                                className={`control-btn secondary ${loopMode !== 'none' ? 'active' : ''}`}
                            >
                                <span className="material-icons">
                                    {loopMode === 'one' ? 'repeat_one' : 'repeat'}
                                </span>
                            </button>
                        </div>

                        <div className="player-display">
                            {currentTrack && isPlaying ? (
                                <div className="display-info">
                                    <span className="display-title">{currentTrack.title}</span>
                                    <span className="display-sep">—</span>
                                    <span className="display-artist">{currentTrack.artist}</span>
                                </div>
                            ) : (
                                <div className="display-logo">
                                    <span className="material-icons">apple</span>
                                    <span>Music</span>
                                </div>
                            )}

                            <div className="progress-bar-wrap">
                                <span className="time-label">{formatTime(currentTime)}</span>
                                <input
                                    type="range"
                                    min="0"
                                    max={duration || 0}
                                    value={currentTime}
                                    onChange={handleProgressChange}
                                    className="progress-slider"
                                />
                                <span className="time-label">-{formatTime((duration || 0) - currentTime)}</span>
                            </div>
                        </div>

                        <div className="volume-wrap">
                            <span className="material-icons">volume_down</span>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="volume-slider"
                            />
                            <span className="material-icons">volume_up</span>
                        </div>
                    </div>
                </div>

                <div className="music-content-area">
                    <div className="content-hero">
                        {currentTrack ? (
                            <div className="hero-flex">
                                <div className="hero-cover-wrap">
                                    {currentTrack.cover ? (
                                        <img src={currentTrack.cover} alt={currentTrack.title} className="hero-cover" />
                                    ) : (
                                        <div className="hero-cover fallback">
                                            <span className="material-icons">music_note</span>
                                        </div>
                                    )}
                                </div>
                                <div className="hero-details">
                                    <h1 className="hero-title">{currentTrack.title}</h1>
                                    <p className="hero-artist">{currentTrack.artist}</p>
                                    <div className="hero-actions">
                                        <button className="btn-play-all" onClick={() => playTrack(currentTrack.id)}>
                                            <span className="material-icons">play_arrow</span>
                                            Play
                                        </button>
                                        <button className="btn-shuffle" onClick={toggleShuffle}>
                                            <span className="material-icons">shuffle</span>
                                            Shuffle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="no-selection">
                                <span className="material-icons">music_note</span>
                                <p>Select a song to start listening</p>
                            </div>
                        )}
                    </div>

                    <div className="track-list-section">
                        <div className="section-header">
                            <h2>Songs</h2>
                        </div>
                        <div className="track-list-table">
                            <div className="table-header">
                                <span className="col-num">#</span>
                                <span className="col-title">TITLE</span>
                                <span className="col-artist">ARTIST</span>
                                <span className="col-album">ALBUM</span>
                            </div>
                            {tracks.map((track, index) => (
                                <div
                                    key={track.id}
                                    className={`table-row ${currentTrackId === track.id ? 'active' : ''}`}
                                    onDoubleClick={() => playTrack(track.id)}
                                >
                                    <span className="col-num">
                                        {currentTrackId === track.id && isPlaying ? (
                                            <div className="playing-indicator">
                                                <div className="bar"></div>
                                                <div className="bar"></div>
                                                <div className="bar"></div>
                                            </div>
                                        ) : index + 1}
                                    </span>
                                    <div className="col-title">
                                        {track.cover ? (
                                            <img src={track.cover} alt="" className="row-cover" />
                                        ) : (
                                            <div className="row-cover fallback">
                                                <span className="material-icons">music_note</span>
                                            </div>
                                        )}
                                        <span>{track.title}</span>
                                    </div>
                                    <span className="col-artist">{track.artist}</span>
                                    <span className="col-album">Digital Download</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Music;
