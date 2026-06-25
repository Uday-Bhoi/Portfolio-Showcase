import React, { useState } from 'react';
import { Icons } from '../assets/icons';
import { useOSStore } from '../store/osStore';

const Finder: React.FC = () => {
    const { theme } = useOSStore();
    const [selectedSidebar, setSelectedSidebar] = useState<string>('recents');
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const isDark = theme === 'dark';

    // Theme values
    const sidebarBg = isDark ? 'rgba(30, 30, 30, 0.5)' : 'rgba(239, 236, 236, 0.85)';
    const contentBg = isDark ? 'rgba(25, 25, 25, 0.95)' : '#ffffff';
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.1)';
    const textColor = isDark ? '#ffffff' : '#1d1d1f';
    const subTextColor = isDark ? '#8e8e93' : '#6d6d72';
    const toolbarBg = isDark ? 'rgba(40, 40, 40, 0.95)' : '#f6f6f6';

    const sidebarItems = [
        { id: 'airdrop', label: 'AirDrop', icon: '📡' },
        { id: 'recents', label: 'Recents', icon: '🕘' },
        { id: 'applications', label: 'Applications', icon: '📂' },
        { id: 'documents', label: 'Documents', icon: '📄' },
        { id: 'downloads', label: 'Downloads', icon: '⬇️' }
    ];

    const folderItems = [
        { id: 'docs', name: 'Documents', icon: Icons.folder },
        { id: 'dlds', name: 'Downloads', icon: Icons.folder },
        { id: 'pics', name: 'Pictures', icon: Icons.folder }
    ];

    return (
        <div 
            style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%', 
                background: contentBg, 
                color: textColor,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", sans-serif',
                userSelect: 'none'
            }}
            onClick={() => setSelectedItem(null)}
        >
            {/* Finder Toolbar */}
            <div style={{
                height: '52px',
                background: toolbarBg,
                borderBottom: `1.2px solid ${borderColor}`,
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                gap: '20px',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    {/* Navigation buttons */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ 
                            background: 'none', 
                            border: 'none', 
                            color: isDark ? '#555' : '#ccc', 
                            fontSize: '18px', 
                            padding: '4px',
                            cursor: 'default'
                        }}>◀</button>
                        <button style={{ 
                            background: 'none', 
                            border: 'none', 
                            color: isDark ? '#555' : '#ccc', 
                            fontSize: '18px', 
                            padding: '4px',
                            cursor: 'default'
                        }}>▶</button>
                    </div>
                    {/* Title */}
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>Recents</span>
                </div>

                {/* View Controller */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ 
                        display: 'flex', 
                        border: `1.2px solid ${borderColor}`, 
                        borderRadius: '6px', 
                        overflow: 'hidden',
                        background: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff'
                    }}>
                        <button style={{ background: isDark ? 'rgba(255,255,255,0.1)' : '#e3e3e3', border: 'none', padding: '4px 8px', fontSize: '12px' }}>☰</button>
                        <button style={{ background: 'none', border: 'none', padding: '4px 8px', fontSize: '12px', borderLeft: `1px solid ${borderColor}` }}>⚏</button>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Sidebar */}
                <div style={{
                    width: '180px',
                    background: sidebarBg,
                    backdropFilter: 'blur(15px)',
                    padding: '16px 8px',
                    borderRight: `1.2px solid ${borderColor}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px'
                }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: subTextColor, paddingLeft: '8px' }}>Favorites</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {sidebarItems.map(item => {
                            const isSelected = selectedSidebar === item.id;
                            return (
                                <div 
                                    key={item.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedSidebar(item.id);
                                    }}
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '8px', 
                                        fontSize: '13px', 
                                        padding: '5px 8px', 
                                        borderRadius: '6px', 
                                        color: isSelected ? '#ffffff' : textColor,
                                        background: isSelected ? '#007aff' : 'transparent',
                                        transition: 'background 0.15s, color 0.15s',
                                        fontWeight: isSelected ? 500 : 400
                                    }}
                                >
                                    <span style={{ fontSize: '14px' }}>{item.icon}</span> {item.label}
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ fontSize: '11px', fontWeight: 600, color: subTextColor, paddingLeft: '8px', marginTop: '10px' }}>Location</div>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        fontSize: '13px', 
                        color: textColor,
                        padding: '4px 8px'
                    }}>
                        <img src={Icons.finder} width="16" alt="" style={{ filter: isDark ? 'brightness(0.9)' : 'none' }} /> Macintosh HD
                    </div>
                </div>

                {/* Main Content */}
                <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '20px' }}>
                        {folderItems.map(item => {
                            const isSelected = selectedItem === item.id;
                            return (
                                <div 
                                    key={item.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedItem(item.id);
                                    }}
                                    onDoubleClick={(e) => {
                                        e.stopPropagation();
                                        alert(`${item.name} is empty`);
                                    }}
                                    style={{ 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        alignItems: 'center', 
                                        gap: '6px',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        background: isSelected ? 'rgba(0, 122, 255, 0.15)' : 'transparent',
                                        border: isSelected ? '1px solid rgba(0, 122, 255, 0.3)' : '1px solid transparent',
                                        transition: 'background 0.1s, border-color 0.1s',
                                        textAlign: 'center'
                                    }}
                                    className="finder-item"
                                >
                                    <img src={item.icon} width="48" alt="" style={{ filter: isDark ? 'brightness(0.9)' : 'none' }} />
                                    <span style={{ 
                                        fontSize: '12px', 
                                        fontWeight: isSelected ? 500 : 400,
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        background: isSelected ? '#007aff' : 'transparent',
                                        color: isSelected ? '#ffffff' : textColor
                                    }}>{item.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Finder;
