import React, { useEffect, useState, useRef } from 'react';
import { useMusicStore } from '../../store/musicStore';
import { useOSStore } from '../../store/osStore';
import { FastAverageColor } from 'fast-average-color';
import './MusicWidget.css';

const MusicWidget: React.FC = () => {
    const {
        currentTrackId,
        tracks,
        isPlaying,
        togglePlay,
        nextTrack,
        prevTrack,
        currentTime,
        duration,
        setProgress
    } = useMusicStore();
    const { openWindow } = useOSStore();
    
    const [dominantColor, setDominantColor] = useState<string>('rgba(255, 255, 255, 0.2)');
    const fac = useRef(new FastAverageColor());

    const currentTrack = tracks.find(t => t.id === currentTrackId) || tracks[0];

    useEffect(() => {
        if (currentTrack?.cover) {
            fac.current.getColorAsync(currentTrack.cover)
                .then(color => {
                    setDominantColor(color.rgba);
                })
                .catch(e => {
                    console.warn('Failed to extract color:', e);
                    setDominantColor('rgba(255, 255, 255, 0.2)');
                });
        }
    }, [currentTrack?.cover]);

    const shadowStyle = currentTrack?.cover 
        ? { 
            boxShadow: `0 15px 35px rgba(0, 0, 0, 0.25), 0 0 35px ${dominantColor.replace(/[\d.]+\)$/g, '0.25)')}`,
            background: `linear-gradient(135deg, ${dominantColor.replace(/[\d.]+\)$/g, '0.15)')} 0%, rgba(255, 255, 255, 0.1) 100%)`,
            borderColor: dominantColor.replace(/[\d.]+\)$/g, '0.3)')
          } 
        : {};

    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

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

    return (
        <div className="music-widget" style={shadowStyle} onDoubleClick={() => openWindow('music', 'Music')}>
            {currentTrack ? (
                <div className="widget-premium-content">
                    <div className="widget-header">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="apple-music-logo">
                            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.176 13.92c-1.42 1.34-3.66.7-3.92-.82V9.67c0-.28-.24-.51-.54-.48-.96.08-2.02.32-2.71.61-.3.13-.5.42-.5.73v5.12c-1.39 1.36-3.64.69-3.89-.86-.23-1.43 1.14-2.58 2.58-2.26.54.12 1.05.35 1.5.68V6.99c0-.4.28-.75.68-.82 1.55-.28 3.52-.46 4.75-.46.39 0 .72.31.72.71v8.13c0 .24-.1.47-.27.63l-1.4 1.34z"/>
                        </svg>
                        <span className="widget-header-text">Apple Music</span>
                    </div>
                    <div className="widget-cover-wrap">
                        <img src={currentTrack.cover} alt={currentTrack.title} className="widget-cover-large" />
                    </div>
                    
                    <div className="widget-track-info">
                        <div className="widget-title">{currentTrack.title}</div>
                        <div className="widget-artist">{currentTrack.artist}</div>
                    </div>

                    <div className="widget-progress-section" onClick={(e) => e.stopPropagation()}>
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
                            <div
                                className="progress-fill"
                                style={{ width: `${(displayTime / duration) * 100}%`, backgroundColor: dominantColor !== 'rgba(255, 255, 255, 0.2)' ? dominantColor : '#fa233b' }}
                            ></div>
                        </div>
                        <div className="widget-time-row">
                            <span>{formatTime(displayTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    <div className="widget-controls-row" onClick={(e) => e.stopPropagation()}>
                        <button className="widget-btn small">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>
                        </button>
                        <button onClick={prevTrack} className="widget-btn mini">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                        </button>
                        <button onClick={() => togglePlay()} className="widget-btn main" style={{ backgroundColor: dominantColor !== 'rgba(255, 255, 255, 0.2)' ? dominantColor : '#fa233b' }}>
                            {isPlaying ? (
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                            ) : (
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style={{ marginLeft: '2px' }}><path d="M8 5v14l11-7z"/></svg>
                            )}
                        </button>
                        <button onClick={nextTrack} className="widget-btn mini">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                        </button>
                        <button className="widget-btn small">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>
                        </button>
                    </div>
                </div>
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
    );
};

export default MusicWidget;
