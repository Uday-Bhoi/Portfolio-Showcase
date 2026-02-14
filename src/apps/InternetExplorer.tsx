import React from 'react';

const Safari: React.FC = () => {
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'white' }}>
            <div style={{
                height: '44px',
                background: '#f6f6f6',
                borderBottom: '1px solid #dcdcdc',
                display: 'flex',
                alignItems: 'center',
                padding: '0 15px',
                gap: '15px'
            }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ fontSize: '20px', color: '#666' }}>‹</span>
                    <span style={{ fontSize: '20px', color: '#ccc' }}>›</span>
                </div>
                <div style={{
                    flex: 1,
                    background: '#e3e3e3',
                    borderRadius: '6px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    color: '#1d1d1f',
                    padding: '0 10px'
                }}>
                    🔍 google.com
                </div>
                <span style={{ fontSize: '18px', color: '#666' }}>⎙</span>
            </div>
            <iframe
                src="https://www.google.com/search?igu=1"
                style={{ flex: 1, border: 'none', background: 'white' }}
                title="Safari"
            />
        </div>
    );
};

export default Safari;
