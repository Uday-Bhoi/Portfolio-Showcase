import React, { useState, useEffect } from 'react';
import { useMusicStore } from '../../store/musicStore';
import { Icons } from '../../assets/icons';
import './MobileMusicWidget.css';

const MobileMusicWidget: React.FC = () => {
  const { currentTrackId, tracks, isPlaying, togglePlay, nextTrack, prevTrack } = useMusicStore();
  const currentTrack = tracks.find(t => t.id === currentTrackId) || tracks[0];

  if (!currentTrack) return null;

  return (
    <div className="mobile-music-widget">
      {/* Dynamic Spotify-inspired background */}
      <div 
        className="widget-dynamic-bg" 
        style={{ backgroundImage: `url(${currentTrack.cover || Icons.music})` }}
      />
      
      <div className="widget-content">
        <div className="track-info">
          <div className="album-art">
            <img src={currentTrack.cover || Icons.music} alt="" />
          </div>
          <div className="text-details">
            <div className="track-name">{currentTrack.title}</div>
            <div className="artist-name">{currentTrack.artist}</div>
          </div>
        </div>
        <div className="widget-controls">
          <button onClick={(e) => { e.stopPropagation(); prevTrack(); }} className="ctrl-btn">
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="ctrl-btn play-pause">
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          <button onClick={(e) => { e.stopPropagation(); nextTrack(); }} className="ctrl-btn">
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M6 18l8.5-6L6 6zm9-12h2v12h-2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMusicWidget;
