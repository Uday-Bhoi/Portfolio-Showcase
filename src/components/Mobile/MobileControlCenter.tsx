import React, { useState, useRef } from 'react';
import { useOSStore } from '../../store/osStore';
import { useMusicStore } from '../../store/musicStore';
import './MobileControlCenter.css';

interface MobileControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileControlCenter: React.FC<MobileControlCenterProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useOSStore();
  const { isPlaying, playTrack, togglePlay, currentTrackId, tracks } = useMusicStore();
  
  const [wifiActive, setWifiActive] = useState(true);
  const [bluetoothActive, setBluetoothActive] = useState(true);
  const [airplaneActive, setAirplaneActive] = useState(false);
  const [cellularActive, setCellularActive] = useState(true);
  const [airdropActive, setAirdropActive] = useState(true);
  
  const [rotationLock, setRotationLock] = useState(true);
  const [silentMode, setSilentMode] = useState(true);
  const [flashlightActive, setFlashlightActive] = useState(false);

  const [brightness, setBrightness] = useState(85);
  const [volume, setVolume] = useState(70);

  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);

  const currentTrack = tracks.find(t => t.id === currentTrackId) || tracks[0];

  if (!isOpen && dragOffset === 0) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    if (diff < 0) {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragOffset < -80) {
      onClose();
    }
    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startY.current = e.clientY;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientY - startY.current;
    if (diff < 0) {
      setDragOffset(diff);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (dragOffset < -80) {
        onClose();
      }
      setDragOffset(0);
    }
  };

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div 
      className={`ios18-control-center-backdrop ${isOpen ? 'open' : ''}`}
      onClick={onClose}
    >
      <div 
        className="ios18-control-center-panel"
        style={{
          transform: `translateY(${dragOffset}px)`,
          transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.25, 1, 0.2, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Top bar: edit plus, power button, and status info */}
        <div className="cc-header-bar">
          <button className="cc-edit-btn" title="Add control">+</button>

          <div className="cc-status-row">
            <span className="cc-carrier">Jio</span>
            <span className="cc-icon">📶</span>
            <span className="cc-icon">🔒</span>
            <span className="cc-battery">42%</span>
          </div>

          <button className="cc-power-btn" title="Power Options">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42A7.92 7.92 0 0 1 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.05.88-3.9 2.29-5.18L5.87 5.4C4.1 7.15 3 9.55 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.45-1.1-4.85-2.87-6.6-1.42-1.42z"/>
            </svg>
          </button>
        </div>

        {/* Control Grid Layout */}
        <div className="cc-grid-container">
          
          {/* Connectivity 2x2 Pod */}
          <div className="cc-pod connectivity-pod">
            <div className="conn-grid">
              <button 
                className={`conn-btn ${airplaneActive ? 'active-orange' : ''}`}
                onClick={() => setAirplaneActive(!airplaneActive)}
              >
                <span className="material-icons">flight</span>
              </button>

              <button 
                className={`conn-btn ${airdropActive ? 'active-blue' : ''}`}
                onClick={() => setAirdropActive(!airdropActive)}
              >
                <span className="material-icons">radar</span>
              </button>

              <button 
                className={`conn-btn ${wifiActive ? 'active-blue' : ''}`}
                onClick={() => setWifiActive(!wifiActive)}
              >
                <span className="material-icons">wifi</span>
              </button>

              <button 
                className={`conn-btn ${cellularActive ? 'active-green' : ''}`}
                onClick={() => setCellularActive(!cellularActive)}
              >
                <span className="material-icons">signal_cellular_alt</span>
              </button>

              <button 
                className={`conn-btn ${bluetoothActive ? 'active-blue' : ''}`}
                onClick={() => setBluetoothActive(!bluetoothActive)}
              >
                <span className="material-icons">bluetooth</span>
              </button>

              <button className="conn-btn">
                <span className="material-icons">cast</span>
              </button>
            </div>
          </div>

          {/* Media Player 2x2 Pod */}
          <div className="cc-pod media-pod">
            <div className="media-info">
              <div className="media-art-placeholder">
                {currentTrack?.cover ? (
                  <img src={currentTrack.cover} alt="" className="media-art-img" />
                ) : (
                  <span className="material-icons">music_note</span>
                )}
              </div>
              <div className="media-text">
                <span className="media-title">{isPlaying && currentTrack ? currentTrack.title : 'Not Playing'}</span>
                <span className="media-artist">{isPlaying && currentTrack ? currentTrack.artist : 'Apple Music'}</span>
              </div>
            </div>

            <div className="media-controls">
              <button className="media-btn">
                <span className="material-icons">fast_rewind</span>
              </button>
              
              <button 
                className="media-btn play-pause-btn"
                onClick={() => isPlaying ? togglePlay(false) : playTrack(currentTrackId || tracks[0]?.id)}
              >
                <span className="material-icons">{isPlaying ? 'pause' : 'play_arrow'}</span>
              </button>

              <button className="media-btn">
                <span className="material-icons">fast_forward</span>
              </button>
            </div>
          </div>

          {/* Quick Toggles Row */}
          <div className="cc-row-toggles">
            <button 
              className={`cc-circle-toggle ${rotationLock ? 'active-red' : ''}`}
              onClick={() => setRotationLock(!rotationLock)}
            >
              <span className="material-icons">screen_rotation</span>
            </button>

            <button 
              className={`cc-circle-toggle ${silentMode ? 'active-red' : ''}`}
              onClick={() => setSilentMode(!silentMode)}
            >
              <span className="material-icons">{silentMode ? 'notifications_off' : 'notifications'}</span>
            </button>

            <div className="cc-focus-pill">
              <span className="material-icons">dark_mode</span>
              <span className="focus-text">Focus</span>
              <span className="focus-arrows">↕</span>
            </div>
          </div>

          {/* Vertical Sliders (Brightness & Volume) */}
          <div className="cc-sliders-row">
            <div className="cc-vertical-slider">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="slider-range-vertical"
              />
              <div className="slider-fill" style={{ height: `${brightness}%` }}></div>
              <div className="slider-icon">
                <span className="material-icons">brightness_5</span>
              </div>
            </div>

            <div className="cc-vertical-slider">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="slider-range-vertical"
              />
              <div className="slider-fill" style={{ height: `${volume}%` }}></div>
              <div className="slider-icon">
                <span className="material-icons">{volume === 0 ? 'volume_off' : 'volume_up'}</span>
              </div>
            </div>
          </div>

          {/* Bottom Quick Action Round Buttons */}
          <div className="cc-actions-grid">
            <button 
              className={`cc-action-btn ${flashlightActive ? 'active-white' : ''}`}
              onClick={() => setFlashlightActive(!flashlightActive)}
            >
              <span className="material-icons">highlight</span>
            </button>

            <button className="cc-action-btn">
              <span className="material-icons">timer</span>
            </button>

            <button className="cc-action-btn rainbow-ring">
              <span className="material-icons">calculate</span>
            </button>

            <button className="cc-action-btn rainbow-ring">
              <span className="material-icons">photo_camera</span>
            </button>

            <button className="cc-action-btn">
              <span className="material-icons">cell_tower</span>
            </button>

            <button className="cc-action-btn">
              <span className="material-icons">screen_share</span>
            </button>

            <button className="cc-action-btn">
              <span className="material-icons">qr_code_scanner</span>
            </button>

            <button className={`cc-action-btn ${theme === 'dark' ? 'active-white' : ''}`} onClick={toggleDarkMode}>
              <span className="material-icons">contrast</span>
            </button>
          </div>
        </div>

        {/* Right Side Vertical Pagination Icons (iOS 18) */}
        <div className="cc-right-pagination">
          <div className="page-dot active">♥</div>
          <div className="page-dot">🎵</div>
          <div className="page-dot">📶</div>
        </div>

        {/* Bottom Grabber */}
        <div className="cc-bottom-grabber" onClick={onClose}></div>
      </div>
    </div>
  );
};

export default MobileControlCenter;
