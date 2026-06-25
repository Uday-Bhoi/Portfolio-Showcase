import { create } from 'zustand';
import type { MusicState, LoopMode, Track } from '../types/music';

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
    error: null,

    setError: (error) => set({ error }),
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

    setLoopMode: (mode: LoopMode) => set({ loopMode: mode }),

    fetchSpotifyTracks: async (query: string) => {
        const { setError } = get();
        
        const MOCK_FALLBACK_TRACKS = [
            {
                id: 'mock-1',
                title: 'Is there Someone Else',
                artist: 'The Weeknd',
                src: mySong,
                cover: songCover,
            },
            {
                id: 'mock-2',
                title: 'Blinding Lights',
                artist: 'The Weeknd',
                src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
                cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop&q=80',
            },
            {
                id: 'mock-3',
                title: 'Starboy',
                artist: 'The Weeknd',
                src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
                cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop&q=80',
            },
            {
                id: 'mock-4',
                title: 'Save Your Tears',
                artist: 'The Weeknd',
                src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
                cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop&q=80',
            }
        ];

        const updateTracksList = (newTracks: Track[]) => {
            const currentTracks = get().tracks;
            const activeId = get().currentTrackId;
            const activeTrack = activeId ? currentTracks.find(t => t.id === activeId) : null;
            
            const updated = [...newTracks];
            if (activeTrack && !updated.some(t => t.id === activeId)) {
                updated.unshift(activeTrack);
            }
            return updated;
        };

        // Check if Spotify search has been disabled for this session (due to 403 API restrictions)
        if (sessionStorage.getItem('spotify_disabled') === 'true') {
            const queryLower = query.toLowerCase();
            const filteredMock = MOCK_FALLBACK_TRACKS.filter(
                t => t.title.toLowerCase().includes(queryLower) || t.artist.toLowerCase().includes(queryLower)
            );
            const fallbackResults = filteredMock.length > 0 ? filteredMock : MOCK_FALLBACK_TRACKS;
            set({ tracks: updateTracksList(fallbackResults) });
            return;
        }

        try {
            setError(null);
            const { spotifyService } = await import('../services/spotifyService');
            const spotifyTracks = await spotifyService.searchTracks(query);

            const tracks = spotifyTracks
                .filter(t => t.preview_url) // Only keep tracks with previews for the <audio> element
                .map(t => ({
                    id: t.id,
                    title: t.name,
                    artist: t.artists[0].name,
                    src: t.preview_url!,
                    cover: t.album.images[0]?.url
                }));

            if (tracks.length > 0) {
                set({ tracks: updateTracksList(tracks) });
            } else {
                // If search succeeds but has no previews, fallback to mock list
                set({ tracks: updateTracksList(MOCK_FALLBACK_TRACKS) });
            }
        } catch (error) {
            const err = error as Error;
            // Mark Spotify API as disabled for this session on 403/Forbidden/premium responses
            if (err.message.includes('403') || err.message.includes('premium') || err.message.includes('subscription')) {
                sessionStorage.setItem('spotify_disabled', 'true');
            }
            
            const queryLower = query.toLowerCase();
            const filteredMock = MOCK_FALLBACK_TRACKS.filter(
                t => t.title.toLowerCase().includes(queryLower) || t.artist.toLowerCase().includes(queryLower)
            );
            
            const fallbackResults = filteredMock.length > 0 ? filteredMock : MOCK_FALLBACK_TRACKS;
            set({ tracks: updateTracksList(fallbackResults) });
            setError(null); // Clear the error status since we recovered gracefully
        }
    }
}));
