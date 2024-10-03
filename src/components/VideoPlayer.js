import React, { useRef, useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const VideoPlayer = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const { currentDialogue } = useContext(AppContext);

    useEffect(() => {
        const video = videoRef.current;
        const updateProgress = () => {
            if (video.duration) {
                setProgress((video.currentTime / video.duration) * 100);
            }
        };

        video.addEventListener('timeupdate', updateProgress);
        return () => video.removeEventListener('timeupdate', updateProgress);
    }, []);

    const togglePlayPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleSeek = (e) => {
        const seekTime = (e.target.value / 100) * videoRef.current.duration;
        videoRef.current.currentTime = seekTime;
    };

    return (
        <div className="relative">
            <video
                ref={videoRef}
                className="w-full"
                src="/path/to/your/sample-video.mp4"
            >
                Your browser does not support the video tag.
            </video>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                <button
                    onClick={togglePlayPause}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek}
                    className="w-full mt-2"
                />
            </div>
        </div>
    );
};

export default VideoPlayer;