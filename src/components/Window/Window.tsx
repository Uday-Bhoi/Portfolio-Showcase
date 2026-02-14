import React, { type ReactNode, useRef } from 'react';
import Draggable from 'react-draggable';
import { useOSStore } from '../../store/osStore';
import './Window.css';

interface WindowProps {
    id: string;
    title: string;
    children: ReactNode;
    zIndex: number;
    isMinimized: boolean;
    isMaximized: boolean;
}

const Window: React.FC<WindowProps> = ({
    id,
    title,
    children,
    zIndex,
    isMinimized,
    isMaximized,
}) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const { windows, focusWindow, minimizeWindow, maximizeWindow, closeWindow, focusedWindowId, updateWindowPosition, updateWindowSize } = useOSStore();
    const win = windows.find(w => w.id === id);
    const isFocused = focusedWindowId === id;

    const [isResizing, setIsResizing] = React.useState(false);

    const handleResize = (e: MouseEvent) => {
        if (!isResizing || !win) return;

        const newWidth = Math.max(400, e.clientX - (win.x || 0));
        const newHeight = Math.max(300, e.clientY - (win.y || 0));

        updateWindowSize(id, newWidth, newHeight);
    };

    const stopResize = () => {
        setIsResizing(false);
        window.removeEventListener('mousemove', handleResize);
        window.removeEventListener('mouseup', stopResize);
    };

    const startResize = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        window.addEventListener('mousemove', handleResize);
        window.addEventListener('mouseup', stopResize);
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".window-header"
            onStart={() => focusWindow(id)}
            disabled={isMaximized || isResizing}
            position={isMaximized ? { x: 0, y: 0 } : (win?.x !== undefined && win?.y !== undefined ? { x: win.x, y: win.y } : { x: 0, y: 0 })}
            onDrag={(_e, data) => {
                updateWindowPosition(id, data.x, data.y);
            }}
            onStop={(_e, data) => {
                updateWindowPosition(id, data.x, data.y);
            }}
        >
            <div
                ref={nodeRef}
                className={`window-container ${isFocused ? 'active' : ''} ${isMaximized ? 'maximized' : ''} ${isResizing ? 'resizing' : ''}`}
                style={{
                    zIndex: zIndex + 100,
                    display: isMinimized ? 'none' : 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: isMaximized ? '100%' : win?.width || 800,
                    height: isMaximized ? '100%' : win?.height || 550,
                }}
                onMouseDown={() => focusWindow(id)}
            >
                <header
                    className={`window-header ${isFocused ? 'focused' : ''}`}
                    onDoubleClick={(e) => {
                        e.stopPropagation();
                        maximizeWindow(id);
                    }}
                >
                    <div className="window-controls">
                        <button
                            className="mac-btn btn-close"
                            title="Close"
                            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                        >
                            <span className="icon">×</span>
                        </button>
                        <button
                            className="mac-btn btn-minimize"
                            title="Minimize"
                            onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                        >
                            <span className="icon">−</span>
                        </button>
                        <button
                            className="mac-btn btn-maximize"
                            title="Maximize"
                            onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
                        >
                            <span className="icon">+</span>
                        </button>
                    </div>

                    <div className="window-title">{title}</div>
                </header>

                <div className="window-body">
                    {children}
                </div>

                {!isMaximized && (
                    <div
                        className="window-resizer"
                        onMouseDown={startResize}
                    />
                )}
            </div>
        </Draggable>
    );
};

export default Window;
