import React from 'react';
import { Icons } from '../assets/icons';

const Finder: React.FC = () => {
    return (
        <div style={{ display: 'flex', height: '100%', background: 'white' }}>
            {/* Sidebar */}
            <div style={{
                width: '180px',
                background: 'rgba(239, 236, 236, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '20px 15px',
                borderRight: '1px solid #dcdcdc',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
            }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#8e8e93' }}>Favorites</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#1d1d1f' }}>
                        <span style={{ fontSize: '15px' }}>🏠</span> AirDrop
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', background: '#e3e3e3', padding: '4px 8px', borderRadius: '6px', color: '#1d1d1f' }}>
                        <span style={{ fontSize: '15px' }}>🕘</span> Recents
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#1d1d1f' }}>
                        <span style={{ fontSize: '15px' }}>📂</span> Applications
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#1d1d1f' }}>
                        <span style={{ fontSize: '15px' }}>📄</span> Documents
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#1d1d1f' }}>
                        <span style={{ fontSize: '15px' }}>⬇️</span> Downloads
                    </div>
                </div>

                <div style={{ fontSize: '11px', fontWeight: 600, color: '#8e8e93', marginTop: '10px' }}>Location</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#1d1d1f' }}>
                    <img src={Icons.finder} width="16" alt="" /> Macintosh HD
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <img src={Icons.folder} width="48" alt="" />
                        <span style={{ fontSize: '12px', color: '#1d1d1f' }}>Documents</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <img src={Icons.folder} width="48" alt="" />
                        <span style={{ fontSize: '12px', color: '#1d1d1f' }}>Downloads</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <img src={Icons.folder} width="48" alt="" />
                        <span style={{ fontSize: '12px', color: '#1d1d1f' }}>Pictures</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Finder;
