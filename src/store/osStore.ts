import { create } from 'zustand';
import type { AppType, WindowInstance } from '../types/os';

interface WindowState {
    windows: WindowInstance[];
    focusedWindowId: string | null;
    activeApp: string; // The app currently in the menu bar
    isLaunchpadOpen: boolean;
    theme: 'light' | 'dark' | 'custom';
    wallpaper: 'standard' | 'light-pillar' | 'floating-lines' | 'mando' | 'sequoia' | 'lake' | 'cyberpunk' | 'desert';

    // Actions
    openWindow: (type: AppType, title: string) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    updateWindowPosition: (id: string, x: number, y: number) => void;
    updateWindowSize: (id: string, width: number, height: number) => void;
    clampWindowsToViewport: () => void;
    setActiveApp: (label: string) => void;
    toggleLaunchpad: (isOpen?: boolean) => void;
    setTheme: (theme: 'light' | 'dark' | 'custom') => void;
    setWallpaper: (wallpaper: 'standard' | 'light-pillar' | 'floating-lines' | 'mando' | 'sequoia' | 'lake' | 'cyberpunk' | 'desert') => void;
}

const getWorkspaceBounds = () => {
    const menuBarEl = document.querySelector('.menu-bar');
    const dockEl = document.querySelector('.dock-container');
    const menuBarHeight = menuBarEl ? menuBarEl.clientHeight : 32;
    const dockHeight = dockEl ? dockEl.clientHeight : 80;

    const availableWidth = window.innerWidth;
    const availableHeight = Math.max(300, window.innerHeight - menuBarHeight - dockHeight);

    return { menuBarHeight, dockHeight, availableWidth, availableHeight };
};

const getInitialTheme = (): 'light' | 'dark' | 'custom' => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('os_theme');
        if (stored === 'dark' || stored === 'light' || stored === 'custom') {
            return stored;
        }
    }
    return 'light';
};

