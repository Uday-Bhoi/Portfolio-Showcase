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
    }, [currentTrackId, isShuffle, playTrack, tracks]);

    // TEMPORARILY DISABLED AUTOMATIC BACKGROUND MUSIC AUTO-PLAY
    /*
    useEffect(() => {
        const handleInteraction = () => {
            if (!hasInteracted) {
                setHasInteracted(true);
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
        window.addEventListener('touchstart', handleInteraction, { once: true });

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, [hasInteracted, currentTrackId, tracks, isShuffle, playTrack, togglePlay]);
    */

    // Sync volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Handle play/pause
    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            if (!hasInteracted) {
                queueMicrotask(() => setHasInteracted(true));
            }
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
            const currentSrc = audioRef.current.src;
            if (!currentSrc || !currentSrc.includes(currentTrack.src)) {
                audioRef.current.src = currentTrack.src;
                if (isPlaying) {
                    audioRef.current.play().catch(() => togglePlay(false));
                }
            }
        }
    }, [currentTrackId, currentTrack, isPlaying, togglePlay]);

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
