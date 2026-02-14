import React, { useEffect, useRef, useState } from 'react';
import { useMusicStore } from '../store/musicStore';

const AudioEngine: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    const {
        currentTrackId,
        tracks,
        isPlaying,
        volume,
        nextTrack,
        togglePlay,
        setProgress,
        setDuration,
        currentTime,
        loopMode,
        isShuffle,
        playTrack
    } = useMusicStore();

    const currentTrack = tracks.find(t => t.id === currentTrackId);

    // Prime the playback state on mount so it starts as soon as user interacts
    useEffect(() => {
        if (!currentTrackId && tracks.length > 0) {
            const index = isShuffle ? Math.floor(Math.random() * tracks.length) : 0;
            playTrack(tracks[index].id);
        }
    }, []);

    // Initial autoplay setup: Listen for first interaction
    useEffect(() => {
        const handleInteraction = () => {
            if (!hasInteracted) {
                setHasInteracted(true);
                // If no track is set, pick one and start
                if (!currentTrackId && tracks.length > 0) {
                    const index = isShuffle ? Math.floor(Math.random() * tracks.length) : 0;
                    playTrack(tracks[index].id);
                } else if (currentTrackId) {
                    togglePlay(true);
                }
            }
        };

        window.addEventListener('click', handleInteraction, { once: true });
        window.addEventListener('keydown', handleInteraction, { once: true });

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };
    }, [hasInteracted, currentTrackId, tracks, isShuffle, playTrack, togglePlay]);

    // Sync volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Handle play/pause
    useEffect(() => {
        if (!audioRef.current || !hasInteracted) return;

        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Autoplay prevention - set state back to paused
                    togglePlay(false);
                });
            }
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, hasInteracted, togglePlay]);

    // Handle track changes
    useEffect(() => {
        if (audioRef.current && currentTrack) {
            audioRef.current.src = currentTrack.src;
            if (isPlaying && hasInteracted) {
                audioRef.current.play().catch(() => togglePlay(false));
            }
        }
    }, [currentTrackId]);

    // Update progress state
    const onTimeUpdate = () => {
        if (audioRef.current) {
            setProgress(audioRef.current.currentTime);
        }
    };

    const onLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const onEnded = () => {
        if (loopMode === 'one') {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
        } else {
            nextTrack();
        }
    };

    // Manual seek sync (when user drags progress bar)
    useEffect(() => {
        if (audioRef.current && Math.abs(audioRef.current.currentTime - currentTime) > 1) {
            audioRef.current.currentTime = currentTime;
        }
    }, [currentTime]);

    return (
        <audio
            ref={audioRef}
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
            onEnded={onEnded}
            style={{ display: 'none' }}
        />
    );
};

export default AudioEngine;
