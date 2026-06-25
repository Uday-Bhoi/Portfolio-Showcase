import React, { useState, useEffect } from 'react';
import { useOSStore } from '../../store/osStore';
import './Settings.css';

// Import wallpaper previews
import macosWallpaper from '../../assets/Wallpapers/macos-wall.jpg';
import mandoWallpaper from '../../assets/Wallpapers/mando_wall.jpg';
import sequoiaWallpaper from '../../assets/Wallpapers/sequoia_wall.png';
import lakeWallpaper from '../../assets/Wallpapers/lake_wall.png';
import cyberpunkWallpaper from '../../assets/Wallpapers/cyberpunk_wall.png';
import desertWallpaper from '../../assets/Wallpapers/desert_wall.png';

type SettingsSection = 'wi-fi' | 'bluetooth' | 'network' | 'notifications' | 'sound' | 'displays' | 'wallpaper' | 'general' | 'privacy' | 'about' | 'appearance';

interface SectionItem {
    id: SettingsSection;
    label: string;
    icon: string;
    color: string;
    status?: string;
}

const Settings: React.FC = () => {
    const { theme, setTheme, wallpaper, setWallpaper } = useOSStore();
    const [activeSection, setActiveSection] = useState<SettingsSection>(() => {
        const stored = sessionStorage.getItem('settings_active_section') as SettingsSection;
        if (stored) return stored;
        return window.innerWidth <= 768 ? 'general' : 'appearance';
    });

    const [wifiOn, setWifiOn] = useState(true);
    const [bluetoothOn, setBluetoothOn] = useState(true);
    const [networkOn, setNetworkOn] = useState(true);
    const [hapticsOn, setHapticsOn] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const [currentView, setCurrentView] = useState<'menu' | 'detail'>(() => {
        return (sessionStorage.getItem('settings_current_view') as 'menu' | 'detail') || 'menu';
    });

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSetActiveSection = (section: SettingsSection) => {
        setActiveSection(section);
        sessionStorage.setItem('settings_active_section', section);
        if (isMobile) {
            setCurrentView('detail');
            sessionStorage.setItem('settings_current_view', 'detail');
        }
    };

    const handleBackToMenu = () => {
        setCurrentView('menu');
        sessionStorage.setItem('settings_current_view', 'menu');
    };
    
    const mobileSectionsGrouped: { title: string; items: SectionItem[] }[] = [
        {
            title: 'Connectivity',
            items: [
                { id: 'wi-fi' as SettingsSection, label: 'Wi-Fi', icon: 'wifi', color: '#007aff', status: wifiOn ? 'Antigravity_5G' : 'Off' },
                { id: 'bluetooth' as SettingsSection, label: 'Bluetooth', icon: 'bluetooth', color: '#007aff', status: bluetoothOn ? 'On' : 'Off' },
                { id: 'network' as SettingsSection, label: 'Mobile Data', icon: 'network', color: '#34c759', status: networkOn ? '5G Auto' : 'Off' },
            ]
        },
        {
            title: 'Alerts',
            items: [
                { id: 'notifications' as SettingsSection, label: 'Notifications', icon: 'notifications', color: '#ff3b30' },
                { id: 'sound' as SettingsSection, label: 'Sounds & Haptics', icon: 'sound', color: '#ff2d55' },
            ]
        },
        {
            title: 'System',
            items: [
                { id: 'general' as SettingsSection, label: 'General', icon: 'general', color: '#8e8e93' },
                { id: 'displays' as SettingsSection, label: 'Display & Brightness', icon: 'displays', color: '#0a84ff' },
                { id: 'wallpaper' as SettingsSection, label: 'Wallpaper', icon: 'wallpaper', color: '#af52de' },
            ]
        },
        {
            title: 'Security',
            items: [
                { id: 'privacy' as SettingsSection, label: 'Privacy & Security', icon: 'privacy', color: '#34c759' },
            ]
        },
        {
            title: 'Device',
            items: [
                { id: 'about' as SettingsSection, label: 'About Device', icon: 'about', color: '#8e8e93' },
            ]
        }
    ];

    const renderSVGIcon = (iconName: string) => {
        switch (iconName) {
            case 'wifi':
                return (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h.01M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 14 0M1.5 9.5a15 15 0 0 1 21 0" />
                    </svg>
                );
            case 'bluetooth':
                return (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 7l10 10-5 5V2l5 5L7 17" />
                    </svg>
                );
            case 'network':
                return (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 20V10M14 20v-7M10 20v-4M6 20v-1" />
                    </svg>
                );
            case 'notifications':
                return (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                    </svg>
                );
            case 'sound':
                return (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                );
            case 'displays':
            case 'palette':
                return (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                );
            case 'wallpaper':
                return (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                    </svg>
                );
            case 'general':
                return (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                );
            case 'privacy':
                return (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                );
            case 'about':
            case 'info':
            default:
                return (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                );
        }
    };

    const renderContent = (paneSection: SettingsSection) => {
        // Map appearance to displays on mobile view
        const section = (isMobile && paneSection === 'appearance') ? 'displays' : paneSection;

        switch (section) {
            case 'appearance':
                return (
                    <div className="settings-pane">
                        <header className="pane-header">
                            <h2>Appearance</h2>
                        </header>

                        <div className="settings-pane-layout">
                            <div className="settings-column">
                                <div className="settings-section-description">THEME SELECTOR</div>
                                <div className="settings-card">
                                    <div className="appearance-selector">
                                        <div
                                            className={`appearance-option ${theme === 'light' ? 'active' : ''}`}
                                            onClick={() => setTheme('light')}
                                        >
                                            <div className="appearance-preview light"></div>
                                            <span>Light</span>
                                        </div>
                                        <div
                                            className={`appearance-option ${theme === 'dark' ? 'active' : ''}`}
                                            onClick={() => setTheme('dark')}
                                        >
                                            <div className="appearance-preview dark"></div>
                                            <span>Dark</span>
                                        </div>
                                        <div
                                            className={`appearance-option ${theme === 'custom' ? 'active' : ''}`}
                                            onClick={() => setTheme('custom')}
                                        >
                                            <div className="appearance-preview custom"></div>
                                            <span>Custom</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="settings-section-description">ACCENT COLOR</div>
                                <div className="settings-card">
                                    <div className="settings-row no-hover">
                                        <div className="row-label">
                                            <span className="row-title">Active Colorway</span>
                                        </div>
                                        <div className="row-value">
                                            <div className="accent-dots">
                                                {['#007aff', '#ff9500', '#ff2d55', '#34c759', '#af52de', '#ff3b30'].map(color => (
                                                    <div key={color} className="accent-dot" style={{ backgroundColor: color }}></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-column">
                                <div className="settings-section-description">SYSTEM BEHAVIOR</div>
                                <div className="settings-card info-dense">
                                    <div className="info-grid-row">
                                        <span className="info-label">Transparency Effects</span>
                                        <div className="macos-switch on"></div>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">Sidebar Icon Size</span>
                                        <select className="macos-select">
                                            <option>Medium (Default)</option>
                                            <option>Small</option>
                                            <option>Large</option>
                                        </select>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">Scrollbar Options</span>
                                        <select className="macos-select">
                                            <option>Jump to next page</option>
                                            <option>Jump to clicked spot</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'displays':
                return (
                    <div className="settings-pane">
                        <header className="pane-header">
                            <h2>{isMobile ? 'Display & Brightness' : 'Displays'}</h2>
                        </header>

                        <div className="settings-pane-layout">
                            <div className="settings-column">
                                <div className="settings-section-description">BRIGHTNESS</div>
                                <div className="settings-card">
                                    <div className="settings-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 6, padding: '8px 16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <span className="material-icons text-muted" style={{ fontSize: 16 }}>light_mode</span>
                                            <input type="range" className="volume-slider" style={{ flex: 1, accentColor: '#ffb300' }} defaultValue="85" />
                                            <span className="material-icons text-muted" style={{ fontSize: 20 }}>light_mode</span>
                                        </div>
                                    </div>
                                    <div className="settings-row">
                                        <div className="row-label">
                                            <span className="row-title">Night Shift</span>
                                            <span className="row-subtitle">Warm colors after sunset</span>
                                        </div>
                                        <div className="row-value">
                                            <div className="macos-switch on"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="settings-section-description">RESOLUTION SCALE</div>
                                <div className="settings-card" style={{ padding: '16px' }}>
                                    <div className="resolution-selector" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                                        <div className="resolution-option" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                            <div className="res-icon" style={{ width: '36px', height: '36px', border: '1px solid rgba(120,120,120,0.2)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600 }}>Aa</div>
                                            <span style={{ fontSize: '10px', opacity: 0.7 }}>Larger Text</span>
                                        </div>
                                        <div className="resolution-option" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                            <div className="res-icon" style={{ width: '36px', height: '36px', border: '1px solid rgba(120,120,120,0.2)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600 }}>Aa</div>
                                            <span style={{ fontSize: '10px', opacity: 0.7 }}>Default</span>
                                        </div>
                                        <div className="resolution-option active" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                            <div className="res-icon" style={{ width: '36px', height: '36px', border: '2px solid #007aff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600 }}>Aa</div>
                                            <span style={{ fontSize: '10px', fontWeight: 600 }}>Scaled (P3)</span>
                                        </div>
                                        <div className="resolution-option" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                            <div className="res-icon" style={{ width: '36px', height: '36px', border: '1px solid rgba(120,120,120,0.2)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 600 }}>Aa</div>
                                            <span style={{ fontSize: '10px', opacity: 0.7 }}>More Space</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-column">
                                <div className="settings-section-description">MONITOR SPECIFICATIONS</div>
                                <div className="settings-card info-dense">
                                    <div className="info-grid-row">
                                        <span className="info-label">Display Type</span>
                                        <span className="info-value">Built-In Retina LCD</span>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">Refresh Rate</span>
                                        <select className="macos-select" style={{ fontSize: '11px', padding: '1px 4px' }}>
                                            <option>120 Hz ProMotion</option>
                                            <option>60 Hz (Standard)</option>
                                        </select>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">Color Profile</span>
                                        <span className="info-value">Display P3 (Wide Color)</span>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">Resolution</span>
                                        <span className="info-value">2560 x 1664 Retina</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'wi-fi':
                return (
                    <div className="settings-pane">
                        <header className="pane-header">
                            <h2>Wi-Fi</h2>
                            <div className="header-toggle">
                                <div className={`macos-switch ${wifiOn ? 'on' : ''}`} onClick={() => setWifiOn(!wifiOn)}></div>
                            </div>
                        </header>

                        <div className="settings-pane-layout">
                            <div className="settings-column">
                                <div className="settings-section-description">CURRENT NETWORK</div>
                                <div className="settings-card">
                                    <div className="settings-row no-hover">
                                        <div className="row-icon-wrap" style={{ backgroundColor: '#007aff' }}>
                                            {renderSVGIcon('wifi')}
                                        </div>
                                        <div className="row-label">
                                            <span className="row-title">{wifiOn ? 'Antigravity_5G' : 'Off'}</span>
                                            <span className="row-subtitle">{wifiOn ? 'Connected • Secure (WPA3)' : 'Turn on Wi-Fi to see available networks'}</span>
                                        </div>
                                        {wifiOn && <div className="row-value"><span className="status-badge success">Connected</span></div>}
                                    </div>
                                </div>

                                {wifiOn && (
                                    <>
                                        <div className="settings-section-description">KNOWN NETWORKS</div>
                                        <div className="settings-card">
                                            <div className="settings-row hoverable">
                                                <div className="row-label">
                                                    <span className="row-title">Antigravity_5G_Ext</span>
                                                    <span className="row-subtitle">Known Network</span>
                                                </div>
                                                <span className="material-icons text-muted" style={{ fontSize: '16px' }}>lock</span>
                                            </div>
                                            <div className="settings-row hoverable">
                                                <div className="row-label">
                                                    <span className="row-title">DeepMind_Guest</span>
                                                    <span className="row-subtitle">Known Network</span>
                                                </div>
                                                <span className="material-icons text-muted" style={{ fontSize: '16px' }}>lock</span>
                                            </div>
                                            <div className="settings-row hoverable">
                                                <div className="row-label">
                                                    <span className="row-title">Starlink_HighSpeed</span>
                                                    <span className="row-subtitle">Available</span>
                                                </div>
                                                <span className="material-icons text-muted" style={{ fontSize: '16px' }}>lock</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="settings-column">
                                <div className="settings-section-description">CONNECTION DETAILS</div>
                                <div className="settings-card info-dense">
                                    <div className="info-grid-row">
                                        <span className="info-label">IPv4 Address</span>
                                        <span className="info-value">192.168.1.142</span>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">Router / Gateway</span>
                                        <span className="info-value">192.168.1.1</span>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">Subnet Mask</span>
                                        <span className="info-value">255.255.255.0</span>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">DNS Servers</span>
                                        <span className="info-value text-accent">8.8.8.8, 1.1.1.1</span>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">Hardware MAC</span>
                                        <span className="info-value">3C:06:30:4A:8D:1F</span>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">Interface</span>
                                        <span className="info-value">en0 (Wi-Fi 6)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'bluetooth':
                return (
                    <div className="settings-pane">
                        <header className="pane-header">
                            <h2>Bluetooth</h2>
                            <div className="header-toggle">
                                <div className={`macos-switch ${bluetoothOn ? 'on' : ''}`} onClick={() => setBluetoothOn(!bluetoothOn)}></div>
                            </div>
                        </header>

                        <div className="settings-pane-layout">
                            <div className="settings-column">
                                <div className="settings-section-description">MY DEVICES</div>
                                <div className="settings-card">
                                    {bluetoothOn ? (
                                        <>
                                            <div className="settings-row no-hover">
                                                <div className="row-icon-wrap" style={{ backgroundColor: '#007aff' }}>
                                                    <span className="material-icons" style={{ fontSize: 14 }}>headset</span>
                                                </div>
                                                <div className="row-label">
                                                    <span className="row-title">Uday's AirPods Pro</span>
                                                    <span className="row-subtitle">L: 85% • R: 85% • Case: 100%</span>
                                                </div>
                                                <div className="row-value"><span className="status-badge success">Connected</span></div>
                                            </div>
                                            <div className="settings-row no-hover">
                                                <div className="row-icon-wrap" style={{ backgroundColor: '#007aff' }}>
                                                    <span className="material-icons" style={{ fontSize: 14 }}>keyboard</span>
                                                </div>
                                                <div className="row-label">
                                                    <span className="row-title">Magic Keyboard</span>
                                                    <span className="row-subtitle">Battery: 78%</span>
                                                </div>
                                                <div className="row-value"><span className="status-badge success">Connected</span></div>
                                            </div>
                                            <div className="settings-row no-hover">
                                                <div className="row-icon-wrap" style={{ backgroundColor: '#007aff' }}>
                                                    <span className="material-icons" style={{ fontSize: 14 }}>mouse</span>
                                                </div>
                                                <div className="row-label">
                                                    <span className="row-title">Magic Mouse 2</span>
                                                    <span className="row-subtitle">Battery: 92%</span>
                                                </div>
                                                <div className="row-value"><span className="status-badge success">Connected</span></div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="settings-row no-hover text-muted" style={{ padding: '16px' }}>Bluetooth is turned off</div>
                                    )}
                                </div>

                                {bluetoothOn && (
                                    <>
                                        <div className="settings-section-description">OTHER DEVICES</div>
                                        <div className="settings-card">
                                            <div className="settings-row hoverable">
                                                <div className="row-label">
                                                    <span className="row-title">Bose QC45</span>
                                                    <span className="row-subtitle">Audio Device</span>
                                                </div>
                                                <span className="material-icons text-muted" style={{ fontSize: 16 }}>sensors</span>
                                            </div>
                                            <div className="settings-row hoverable">
                                                <div className="row-label">
                                                    <span className="row-title">Sony WH-1000XM4</span>
                                                    <span className="row-subtitle">Audio Device</span>
                                                </div>
                                                <span className="material-icons text-muted" style={{ fontSize: 16 }}>sensors</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="settings-column">
                                <div className="settings-section-description">SPECIFICATIONS</div>
                                <div className="settings-card info-dense">
                                    <div className="info-grid-row">
                                        <span className="info-label">Bluetooth Version</span>
                                        <span className="info-value">Core Spec 5.3</span>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">State</span>
                                        <span className="info-value">{bluetoothOn ? 'Discoverable' : 'Inactive'}</span>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">Supported Codecs</span>
                                        <span className="info-value">AAC, LDAC, SBC</span>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">Discovery Name</span>
                                        <span className="info-value">Uday's MacBook Pro</span>
                                    </div>
                                </div>
                                <div className="bluetooth-discoverable" style={{ marginLeft: 4, marginTop: 12 }}>
                                    Now discoverable as "Uday's MacBook Pro".
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'network':
                return (
                    <div className="settings-pane">
                        <header className="pane-header">
                            <h2>{isMobile ? 'Mobile Data' : 'Network'}</h2>
                        </header>

                        <div className="settings-pane-layout">
                            <div className="settings-column">
                                <div className="settings-section-description">PRIMARY CONTROLS</div>
                                <div className="settings-card">
                                    <div className="settings-row no-hover">
                                        <div className="row-label">
                                            <span className="row-title">Cellular Data</span>
                                            <span className="row-subtitle">Toggle network connectivity</span>
                                        </div>
                                        <div className="row-value">
                                            <div className={`macos-switch ${networkOn ? 'on' : ''}`} onClick={() => setNetworkOn(!networkOn)}></div>
                                        </div>
                                    </div>
                                    <div className="settings-row no-hover">
                                        <div className="row-label">
                                            <span className="row-title">Data Options</span>
                                            <span className="row-subtitle">Data Roaming Off</span>
                                        </div>
                                        <div className="row-value">
                                            <span className="text-muted" style={{ fontSize: '13px' }}>5G Auto</span>
                                        </div>
                                    </div>
                                    <div className="settings-row hoverable">
                                        <div className="row-label">
                                            <span className="row-title">Personal Hotspot</span>
                                            <span className="row-subtitle">Off</span>
                                        </div>
                                        <span className="material-icons text-muted" style={{ fontSize: 16 }}>chevron_right</span>
                                    </div>
                                </div>

                                <div className="settings-section-description">DATA USAGE</div>
                                <div className="settings-card" style={{ padding: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                                        <span>This Billing Cycle</span>
                                        <span style={{ fontWeight: 600 }}>12.4 GB of 50 GB Used</span>
                                    </div>
                                    <div className="progress-bar-wrap" style={{ height: '8px', background: 'rgba(120,120,120,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div className="progress-bar-fill" style={{ width: '24.8%', height: '100%', background: '#34c759' }}></div>
                                    </div>
                                    <div style={{ marginTop: '12px', fontSize: '11px', display: 'flex', gap: '16px', opacity: 0.7 }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span className="status-dot-mini" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#007aff', display: 'inline-block' }}></span> Wi-Fi: 30.2 GB
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span className="status-dot-mini" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#34c759', display: 'inline-block' }}></span> Cellular: 12.4 GB
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-column">
                                <div className="settings-section-description">DIAGNOSTICS & STATUS</div>
                                <div className="settings-card info-dense">
                                    <div className="info-grid-row">
                                        <span className="info-label">Active Connection</span>
                                        <span className="info-value">{networkOn ? 'Cellular (5G)' : 'None'}</span>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">Ping latency</span>
                                        <span className="info-value text-accent">14 ms</span>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">Jitter</span>
                                        <span className="info-value">2 ms</span>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">Packet Loss</span>
                                        <span className="info-value">0.0%</span>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">IP Address</span>
                                        <span className="info-value">100.84.145.28</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="settings-pane">
                        <header className="pane-header">
                            <h2>Notifications</h2>
                        </header>

                        <div className="settings-pane-layout">
                            <div className="settings-column">
                                <div className="settings-section-description">NOTIFICATION STYLE</div>
                                <div className="settings-card">
                                    <div className="settings-row no-hover">
                                        <div className="row-label">
                                            <span className="row-title">Show Previews</span>
                                            <span className="row-subtitle">Lockscreen & banner details</span>
                                        </div>
                                        <div className="row-value">
                                            <select className="macos-select">
                                                <option>Always</option>
                                                <option>When Unlocked</option>
                                                <option>Never</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="settings-row no-hover">
                                        <div className="row-label">
                                            <span className="row-title">Siri Suggestions</span>
                                        </div>
                                        <div className="row-value">
                                            <div className="macos-switch on"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="settings-section-description">VISUAL DISPLAY METHOD</div>
                                <div className="settings-card" style={{ padding: '16px' }}>
                                    <div className="visual-notification-styles" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                                        <div className="visual-style-option active" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                            <div className="style-box stack" style={{ width: '100%', height: '50px', background: 'rgba(120,120,120,0.1)', borderRadius: '6px', position: 'relative' }}>
                                                <div style={{ position: 'absolute', bottom: '6px', left: '10%', width: '80%', height: '12px', background: 'var(--text-color)', opacity: 0.1, borderRadius: '3px' }}></div>
                                                <div style={{ position: 'absolute', bottom: '12px', left: '12%', width: '76%', height: '12px', background: 'var(--text-color)', opacity: 0.2, borderRadius: '3px' }}></div>
                                                <div style={{ position: 'absolute', bottom: '18px', left: '14%', width: '72%', height: '12px', background: '#007aff', borderRadius: '3px' }}></div>
                                            </div>
                                            <span style={{ fontSize: '11px', fontWeight: 600 }}>Stack</span>
                                        </div>
                                        <div className="visual-style-option" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                            <div className="style-box list" style={{ width: '100%', height: '50px', background: 'rgba(120,120,120,0.1)', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '4px', padding: '6px' }}>
                                                <div style={{ width: '100%', height: '8px', background: 'var(--text-color)', opacity: 0.15, borderRadius: '2px' }}></div>
                                                <div style={{ width: '100%', height: '8px', background: 'var(--text-color)', opacity: 0.15, borderRadius: '2px' }}></div>
                                                <div style={{ width: '100%', height: '8px', background: 'var(--text-color)', opacity: 0.15, borderRadius: '2px' }}></div>
                                            </div>
                                            <span style={{ fontSize: '11px', opacity: 0.7 }}>List</span>
                                        </div>
                                        <div className="visual-style-option" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                            <div className="style-box count" style={{ width: '100%', height: '50px', background: 'rgba(120,120,120,0.1)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <span style={{ fontSize: '14px', fontWeight: 700, color: '#ff3b30' }}>3</span>
                                            </div>
                                            <span style={{ fontSize: '11px', opacity: 0.7 }}>Count</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-column">
                                <div className="settings-section-description">FOCUS SCHEDULING</div>
                                <div className="settings-card">
                                    <div className="settings-row hoverable">
                                        <div className="row-icon-wrap" style={{ backgroundColor: '#af52de', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span className="material-icons" style={{ fontSize: 12, color: '#fff' }}>do_not_disturb</span>
                                        </div>
                                        <div className="row-label">
                                            <span className="row-title">Do Not Disturb</span>
                                            <span className="row-subtitle">10:00 PM - 7:00 AM</span>
                                        </div>
                                        <span className="status-badge secondary">Scheduled</span>
                                    </div>
                                    <div className="settings-row hoverable">
                                        <div className="row-icon-wrap" style={{ backgroundColor: '#ff9500', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span className="material-icons" style={{ fontSize: 12, color: '#fff' }}>work</span>
                                        </div>
                                        <div className="row-label">
                                            <span className="row-title">Work Focus</span>
                                            <span className="row-subtitle">9:00 AM - 5:00 PM</span>
                                        </div>
                                        <span className="status-badge secondary">Off</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'sound':
                return (
                    <div className="settings-pane">
                        <header className="pane-header">
                            <h2>{isMobile ? 'Sounds & Haptics' : 'Sound'}</h2>
                        </header>

                        <div className="settings-pane-layout">
                            <div className="settings-column">
                                <div className="settings-section-description">OUTPUT DEVICE</div>
                                <div className="settings-card">
                                    <div className="settings-row no-hover">
                                        <div className="row-label">
                                            <span className="row-title">Output Destination</span>
                                        </div>
                                        <div className="row-value">
                                            <select className="macos-select">
                                                <option>Uday's AirPods Pro (Bluetooth)</option>
                                                <option>Internal Speakers (Built-in)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="settings-section-description">VOLUME LEVELS</div>
                                <div className="settings-card">
                                    <div className="settings-row no-hover" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 6 }}>
                                        <div className="row-label" style={{ marginBottom: 2 }}>
                                            <span className="row-title">Alert & Ringer Volume</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <span className="material-icons text-muted" style={{ fontSize: 16 }}>volume_mute</span>
                                            <input type="range" className="volume-slider" style={{ flex: 1, accentColor: '#007aff' }} defaultValue="75" />
                                            <span className="material-icons text-muted" style={{ fontSize: 16 }}>volume_up</span>
                                        </div>
                                    </div>
                                    <div className="settings-row no-hover" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 6 }}>
                                        <div className="row-label" style={{ marginBottom: 2 }}>
                                            <span className="row-title">System Sound Effects</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <span className="material-icons text-muted" style={{ fontSize: 16 }}>volume_mute</span>
                                            <input type="range" className="volume-slider" style={{ flex: 1, accentColor: '#007aff' }} defaultValue="50" />
                                            <span className="material-icons text-muted" style={{ fontSize: 16 }}>volume_up</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-column">
                                <div className="settings-section-description">HAPTICS & EFFECTS</div>
                                <div className="settings-card">
                                    <div className="settings-row no-hover">
                                        <div className="row-label">
                                            <span className="row-title">System Haptics</span>
                                            <span className="row-subtitle">Tactile feedback on inputs</span>
                                        </div>
                                        <div className="row-value">
                                            <div className={`macos-switch ${hapticsOn ? 'on' : ''}`} onClick={() => setHapticsOn(!hapticsOn)}></div>
                                        </div>
                                    </div>
                                    <div className="settings-row no-hover" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 6 }}>
                                        <div className="row-label" style={{ marginBottom: 2 }}>
                                            <span className="row-title">Haptic Intensity</span>
                                        </div>
                                        <input type="range" className="volume-slider" style={{ width: '100%', accentColor: '#007aff' }} defaultValue="80" />
                                    </div>
                                </div>

                                <div className="settings-section-description">SOUND EFFECTS</div>
                                <div className="settings-card info-dense">
                                    <div className="info-grid-row">
                                        <span className="info-label">Alert Sound</span>
                                        <select className="macos-select" style={{ fontSize: '11px', padding: '1px 4px' }}>
                                            <option>Tritone (Default)</option>
                                            <option>Aurora</option>
                                            <option>Chord</option>
                                            <option>Ding</option>
                                        </select>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">Output Format</span>
                                        <span className="info-value">24-bit / 48.0 kHz</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'wallpaper':
                return (
                    <div className="settings-pane">
                        <header className="pane-header">
                            <h2>Wallpaper</h2>
                        </header>

                        <div className="settings-pane-layout flex-column">
                            {/* Selected Wallpaper Hero Banner */}
                            <div className="featured-wallpaper-banner">
                                <div className="hero-preview" style={{ 
                                    backgroundImage: 
                                        wallpaper === 'standard' ? `url(${macosWallpaper})` :
                                        wallpaper === 'mando' ? `url(${mandoWallpaper})` :
                                        wallpaper === 'sequoia' ? `url(${sequoiaWallpaper})` :
                                        wallpaper === 'lake' ? `url(${lakeWallpaper})` :
                                        wallpaper === 'cyberpunk' ? `url(${cyberpunkWallpaper})` :
                                        wallpaper === 'desert' ? `url(${desertWallpaper})` :
                                        'linear-gradient(135deg, #007aff, #5856d6)'
                                }}></div>
                                <div className="hero-details">
                                    <h3>
                                        {wallpaper === 'standard' ? 'Sonoma (Standard)' :
                                         wallpaper === 'mando' ? 'Mando (Scenic)' :
                                         wallpaper === 'sequoia' ? 'Sequoia Gradient (Featured)' :
                                         wallpaper === 'lake' ? 'Ghibli Lake (Aesthetic)' :
                                         wallpaper === 'cyberpunk' ? 'Cyberpunk Sunset (Synthwave)' :
                                         wallpaper === 'desert' ? 'Terracotta Desert (Minimalist)' :
                                         wallpaper === 'light-pillar' ? 'Light Pillar (Animated)' :
                                         'Floating Lines (Animated)'}
                                    </h3>
                                    <p className="text-muted">
                                        Active Desktop Background • 3840 x 2400 resolution
                                    </p>
                                    <div className="status-badge success">Active</div>
                                </div>
                            </div>

                            <div className="settings-section-description">DYNAMIC BACKGROUNDS</div>
                            <div className="wallpaper-gallery-grid">
                                <div className={`wallpaper-card ${wallpaper === 'light-pillar' ? 'active' : ''}`} onClick={() => setWallpaper('light-pillar')}>
                                    <div className="wallpaper-preview-box pillar-preview">
                                        <div className="pillar-mini-preview"></div>
                                    </div>
                                    <span className="wallpaper-card-name">Light Pillar</span>
                                </div>
                                <div className={`wallpaper-card ${wallpaper === 'floating-lines' ? 'active' : ''}`} onClick={() => setWallpaper('floating-lines')}>
                                    <div className="wallpaper-preview-box lines-preview">
                                        <div className="lines-mini-preview"></div>
                                    </div>
                                    <span className="wallpaper-card-name">Floating Lines</span>
                                </div>
                            </div>

                            <div className="settings-section-description">FEATURED WALLPAPERS</div>
                            <div className="wallpaper-gallery-grid">
                                <div className={`wallpaper-card ${wallpaper === 'standard' ? 'active' : ''}`} onClick={() => setWallpaper('standard')}>
                                    <div className="wallpaper-preview-box" style={{ backgroundImage: `url(${macosWallpaper})` }}></div>
                                    <span className="wallpaper-card-name">Sonoma</span>
                                </div>
                                <div className={`wallpaper-card ${wallpaper === 'sequoia' ? 'active' : ''}`} onClick={() => setWallpaper('sequoia')}>
                                    <div className="wallpaper-preview-box" style={{ backgroundImage: `url(${sequoiaWallpaper})` }}></div>
                                    <span className="wallpaper-card-name">Sequoia</span>
                                </div>
                                <div className={`wallpaper-card ${wallpaper === 'mando' ? 'active' : ''}`} onClick={() => setWallpaper('mando')}>
                                    <div className="wallpaper-preview-box" style={{ backgroundImage: `url(${mandoWallpaper})` }}></div>
                                    <span className="wallpaper-card-name">Mando</span>
                                </div>
                            </div>

                            <div className="settings-section-description">AESTHETIC & PERSONAL</div>
                            <div className="wallpaper-gallery-grid">
                                <div className={`wallpaper-card ${wallpaper === 'lake' ? 'active' : ''}`} onClick={() => setWallpaper('lake')}>
                                    <div className="wallpaper-preview-box" style={{ backgroundImage: `url(${lakeWallpaper})` }}></div>
                                    <span className="wallpaper-card-name">Ghibli Lake</span>
                                </div>
                                <div className={`wallpaper-card ${wallpaper === 'cyberpunk' ? 'active' : ''}`} onClick={() => setWallpaper('cyberpunk')}>
                                    <div className="wallpaper-preview-box" style={{ backgroundImage: `url(${cyberpunkWallpaper})` }}></div>
                                    <span className="wallpaper-card-name">Cyberpunk</span>
                                </div>
                                <div className={`wallpaper-card ${wallpaper === 'desert' ? 'active' : ''}`} onClick={() => setWallpaper('desert')}>
                                    <div className="wallpaper-preview-box" style={{ backgroundImage: `url(${desertWallpaper})` }}></div>
                                    <span className="wallpaper-card-name">Desert Dunes</span>
                                </div>
                            </div>

                            <div className="settings-section-description">SOLID COLORS</div>
                            <div className="wallpaper-gallery-grid">
                                <div className="wallpaper-card disabled" style={{ cursor: 'not-allowed', opacity: 0.6 }}>
                                    <div className="wallpaper-preview-box" style={{ background: '#1c1c1e' }}></div>
                                    <span className="wallpaper-card-name">Midnight Black</span>
                                </div>
                                <div className="wallpaper-card disabled" style={{ cursor: 'not-allowed', opacity: 0.6 }}>
                                    <div className="wallpaper-preview-box" style={{ background: '#8e8e93' }}></div>
                                    <span className="wallpaper-card-name">Space Gray</span>
                                </div>
                                <div className="wallpaper-card disabled" style={{ cursor: 'not-allowed', opacity: 0.6 }}>
                                    <div className="wallpaper-preview-box" style={{ background: '#b59275' }}></div>
                                    <span className="wallpaper-card-name">Rose Gold</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'general':
                return (
                    <div className="settings-pane">
                        <header className="pane-header">
                            <h2>General</h2>
                        </header>

                        <div className="settings-pane-layout">
                            <div className="settings-column">
                                <div className="settings-section-description">SYSTEM PREFERENCES</div>
                                <div className="settings-card">
                                    <div className="settings-row hoverable">
                                        <div className="row-icon-wrap" style={{ backgroundColor: '#ff9500', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span className="material-icons" style={{ fontSize: 14, color: '#fff' }}>schedule</span>
                                        </div>
                                        <div className="row-label">
                                            <span className="row-title">Date & Time</span>
                                            <span className="row-subtitle">Auto-sync with internet time</span>
                                        </div>
                                        <span className="material-icons text-muted" style={{ fontSize: 16 }}>chevron_right</span>
                                    </div>
                                    <div className="settings-row hoverable">
                                        <div className="row-icon-wrap" style={{ backgroundColor: '#007aff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span className="material-icons" style={{ fontSize: 14, color: '#fff' }}>language</span>
                                        </div>
                                        <div className="row-label">
                                            <span className="row-title">Language & Region</span>
                                            <span className="row-subtitle">English (US) • Gregorian Calendar</span>
                                        </div>
                                        <span className="material-icons text-muted" style={{ fontSize: 16 }}>chevron_right</span>
                                    </div>
                                    <div className="settings-row hoverable">
                                        <div className="row-icon-wrap" style={{ backgroundColor: '#8e8e93', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span className="material-icons" style={{ fontSize: 14, color: '#fff' }}>keyboard</span>
                                        </div>
                                        <div className="row-label">
                                            <span className="row-title">Keyboard Layout</span>
                                            <span className="row-subtitle">US English QWERTY</span>
                                        </div>
                                        <span className="material-icons text-muted" style={{ fontSize: 16 }}>chevron_right</span>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-column">
                                <div className="settings-section-description">STORAGE SUMMARY</div>
                                <div className="settings-card" style={{ padding: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                                        <span style={{ fontWeight: 600 }}>Macintosh HD SSD</span>
                                        <span className="text-muted">142 GB of 512 GB Used</span>
                                    </div>
                                    {/* Visual color-coded storage bar */}
                                    <div className="progress-bar-wrap" style={{ height: '14px', background: 'rgba(120,120,120,0.2)', borderRadius: '7px', overflow: 'hidden', display: 'flex' }}>
                                        <div className="storage-seg apps" style={{ width: '35%', background: '#007aff', height: '100%' }}></div>
                                        <div className="storage-seg docs" style={{ width: '20%', background: '#ff9500', height: '100%' }}></div>
                                        <div className="storage-seg system" style={{ width: '15%', background: '#af52de', height: '100%' }}></div>
                                        <div className="storage-seg empty" style={{ width: '30%', background: 'transparent', height: '100%' }}></div>
                                    </div>
                                    {/* Storage breakdown details */}
                                    <div className="storage-breakdown" style={{ marginTop: '12px', fontSize: '11px', display: 'flex', flexWrap: 'wrap', gap: '12px', opacity: 0.8 }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span className="status-dot-mini" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#007aff', display: 'inline-block' }}></span> Apps: 65.4 GB
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span className="status-dot-mini" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#ff9500', display: 'inline-block' }}></span> Docs: 38.2 GB
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span className="status-dot-mini" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#af52de', display: 'inline-block' }}></span> System: 38.4 GB
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span className="status-dot-mini" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'rgba(120,120,120,0.4)', display: 'inline-block' }}></span> Free: 370.0 GB
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'privacy':
                return (
                    <div className="settings-pane">
                        <header className="pane-header">
                            <h2>Privacy & Security</h2>
                        </header>

                        <div className="settings-pane-layout">
                            <div className="settings-column">
                                <div className="settings-section-description">APP PERMISSIONS</div>
                                <div className="settings-card">
                                    <div className="settings-row hoverable">
                                        <div className="row-icon-wrap" style={{ backgroundColor: '#007aff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span className="material-icons" style={{ fontSize: 14, color: '#fff' }}>location_on</span>
                                        </div>
                                        <div className="row-label">
                                            <span className="row-title">Location Services</span>
                                            <span className="row-subtitle">On • 8 apps authorized</span>
                                        </div>
                                        <span className="material-icons text-muted" style={{ fontSize: 16 }}>chevron_right</span>
                                    </div>
                                    <div className="settings-row hoverable">
                                        <div className="row-icon-wrap" style={{ backgroundColor: '#ff9500', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span className="material-icons" style={{ fontSize: 14, color: '#fff' }}>videocam</span>
                                        </div>
                                        <div className="row-label">
                                            <span className="row-title">Camera Access</span>
                                            <span className="row-subtitle">Safari, FaceTime, Meet</span>
                                        </div>
                                        <span className="material-icons text-muted" style={{ fontSize: 16 }}>chevron_right</span>
                                    </div>
                                    <div className="settings-row hoverable">
                                        <div className="row-icon-wrap" style={{ backgroundColor: '#ff2d55', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span className="material-icons" style={{ fontSize: 14, color: '#fff' }}>mic</span>
                                        </div>
                                        <div className="row-label">
                                            <span className="row-title">Microphone Access</span>
                                            <span className="row-subtitle">Safari, Music, FaceTime</span>
                                        </div>
                                        <span className="material-icons text-muted" style={{ fontSize: 16 }}>chevron_right</span>
                                    </div>
                                </div>

                                <div className="settings-section-description">FIREWALL</div>
                                <div className="settings-card">
                                    <div className="settings-row no-hover">
                                        <div className="row-label">
                                            <span className="row-title">Network Firewall</span>
                                            <span className="row-subtitle">Protect incoming connections</span>
                                        </div>
                                        <div className="row-value">
                                            <div className="macos-switch on"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-column">
                                <div className="settings-section-description">DEVICE ENCRYPTION</div>
                                <div className="settings-card info-dense">
                                    <div className="info-grid-row">
                                        <span className="info-label">FileVault Disk Protection</span>
                                        <span className="info-value text-success" style={{ fontWeight: 600 }}>Active</span>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">System Integrity Protection</span>
                                        <span className="info-value">Enabled (SIP)</span>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">Device Security Scans</span>
                                        <span className="info-value text-success" style={{ fontWeight: 600 }}>0 Threats Found</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'about':
                return (
                    <div className="settings-pane">
                        <div className="settings-pane-layout two-column-about">
                            {/* Column 1: System Specs Overview */}
                            <div className="settings-column about-logo-column">
                                <img src="/apple-logo.png" alt="Apple" className="about-logo" style={{ filter: 'var(--icon-filter)' }} />
                                <h1 className="about-title">MacBook Pro 16"</h1>
                                <p className="about-version">Version 1.0.0 (Sonoma-inspired)</p>

                                <div className="settings-card spec-card" style={{ width: '100%' }}>
                                    <div className="settings-row no-hover">
                                        <span className="spec-label">Chip</span>
                                        <span className="spec-value">Apple M4 Pro Max</span>
                                    </div>
                                    <div className="settings-row no-hover">
                                        <span className="spec-label">Memory</span>
                                        <span className="spec-value">32 GB Unified LPDDR5X</span>
                                    </div>
                                    <div className="settings-row no-hover">
                                        <span className="spec-label">Graphics</span>
                                        <span className="spec-value">WebGL 2.0 Hardware</span>
                                    </div>
                                    <div className="settings-row no-hover">
                                        <span className="spec-label">Serial Number</span>
                                        <span className="spec-value" style={{ fontFamily: 'monospace' }}>AG9X7T1F82K0</span>
                                    </div>
                                </div>
                                <button className="macos-btn system-report" style={{ width: '100%' }}>System Report...</button>
                            </div>

                            {/* Column 2: Warranty & Device Health */}
                            <div className="settings-column">
                                <div className="settings-section-description">WARRANTY & COVERAGE</div>
                                <div className="settings-card warranty-card" style={{ background: 'linear-gradient(135deg, rgba(250, 18, 59, 0.04), rgba(250, 18, 59, 0.08))', border: '0.5px solid rgba(250, 18, 59, 0.15)' }}>
                                    <div className="settings-row no-hover">
                                        <div className="row-icon-wrap" style={{ backgroundColor: '#fa123b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span className="material-icons" style={{ fontSize: 12, color: '#fff' }}>verified_user</span>
                                        </div>
                                        <div className="row-label">
                                            <span className="row-title" style={{ fontWeight: 600 }}>AppleCare+ Coverage</span>
                                            <span className="row-subtitle">Accidental damage repair active</span>
                                        </div>
                                        <span className="status-badge" style={{ backgroundColor: '#fa123b', color: '#fff', fontSize: '10px' }}>Active</span>
                                    </div>
                                </div>

                                <div className="settings-section-description">HARDWARE HEALTH</div>
                                <div className="settings-card info-dense">
                                    <div className="info-grid-row">
                                        <span className="info-label">Battery Cycles</span>
                                        <span className="info-value">142 / 1000 Max</span>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">Maximum Capacity</span>
                                        <span className="info-value text-success" style={{ fontWeight: 600 }}>98% (Excellent)</span>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">Core Temperature</span>
                                        <span className="info-value">28 °C (Cool)</span>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">SSD Health Status</span>
                                        <span className="info-value text-success" style={{ fontWeight: 600 }}>100% Healthy</span>
                                    </div>
                                    <div className="info-grid-row">
                                        <span className="info-label">Hardware Sensors</span>
                                        <span className="info-value text-success" style={{ fontWeight: 600 }}>All Systems Nominal</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="settings-pane centered">
                        <span className="material-icons large-icon">construction</span>
                        <p>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} settings coming soon.</p>
                    </div>
                );
        }
    };

    const renderDesktopSettings = () => {
        const desktopGroups = [
            {
                items: [
                    { id: 'wi-fi', label: 'Wi-Fi', icon: 'wifi', color: '#007aff' },
                    { id: 'bluetooth', label: 'Bluetooth', icon: 'bluetooth', color: '#007aff' },
                    { id: 'network', label: 'Network', icon: 'network', color: '#34c759' },
                ]
            },
            {
                items: [
                    { id: 'sound', label: 'Sound', icon: 'sound', color: '#ff2d55' },
                    { id: 'appearance', label: 'Appearance', icon: 'palette', color: '#ff9500' },
                ]
            },
            {
                items: [
                    { id: 'wallpaper', label: 'Wallpaper', icon: 'wallpaper', color: '#5856d6' },
                    { id: 'displays', label: 'Displays', icon: 'displays', color: '#af52de' },
                ]
            },
            {
                items: [
                    { id: 'privacy', label: 'Privacy & Security', icon: 'privacy', color: '#34c759' },
                ]
            },
            {
                items: [
                    { id: 'general', label: 'General', icon: 'general', color: '#8e8e93' },
                    { id: 'about', label: 'About', icon: 'about', color: '#8e8e93' },
                ]
            }
        ];

        // Filter sidebar groups based on search input
        const filteredGroups = desktopGroups.map(group => {
            const items = group.items.filter(item => 
                item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.id.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return { ...group, items };
        }).filter(group => group.items.length > 0);

        return (
            <div className="settings-app">
                <div className="settings-sidebar">
                    <div className="sidebar-search">
                        <span className="material-icons">search</span>
                        <input 
                            type="text" 
                            placeholder="Search" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <span 
                                className="material-icons search-clear" 
                                style={{ position: 'absolute', right: '22px', fontSize: '14px', opacity: 0.5, cursor: 'pointer' }}
                                onClick={() => setSearchQuery('')}
                            >
                                close
                            </span>
                        )}
                    </div>

                    <div className="sidebar-user">
                        <div className="user-avatar">
                            <span className="material-icons">person</span>
                        </div>
                        <div className="user-info">
                            <span className="user-name">Uday Bhoi</span>
                            <span className="user-subtitle">Apple ID, iCloud+</span>
                        </div>
                        <span className="material-icons chevron">chevron_right</span>
                    </div>

                    <div className="sidebar-groups">
                        {filteredGroups.map((group, groupIdx) => (
                            <div key={groupIdx} className="sidebar-group-block">
                                {group.items.map(section => (
                                    <div
                                        key={section.id}
                                        className={`sidebar-item ${activeSection === section.id ? 'active' : ''}`}
                                        onClick={() => handleSetActiveSection(section.id as SettingsSection)}
                                    >
                                        <div className="item-icon-wrap" style={{ backgroundColor: section.color }}>
                                            {renderSVGIcon(section.icon)}
                                        </div>
                                        <span className="item-label">{section.label}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="settings-content">
                    {renderContent(activeSection)}
                </div>
            </div>
        );
    };

    const renderMobileSettings = () => {
        if (currentView === 'detail') {
            const sectionDetails = mobileSectionsGrouped
                .flatMap(g => g.items)
                .find(item => item.id === activeSection);
            const title = sectionDetails ? sectionDetails.label : 'Settings';

            return (
                <div className="settings-app mobile-detail-view">
                    <div className="mobile-nav-header">
                        <button className="mobile-back-btn" onClick={handleBackToMenu}>
                            <span className="back-chevron">‹</span>
                            <span>Settings</span>
                        </button>
                        <h3 className="mobile-nav-title">{title}</h3>
                        <div className="mobile-nav-right-spacer"></div>
                    </div>
                    <div className="mobile-detail-content">
                        {renderContent(activeSection)}
                    </div>
                </div>
            );
        }

        // Filter mobile lists based on search
        const filteredMobileGroups = mobileSectionsGrouped.map(group => {
            const items = group.items.filter(item => 
                item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.id.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return { ...group, items };
        }).filter(group => group.items.length > 0);

        return (
            <div className="settings-app mobile-menu-view">
                <div className="mobile-settings-header">
                    <h1>Settings</h1>
                </div>

                <div className="mobile-search-bar">
                    <span className="material-icons search-icon">search</span>
                    <input 
                        type="text" 
                        placeholder="Search" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <span 
                            className="material-icons search-clear" 
                            style={{ fontSize: '18px', opacity: 0.5, cursor: 'pointer' }}
                            onClick={() => setSearchQuery('')}
                        >
                            close
                        </span>
                    )}
                </div>

                <div className="mobile-profile-card">
                    <div className="profile-avatar">
                        <span className="material-icons">person</span>
                    </div>
                    <div className="profile-info">
                        <span className="profile-name">Uday Bhoi</span>
                        <span className="profile-subtitle">Apple ID, iCloud, Media & Purchases</span>
                    </div>
                    <span className="material-icons profile-chevron">chevron_right</span>
                </div>

                <div className="mobile-settings-list">
                    {filteredMobileGroups.map((group, groupIdx) => (
                        <div key={groupIdx} className="mobile-settings-group">
                            {group.items.map((item, itemIdx) => (
                                <div
                                    key={itemIdx}
                                    className="mobile-settings-item"
                                    onClick={() => handleSetActiveSection(item.id)}
                                >
                                    <div className="item-icon-container" style={{ backgroundColor: item.color }}>
                                        {renderSVGIcon(item.icon)}
                                    </div>
                                    <span className="item-name">{item.label}</span>
                                    <div className="item-value-container">
                                        {item.status && <span className="item-status">{item.status}</span>}
                                        <span className="material-icons list-chevron">chevron_right</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return isMobile ? renderMobileSettings() : renderDesktopSettings();
};

export default Settings;
