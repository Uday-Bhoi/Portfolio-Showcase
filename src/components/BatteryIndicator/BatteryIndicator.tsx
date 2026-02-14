import React, { useState, useEffect } from 'react';
import { Icons } from '../../assets/icons';

interface BatteryManager extends EventTarget {
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    level: number;
    onchargingchange: ((this: BatteryManager, ev: Event) => any) | null;
    onlevelchange: ((this: BatteryManager, ev: Event) => any) | null;
}

const BatteryIndicator: React.FC = () => {
    const [level, setLevel] = useState<number | null>(null);
    const [isCharging, setIsCharging] = useState(false);
    const [isSupported, setIsSupported] = useState(true);

    useEffect(() => {
        const getBattery = async () => {
            const nav = navigator as any;
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
                } catch (e) {
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
        <div className="system-icon-wrap battery-wrap" title={tooltipText}>
            <img src={Icons.battery} className="system-icon" alt="Battery" />
        </div>
    );
};

export default BatteryIndicator;
