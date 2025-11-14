import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from '../services/socket';

const VideoPlayer = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const socket = useSocket();

    useEffect(() => {
        socket.on('play', () => {
            if (videoRef.current) {
                videoRef.current.play();
                setIsPlaying(true);
            }
        });

        socket.on('pause', () => {
            if (videoRef.current) {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        });

        socket.on('sync', (currentTime: number) => {
            if (videoRef.current) {
                videoRef.current.currentTime = currentTime;
            }
        });

        return () => {
            socket.off('play');
            socket.off('pause');
            socket.off('sync');
        };
    }, [socket]);

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
            socket.emit('play');
        }
    };

    const handlePause = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
            socket.emit('pause');
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            socket.emit('sync', videoRef.current.currentTime);
        }
    };

    return (
        <div>
            <video
                ref={videoRef}
                onTimeUpdate={handleTimeUpdate}
                width="600"
                controls
            >
                <source src="your-video-url.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div>
                <button onClick={handlePlay} disabled={isPlaying}>Play</button>
                <button onClick={handlePause} disabled={!isPlaying}>Pause</button>
            </div>
        </div>
    );
};

export default VideoPlayer;