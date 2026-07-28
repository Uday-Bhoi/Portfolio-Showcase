import React, { useState } from 'react';
import './MobileRemindersWidget.css';

const MobileRemindersWidget: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Capstone Projects are to be completed', completed: false },
    { id: 2, text: 'Placement Form', completed: false },
    { id: 3, text: 'Assignment upload kr', completed: false },
  ]);

  const toggleItem = (id: number) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const activeCount = items.filter(i => !i.completed).length;

  return (
    <div className="reminders-widget-wrapper">
      <div className="reminders-widget-card">
        {/* Left Column */}
        <div className="reminders-left-col">
          <div className="reminders-orange-icon">
            <span className="material-icons">format_list_bulleted</span>
          </div>
          <div className="reminders-count-block">
            <span className="reminders-big-count">{activeCount}</span>
            <span className="reminders-title-orange">Reminders</span>
          </div>
        </div>

        {/* Right Column List */}
        <div className="reminders-right-col">
          {items.map(item => (
            <div 
              key={item.id} 
              className={`reminder-list-item ${item.completed ? 'completed' : ''}`}
              onClick={() => toggleItem(item.id)}
            >
              <div className="reminder-radio-circle">
                {item.completed && <div className="radio-filled-dot" />}
              </div>
              <span className="reminder-item-text">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      <span className="widget-caption-label">Reminders</span>
    </div>
  );
};

export default MobileRemindersWidget;
