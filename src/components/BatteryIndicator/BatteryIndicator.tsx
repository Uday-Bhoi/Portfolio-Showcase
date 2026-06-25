import React, { useState, useEffect } from 'react';

interface BatteryManager extends EventTarget {
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    level: number;
    onchargingchange: ((this: BatteryManager, ev: Event) => void) | null;
    onlevelchange: ((this: BatteryManager, ev: Event) => void) | null;
}

const BatteryIndicator: React.FC = () => {
    const [level, setLevel] = useState<number | null>(null);
    const [isCharging, setIsCharging] = useState(false);
    const [isSupported, setIsSupported] = useState(true);

    useEffect(() => {
        const getBattery = async () => {
            const nav = navigator as Navigator & { getBattery?: () => Promise<BatteryManager> };
            if (nav.getBattery) {
                try {
                    const battery: BatteryManager = await nav.getBattery();

                    const updateBattery = () => {
                        setLevel(battery.level * 100);
                        setIsCharging(battery.charging);
                    };

                    updateBattery();
                    battery.onlevelchange = updateBattery;
                    battery.onchargingchange = updateBattery;
                } catch {
                    setIsSupported(false);
                }
            } else {
                setIsSupported(false);
            }
        };

        getBattery();
    }, []);

    const tooltipText = isSupported
        ? `${level !== null ? Math.round(level) : '--'}% ${isCharging ? '(Charging)' : ''}`
        : 'Battery info unavailable';

    return (
        <div className="system-icon-wrap battery-wrap" title={tooltipText} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'default' }}>
            {level !== null && <span style={{ fontSize: '11px', fontWeight: 500, opacity: 0.85 }}>{Math.round(level)}%</span>}
            <svg width="22" height="11" viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.9 }}>
                {/* Battery body */}
                <rect x="0.75" y="0.75" width="17.5" height="9.5" rx="2.25" stroke="currentColor" strokeWidth="1.5"/>
                {/* Battery tip */}
                <path d="M20.5 3.5C20.9 3.5 21.25 3.85 21.25 4.25V6.75C21.25 7.15 20.9 7.5 20.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                {/* Battery fill */}
                <rect x="2.5" y="2.5" width={Math.max(1, Math.min(14, ((level || 100) / 100) * 14))} height="6" rx="1" fill={isCharging ? "#34c759" : "currentColor"}/>
                {isCharging && (
                    <path d="M10.5 2L7.5 5.5H10.5L9.5 9L12.5 5.5H9.5L10.5 2Z" fill="#34c759" style={{ transform: 'scale(0.8)', transformOrigin: 'center' }}/>
                )}
            </svg>
        </div>
    );
};

export default BatteryIndicator;
