import React, { useState } from 'react';
import { useOSStore } from '../../store/osStore';
import './Settings.css';

type SettingsSection = 'appearance' | 'wallpaper' | 'wi-fi' | 'bluetooth' | 'network' | 'sound' | 'displays' | 'general' | 'about';

interface SectionItem {
    id: SettingsSection;
    label: string;
    icon: string;
    color: string;
}

const Settings: React.FC = () => {
    const { theme, setTheme } = useOSStore();
    const [activeSection, setActiveSection] = useState<SettingsSection>('appearance');

    const sections: SectionItem[] = [
        { id: 'wi-fi', label: 'Wi-Fi', icon: 'wifi', color: '#007aff' },
        { id: 'bluetooth', label: 'Bluetooth', icon: 'bluetooth', color: '#007aff' },
        { id: 'network', label: 'Network', icon: 'settings_input_antenna', color: '#007aff' },
        { id: 'sound', label: 'Sound', icon: 'volume_up', color: '#ff2d55' },
        { id: 'appearance', label: 'Appearance', icon: 'palette', color: '#ff9500' },
        { id: 'wallpaper', label: 'Wallpaper', icon: 'image', color: '#5856d6' },
        { id: 'displays', label: 'Displays', icon: 'monitor', color: '#af52de' },
        { id: 'general', label: 'General', icon: 'settings', color: '#8e8e93' },
        { id: 'about', label: 'About', icon: 'info', color: '#8e8e93' },
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'appearance':
                return (
                    <div className="settings-pane">
                        <header className="pane-header">
                            <h2>Appearance</h2>
                        </header>

                        <div className="settings-group">
                            <div className="group-item no-hover">
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
                        </div>

                        <div className="settings-group">
                            <div className="group-item">
                                <div className="item-label">
                                    <span>Accent Color</span>
                                </div>
                                <div className="item-action">
                                    <div className="accent-dots">
                                        {['#007aff', '#ff9500', '#ff2d55', '#34c759', '#af52de', '#ff3b30'].map(color => (
                                            <div key={color} className="accent-dot" style={{ backgroundColor: color }}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="group-item">
                                <div className="item-label">
                                    <span>Click in the scroll bar to</span>
                                </div>
                                <div className="item-action">
                                    <select className="macos-select">
                                        <option>Jump to the next page</option>
                                        <option>Jump to the spot that's clicked</option>
                                    </select>
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
                                <div className="macos-switch on"></div>
                            </div>
                        </header>

                        <div className="settings-group">
                            <div className="group-title">Known Networks</div>
                            <div className="group-item">
                                <div className="item-icon wifi"><span className="material-icons">wifi</span></div>
                                <div className="item-label">
                                    <span>Antigravity_5G</span>
                                    <span className="subtitle">Connected</span>
                                </div>
                                <div className="item-action">
                                    <span className="material-icons info-icon">info</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'about':
                return (
                    <div className="settings-pane centered">
                        <img src="/apple-logo.png" alt="Apple" className="about-logo" style={{ width: 80, height: 80, filter: 'var(--icon-filter)' }} />
                        <h1 className="about-title">macOS Web OS</h1>
                        <p className="about-version">Version 1.0.0 (Sonoma-inspired)</p>

                        <div className="settings-group about-specs">
                            <div className="group-item">
                                <span className="spec-label">Processor</span>
                                <span className="spec-value">Antigravity Neural Core</span>
                            </div>
                            <div className="group-item">
                                <span className="spec-label">Memory</span>
                                <span className="spec-value">64 GB WebRAM</span>
                            </div>
                            <div className="group-item">
                                <span className="spec-label">Graphics</span>
                                <span className="spec-value">Hardware Accelerated WebGL</span>
                            </div>
                        </div>

                        <button className="macos-btn system-report">System Report...</button>
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

    return (
        <div className="settings-app">
            <div className="settings-sidebar">
                <div className="sidebar-search">
                    <span className="material-icons">search</span>
                    <input type="text" placeholder="Search" />
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
                    {sections.map(section => (
                        <div
                            key={section.id}
                            className={`sidebar-item ${activeSection === section.id ? 'active' : ''}`}
                            onClick={() => setActiveSection(section.id)}
                        >
                            <div className="item-icon-wrap" style={{ backgroundColor: section.color }}>
                                <span className="material-icons">{section.icon}</span>
                            </div>
                            <span className="item-label">{section.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="settings-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default Settings;
