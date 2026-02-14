import React, { useEffect, useState } from 'react';
import { useOSStore } from '../../store/osStore';
import { Icons } from '../../assets/icons';
import './Launchpad.css';

const Launchpad: React.FC = () => {
    const { isLaunchpadOpen, toggleLaunchpad, openWindow } = useOSStore();
    const [searchText, setSearchText] = useState('');

    // All icons now use local PNG files from assets/mac-icons/
    const apps = [
        { type: 'finder', name: 'Finder', icon: Icons.finder },
        { type: 'safari', name: 'Safari', icon: Icons.safari },
        { type: 'messages', name: 'Messages', icon: Icons.messages },
        { type: 'photos', name: 'Photos', icon: Icons.photos },
        { type: 'facetime', name: 'FaceTime', icon: Icons.facetime },
        { type: 'calendar', name: 'Calendar', icon: Icons.calendar },
        { type: 'notes', name: 'Notes', icon: Icons.notes },
        { type: 'portfolio', name: 'Portfolio', icon: Icons.portfolio },
        { type: 'numbers', name: 'Numbers', icon: Icons.numbers },
        { type: 'pages', name: 'Pages', icon: Icons.pages },
        { type: 'appstore', name: 'App Store', icon: Icons.appstore },
        { type: 'settings', name: 'Settings', icon: Icons.settings },
        { type: 'trash', name: 'Trash', icon: Icons.trash },
        { type: 'music', name: 'Music', icon: Icons.music },
        { type: 'videos', name: 'TV', icon: Icons.appletv },
        { type: 'mail', name: 'Mail', icon: Icons.mail },
        { type: 'contacts', name: 'Contacts', icon: Icons.contacts },
        { type: 'reminders', name: 'Reminders', icon: Icons.reminders },
        { type: 'maps', name: 'Maps', icon: Icons.maps },
    ];

    const filteredApps = apps.filter(app =>
        app.name.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isLaunchpadOpen) {
                toggleLaunchpad(false);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isLaunchpadOpen, toggleLaunchpad]);

    if (!isLaunchpadOpen) return null;

    return (
        <div className="launchpad-overlay" onClick={() => toggleLaunchpad(false)}>
            <div className="launchpad-content" onClick={(e) => e.stopPropagation()}>
                <div className="launchpad-search">
                    <input
                        type="text"
                        placeholder="Search"
                        autoFocus
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <div className="launchpad-grid">
                    {filteredApps.map(app => (
                        <div
                            key={app.type}
                            className="launchpad-item"
                            onClick={() => {
                                if (['videos', 'mail', 'contacts', 'reminders', 'maps', 'messages', 'photos', 'facetime', 'calendar', 'notes', 'numbers', 'pages', 'appstore'].includes(app.type)) {
                                    alert(`${app.name} is a demo app. Content coming soon!`);
                                } else {
                                    const title = app.type === 'settings' ? 'System Settings' : app.name;
                                    openWindow(app.type as any, title);
                                }
                                toggleLaunchpad(false);
                            }}
                        >
                            <img src={app.icon} alt={app.name} />
                            <span>{app.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Launchpad;
