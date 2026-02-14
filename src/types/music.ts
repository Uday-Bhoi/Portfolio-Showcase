export interface Track {
    id: string;
    title: string;
    artist: string;
    src: string;
    cover?: string;
}

export type LoopMode = 'none' | 'one' | 'all';

export interface MusicState {
    tracks: Track[];
    currentTrackId: string | null;
    isPlaying: boolean;
    volume: number;
    currentTime: number;
    duration: number;
    isShuffle: boolean;
    loopMode: LoopMode;

    // Actions
    setTracks: (tracks: Track[]) => void;
    playTrack: (trackId: string) => void;
    togglePlay: (force?: boolean) => void;
    setVolume: (volume: number) => void;
    nextTrack: () => void;
    prevTrack: () => void;
    setCurrentTrackId: (id: string | null) => void;
    setProgress: (time: number) => void;
    setDuration: (duration: number) => void;
    toggleShuffle: () => void;
    setLoopMode: (mode: LoopMode) => void;
}
