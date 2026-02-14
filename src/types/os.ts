/**
 * Supported Application Types in the macOS-inspired environment.
 */
export type AppType =
    | 'finder'      // File Explorer
    | 'safari'      // Web Browser
    | 'portfolio'   // Developer Portfolio
    | 'trash'       // Trash Can
    | 'settings'    // System Settings
    | 'terminal'    // Terminal Emulator
    | 'music'       // Apple Music
    | 'launchpad';  // Application Launcher

export interface WindowInstance {
    id: string;
    type: AppType;
    title: string;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
    // Window position and size tracking
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}

export interface AppMetadata {
    type: AppType;
    name: string;
    icon: string;
}
