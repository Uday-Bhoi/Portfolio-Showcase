import React, { useState, useEffect } from 'react';
import './CalendarWidget.css';

const CalendarWidget: React.FC = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            if (now.getDate() !== date.getDate()) {
                setDate(now);
            }
        }, 60000); // Check every minute
        return () => clearInterval(timer);
    }, [date]);

    const monthName = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const today = date.getDate();

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    const daysInMonth = getDaysInMonth(year, date.getMonth());
    const firstDay = getFirstDayOfMonth(year, date.getMonth());

    const days = [];
    // Padding for first day of week
    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        days.push(
            <div key={i} className={`calendar-day ${i === today ? 'today' : ''}`}>
                {i}
            </div>
        );
    }

    return (
        <div className="calendar-widget">
            <div className="calendar-header">
                <span className="calendar-month">{monthName}</span>
                <span className="calendar-year">{year}</span>
            </div>
            <div className="calendar-weekdays">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <div key={`${d}-${i}`} className="weekday">{d}</div>
                ))}
            </div>
            <div className="calendar-grid">
                {days}
            </div>
        </div>
    );
};

export default CalendarWidget;