export const useOSStore = create<WindowState>((set) => ({
    windows: [],
    focusedWindowId: null,
    activeApp: 'Finder',
    isLaunchpadOpen: false,
    theme: getInitialTheme(),
    wallpaper: 'standard',

    openWindow: (type, title) => set((state) => {
        // If Launchpad is open, close it when opening an app
        const launchpadUpdate = state.isLaunchpadOpen ? { isLaunchpadOpen: false } : {};

        const existing = state.windows.find(w => w.type === type);

        // Native apps that should update the Menu Bar
        const nativeApps: AppType[] = ['finder', 'safari', 'settings', 'terminal'];
        const shouldUpdateMenu = nativeApps.includes(type);
        const newActiveApp = shouldUpdateMenu ? title : state.activeApp;

        if (existing) {
            const maxZ = Math.max(...state.windows.map(w => w.zIndex), 0);
            const otherWindows = state.windows.filter(w => w.id !== existing.id);
            const focusedWin = { ...existing, isMinimized: false, zIndex: maxZ + 1 };
            return {
                ...launchpadUpdate,
                focusedWindowId: existing.id,
                activeApp: newActiveApp,
                windows: [...otherWindows, focusedWin]
            };
        }

        const maxZ = Math.max(...state.windows.map(w => w.zIndex), 0);

        const { menuBarHeight, dockHeight, availableWidth, availableHeight } = getWorkspaceBounds();

        // App-specific standard dimensions
        const defaultSizes: Record<string, { w: number, h: number }> = {
            'settings': { w: 900, h: 600 },
            'safari': { w: 1024, h: 700 },
            'music': { w: 900, h: 620 },
            'portfolio': { w: 900, h: 620 },
            'finder': { w: 850, h: 520 },
            'terminal': { w: 800, h: 480 }
        };

        const targetSize = defaultSizes[type] || { w: 900, h: 600 };
        const width = Math.max(380, Math.min(targetSize.w, availableWidth - 40));
        const height = Math.max(280, Math.min(targetSize.h, availableHeight - 20));

        let x = Math.max(20, (availableWidth - width) / 2);
        let y = Math.max(menuBarHeight + 10, menuBarHeight + (availableHeight - height) / 2);

        if (state.windows.length > 0) {
            // Cascade from the most recently focused window or last created
            const lastWin = state.windows[state.windows.length - 1];
            x = (lastWin.x !== undefined ? lastWin.x : x) + 30;
            y = (lastWin.y !== undefined ? lastWin.y : y) + 30;

            // Clamp position so title bar stays reachable and window stays inside desktop bounds
            const maxX = Math.max(20, availableWidth - width - 20);
            const maxY = Math.max(menuBarHeight + 10, window.innerHeight - dockHeight - height - 10);

            if (x > maxX) x = Math.max(20, (x % maxX) + 40);
            if (y > maxY) y = Math.max(menuBarHeight + 10, Math.min(y, maxY));
        }

        const newWindow: WindowInstance = {
            id: Math.random().toString(36).substring(2, 9),
            type,
            title,
            isMinimized: false,
            isMaximized: false,
            zIndex: maxZ + 1,
            x,
            y,
            width,
            height
        };

        return {
            ...launchpadUpdate,
            windows: [...state.windows, newWindow],
            focusedWindowId: newWindow.id,
            activeApp: newActiveApp
        };
    }),

    closeWindow: (id) => set((state) => {
        const remainingWindows = state.windows.filter(w => w.id !== id);
        // If no windows left, or the closed window was the active app, default to Finder
        const nextActiveApp = remainingWindows.length > 0 ? state.activeApp : 'Finder';

        return {
            windows: remainingWindows,
            focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId,
            activeApp: nextActiveApp
        };
    }),

    minimizeWindow: (id) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, isMinimized: true } : w),
        focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId
    })),

    maximizeWindow: (id) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized, isMinimized: false } : w),
        focusedWindowId: id
    })),

    focusWindow: (id) => set((state) => {
        const win = state.windows.find(w => w.id === id);
        if (!win) return state;

        const maxZ = Math.max(...state.windows.map(w => w.zIndex), 0);

        // Move focused window to end of array to ensure it's rendered last in DOM
        const otherWindows = state.windows.filter(w => w.id !== id);
        const focusedWin = { ...win, zIndex: maxZ + 1, isMinimized: false };

        const nativeApps: AppType[] = ['finder', 'safari', 'settings', 'terminal'];
        const shouldUpdateMenu = nativeApps.includes(win.type);
        const newActiveApp = shouldUpdateMenu ? win.title : state.activeApp;

        return {
            windows: [...otherWindows, focusedWin],
            focusedWindowId: id,
            activeApp: newActiveApp
        };
    }),

    updateWindowPosition: (id, x, y) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, x, y } : w)
    })),
    updateWindowSize: (id, width, height) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, width, height } : w)
    })),
    clampWindowsToViewport: () => set((state) => {
        const { menuBarHeight, dockHeight, availableWidth, availableHeight } = getWorkspaceBounds();
        return {
            windows: state.windows.map(win => {
                if (win.isMaximized) return win;
                const winW = win.width || 800;
                const winH = win.height || 550;
                const winX = win.x !== undefined ? win.x : 20;
                const winY = win.y !== undefined ? win.y : 50;

                const width = Math.max(380, Math.min(winW, availableWidth - 40));
                const height = Math.max(280, Math.min(winH, availableHeight - 20));
                const maxX = Math.max(10, availableWidth - width - 10);
                const maxY = Math.max(menuBarHeight + 5, window.innerHeight - dockHeight - height - 10);
                const x = Math.min(Math.max(10, winX), maxX);
                const y = Math.min(Math.max(menuBarHeight + 5, winY), maxY);
                return { ...win, width, height, x, y };
            })
        };
    }),
    setActiveApp: (label) => set({ activeApp: label }),
    toggleLaunchpad: (isOpen) => set((state) => ({
        isLaunchpadOpen: isOpen !== undefined ? isOpen : !state.isLaunchpadOpen
    })),
    setTheme: (theme) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('os_theme', theme);
        }
        set({ theme });
    },
    setWallpaper: (wallpaper) => set({ wallpaper }),
}));
