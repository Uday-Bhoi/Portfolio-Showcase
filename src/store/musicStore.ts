import { create } from 'zustand';
import type { MusicState, LoopMode } from '../types/music';

// 1. Import your files at the top
import mySong from '../assets/music/The Weeknd - Is There Someone Else.mp3';
import songCover from '../assets/music/dawn_fm_album_cover.jpg'; // Optional

export const useMusicStore = create<MusicState>((set, get) => ({
    tracks: [
        {
            id: 'track-1',
            title: 'Is there Someone Else',
            artist: 'The Weeknd',
            src: mySong,
            cover: songCover,
        }
    ],
    currentTrackId: null,
    isPlaying: false,
    volume: 0.10,
    currentTime: 0,
    duration: 0,
    isShuffle: true, // Shuffle by default as requested
    loopMode: 'all',

    setTracks: (tracks) => set({ tracks }),

    playTrack: (trackId) => set({
        currentTrackId: trackId,
        isPlaying: true,
        currentTime: 0
    }),

    togglePlay: (force) => set((state) => ({
        isPlaying: force !== undefined ? force : !state.isPlaying
    })),

    setVolume: (volume) => set({ volume }),

    nextTrack: () => {
        const { tracks, currentTrackId, isShuffle } = get();
        if (tracks.length === 0) return;

        // If no track started, pick first (or random if shuffle)
        if (!currentTrackId) {
            const index = isShuffle ? Math.floor(Math.random() * tracks.length) : 0;
            set({ currentTrackId: tracks[index].id, isPlaying: true });
            return;
        }

        if (isShuffle) {
            const otherTracks = tracks.filter(t => t.id !== currentTrackId);
            const nextTrack = otherTracks[Math.floor(Math.random() * otherTracks.length)] || tracks[0];
            set({ currentTrackId: nextTrack.id, isPlaying: true, currentTime: 0 });
        } else {
            const currentIndex = tracks.findIndex(t => t.id === currentTrackId);
            const nextIndex = (currentIndex + 1) % tracks.length;
            set({ currentTrackId: tracks[nextIndex].id, isPlaying: true, currentTime: 0 });
        }
    },

    prevTrack: () => {
        const { tracks, currentTrackId } = get();
        if (tracks.length === 0) return;

        if (!currentTrackId) {
            set({ currentTrackId: tracks[0].id, isPlaying: true });
            return;
        }

        const currentIndex = tracks.findIndex(t => t.id === currentTrackId);
        const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
        set({ currentTrackId: tracks[prevIndex].id, isPlaying: true, currentTime: 0 });
    },

    setCurrentTrackId: (id) => set({ currentTrackId: id }),

    setProgress: (time) => set({ currentTime: time }),

    setDuration: (duration) => set({ duration }),

    toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),

    setLoopMode: (mode: LoopMode) => set({ loopMode: mode })
}));
