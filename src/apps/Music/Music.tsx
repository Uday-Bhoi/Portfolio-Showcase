import React, { useState, useEffect, useRef } from 'react';
import { useMusicStore } from '../../store/musicStore';
import { Icons } from '../../assets/icons';
import { FastAverageColor } from 'fast-average-color';
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
        setLoopMode,
        fetchSpotifyTracks,
        error,
        setError
    } = useMusicStore();

    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        await fetchSpotifyTracks(searchQuery);
        setIsSearching(false);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Initial load with some trending music or the user's favorite
        if (tracks.length <= 1) { // Only if we only have the default track
            fetchSpotifyTracks('The Weeknd');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const currentTrack = tracks.find(t => t.id === currentTrackId) || tracks[0];

    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const [dominantColor, setDominantColor] = useState<string>('rgba(250, 35, 59, 1)');
    const fac = useRef(new FastAverageColor());

    useEffect(() => {
        if (currentTrack?.cover) {
            fac.current.getColorAsync(currentTrack.cover)
                .then(color => {
                    setDominantColor(color.rgba);
                })
                .catch(e => {
                    console.warn('Failed to extract color:', e);
                    setDominantColor('rgba(250, 35, 59, 1)');
                });
        }
    }, [currentTrack?.cover]);

    const [localTime, setLocalTime] = useState<number | null>(null);
    const localTimeRef = useRef<number | null>(null);

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setLocalTime(val);
        localTimeRef.current = val;
    };

    const handleProgressStart = () => {
        const handleGlobalRelease = () => {
            if (localTimeRef.current !== null) {
                setProgress(localTimeRef.current);
                setLocalTime(null);
                localTimeRef.current = null;
            }
            window.removeEventListener('pointerup', handleGlobalRelease);
            window.removeEventListener('touchend', handleGlobalRelease);
        };
        window.addEventListener('pointerup', handleGlobalRelease);
        window.addEventListener('touchend', handleGlobalRelease);
    };

    const displayTime = localTime !== null ? localTime : currentTime;

    const renderDesktop = () => {
        return (
            <div className="music-app" style={{ '--dominant-color': dominantColor } as React.CSSProperties}>
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
                    {/* Modern Apple Music Header (Minimized, just branding and volume) */}
                    <div className="music-player-header minimal">
                        <div className="playback-center">
                            <div className="display-logo">
                                <span className="material-icons">apple</span>
                                <span>Music</span>
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
                                <div className="hero-now-playing">
                                    <div className="hero-left-column">
                                        <div className="hero-cover-wrap">
                                            {currentTrack.cover ? (
                                                <img src={currentTrack.cover} alt={currentTrack.title} className="hero-cover-large" />
                                            ) : (
                                                <div className="hero-cover-large fallback">
                                                    <span className="material-icons">music_note</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="hero-right-column">
                                        <div className="hero-track-info">
                                            <h1 className="hero-title">{currentTrack.title}</h1>
                                            <p className="hero-artist">{currentTrack.artist}</p>
                                        </div>
                                        
                                        {/* Progress Timeline below info */}
                                        <div className="hero-progress-section">
                                            <span className="time-label">{formatTime(displayTime)}</span>
                                            <div className="interactive-progress-bar">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max={duration || 0}
                                                    step="0.01"
                                                    value={displayTime}
                                                    onChange={handleProgressChange}
                                                    onPointerDown={handleProgressStart}
                                                    className="progress-slider-interactive"
                                                />
                                                <div className="progress-fill" style={{ width: `${(displayTime / duration) * 100}%` }}></div>
                                            </div>
                                            <span className="time-label">-{formatTime((duration || 0) - displayTime)}</span>
                                        </div>

                                        {/* Playback Controls below progress */}
                                        <div className="hero-controls-row">
                                            <button onClick={toggleShuffle} className={`hero-btn-secondary ${isShuffle ? 'active' : ''}`}>
                                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>
                                            </button>
                                            <button onClick={prevTrack} className="hero-btn">
                                                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                                            </button>
                                            <button onClick={() => togglePlay()} className="hero-btn-play">
                                                {isPlaying ? (
                                                    <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                                                ) : (
                                                    <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" style={{ marginLeft: '4px' }}><path d="M8 5v14l11-7z"/></svg>
                                                )}
                                            </button>
                                            <button onClick={nextTrack} className="hero-btn">
                                                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                                            </button>
                                            <button
                                                onClick={() => setLoopMode(loopMode === 'all' ? 'one' : loopMode === 'one' ? 'none' : 'all')}
                                                className={`hero-btn-secondary ${loopMode !== 'none' ? 'active' : ''}`}
                                            >
                                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                                    {loopMode === 'one' ? (
                                                        <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z"/>
                                                    ) : (
                                                        <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
                                                    )}
                                                </svg>
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
                                <form onSubmit={handleSearch} className="spotify-search-form">
                                    <span className="material-icons">search</span>
                                    <input
                                        type="text"
                                        placeholder="Search Spotify..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    {isSearching && <div className="search-loader"></div>}
                                </form>
                            </div>

                            {error && (
                                <div className="spotify-error-banner">
                                    <span className="material-icons">error_outline</span>
                                    <span>{error}</span>
                                    <button onClick={() => setError(null)} className="material-icons">close</button>
                                </div>
                            )}

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



    const renderMobile = () => {
        // Group tracks for presentation
        const recentlyPlayed = tracks.slice(0, 3);
        const recommendedTracks = tracks.slice(1, 4);
        const playlists = [
            { name: "My Favorites", count: "12 songs", icon: "favorite", color: "#ff2d55" },
            { name: "Focus & Chill", count: "8 songs", icon: "bolt", color: "#5856d6" },
            { name: "Running / Workout", count: "15 songs", icon: "directions_run", color: "#ff9500" }
        ];

        return (
            <div className="music-app mobile">
                <div className="mobile-player-scroll-container">
                    {/* Header Title */}
                    <div className="mobile-music-header">
                        <h1>Browse</h1>
                        <form onSubmit={handleSearch} className="mobile-spotify-search-form">
                            <span className="material-icons">search</span>
                            <input
                                type="text"
                                placeholder="Search songs, artists, playlists..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {isSearching && <div className="mobile-search-loader"></div>}
                        </form>
                    </div>

                    {error && (
                        <div className="mobile-error-banner">
                            <span className="material-icons">error_outline</span>
                            <span className="err-msg">{error}</span>
                            <button type="button" onClick={() => setError(null)} className="material-icons">close</button>
                        </div>
                    )}

                    {/* iOS 18 Player Component Card */}
                    {currentTrack && (
                        <div className="mobile-player-card">
                            <div className="mobile-artwork-wrapper">
                                {currentTrack.cover ? (
                                    <img src={currentTrack.cover} alt={currentTrack.title} className="mobile-artwork" />
                                ) : (
                                    <div className="mobile-artwork fallback">
                                        <span className="material-icons">music_note</span>
                                    </div>
                                )}
                            </div>

                            <div className="mobile-track-meta">
                                <div className="mobile-track-title">{currentTrack.title}</div>
                                <div className="mobile-track-artist">{currentTrack.artist}</div>
                            </div>

                            {/* iOS Time/Progress Bar */}
                            <div className="mobile-player-progress-area">
                                <div className="mobile-progress-bar-wrap">
                                    <input
                                        type="range"
                                        min="0"
                                        max={duration || 0}
                                        step="0.01"
                                        value={displayTime}
                                        onChange={handleProgressChange}
                                        onPointerDown={handleProgressStart}
                                        className="mobile-progress-slider"
                                    />
                                </div>
                                <div className="mobile-time-labels">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>-{formatTime((duration || 0) - currentTime)}</span>
                                </div>
                            </div>

                            {/* iOS Music Controls */}
                            <div className="mobile-player-controls">
                                <button type="button" onClick={prevTrack} className="mobile-ctrl-btn">
                                    <span className="material-icons">skip_previous</span>
                                </button>
                                <button type="button" onClick={() => togglePlay()} className="mobile-ctrl-btn mobile-play-btn">
                                    <span className="material-icons">
                                        {isPlaying ? 'pause' : 'play_arrow'}
                                    </span>
                                </button>
                                <button type="button" onClick={nextTrack} className="mobile-ctrl-btn">
                                    <span className="material-icons">skip_next</span>
                                </button>
                            </div>

                            {/* iOS Secondary Settings */}
                            <div className="mobile-secondary-controls">
                                <button type="button" onClick={toggleShuffle} className={`mobile-sec-btn ${isShuffle ? 'active' : ''}`}>
                                    <span className="material-icons">shuffle</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setLoopMode(loopMode === 'all' ? 'one' : loopMode === 'one' ? 'none' : 'all')}
                                    className={`mobile-sec-btn ${loopMode !== 'none' ? 'active' : ''}`}
                                >
                                    <span className="material-icons">
                                        {loopMode === 'one' ? 'repeat_one' : 'repeat'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Recently Played Carousel Section */}
                    <div className="mobile-music-section">
                        <h3 className="mobile-section-heading">Recently Played</h3>
                        <div className="mobile-horizontal-grid">
                            {recentlyPlayed.map((track) => (
                                <div key={`recent-${track.id}`} className="mobile-grid-card" onClick={() => playTrack(track.id)}>
                                    <div className="card-artwork">
                                        <img src={track.cover || Icons.music} alt="" />
                                        <div className="card-play-overlay">
                                            <span className="material-icons">play_arrow</span>
                                        </div>
                                    </div>
                                    <div className="card-title">{track.title}</div>
                                    <div className="card-subtitle">{track.artist}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recommended Tracks Section */}
                    <div className="mobile-music-section">
                        <h3 className="mobile-section-heading">Recommended Tracks</h3>
                        <div className="mobile-track-rows-container">
                            {recommendedTracks.map((track) => (
                                <div key={`rec-${track.id}`} className={`mobile-track-row ${currentTrackId === track.id ? 'active' : ''}`} onClick={() => playTrack(track.id)}>
                                    <img src={track.cover || Icons.music} alt="" className="mobile-row-cover" />
                                    <div className="mobile-row-text">
                                        <div className="mobile-row-title">{track.title}</div>
                                        <div className="mobile-row-artist">{track.artist}</div>
                                    </div>
                                    <span className="material-icons play-row-icon">play_circle_filled</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Playlists Section */}
                    <div className="mobile-music-section">
                        <h3 className="mobile-section-heading">Playlists</h3>
                        <div className="mobile-list-group">
                            {playlists.map((pl, idx) => (
                                <div key={idx} className="mobile-list-item">
                                    <div className="list-icon-wrapper" style={{ backgroundColor: pl.color }}>
                                        <span className="material-icons">{pl.icon}</span>
                                    </div>
                                    <div className="list-item-text">
                                        <div className="list-item-title">{pl.name}</div>
                                        <div className="list-item-subtitle">{pl.count}</div>
                                    </div>
                                    <span className="material-icons list-item-chevron">chevron_right</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* All Songs Section */}
                    <div className="mobile-track-list-section">
                        <h3 className="mobile-section-heading">All Songs</h3>
                        <div className="mobile-track-rows-container">
                            {tracks.map((track, index) => (
                                <div
                                    key={track.id}
                                    className={`mobile-track-row ${currentTrackId === track.id ? 'active' : ''}`}
                                    onClick={() => playTrack(track.id)}
                                >
                                    <span className="mobile-row-num">
                                        {currentTrackId === track.id && isPlaying ? (
                                            <div className="mobile-playing-indicator">
                                                <div className="bar"></div>
                                                <div className="bar"></div>
                                                <div className="bar"></div>
                                            </div>
                                        ) : index + 1}
                                    </span>
                                    <div className="mobile-row-info">
                                        {track.cover ? (
                                            <img src={track.cover} alt="" className="mobile-row-cover" />
                                        ) : (
                                            <div className="mobile-row-cover fallback">
                                                <span className="material-icons">music_note</span>
                                            </div>
                                        )}
                                        <div className="mobile-row-text">
                                            <div className="mobile-row-title">{track.title}</div>
                                            <div className="mobile-row-artist">{track.artist}</div>
                                        </div>
                                    </div>
                                    <span className="material-icons mobile-row-chevron">chevron_right</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return isMobile ? renderMobile() : renderDesktop();
};

export default Music;
