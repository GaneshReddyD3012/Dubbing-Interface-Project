import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { PlayCircle, PauseCircle, Mic, Square, SkipBack, SkipForward, LogIn, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

// Context for managing global state
const DubbingContext = createContext();

// Mock dialogue data
const mockDialogues = [
    { id: 1, originalText: "Hello, how are you?", translatedText: "¡Hola! ¿Cómo estás?" },
    { id: 2, originalText: "The weather is nice today.", translatedText: "El clima está agradable hoy." },
    { id: 3, originalText: "I love learning new languages!", translatedText: "¡Me encanta aprender nuevos idiomas!" },
];

// Mock user data
const mockUser = {
    username: "demo",
    password: "password123"
};

// Main component
export default function DubbingInterface() {
    const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [recordings, setRecordings] = useState({});

    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const canvasRef = useRef(null);

    // Load saved recordings from localStorage on component mount
    useEffect(() => {
        const savedRecordings = localStorage.getItem('recordings');
        if (savedRecordings) {
            setRecordings(JSON.parse(savedRecordings));
        }
    }, []);

    // Save recordings to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('recordings', JSON.stringify(recordings));
    }, [recordings]);

    useEffect(() => {
        // Set up audio context for visualization
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 2048;
    }, []);

    const handleLogin = () => {
        if (username === mockUser.username && password === mockUser.password) {
            setIsAuthenticated(true);
            setError(null);
        } else {
            setError("Invalid username or password");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUsername("");
        setPassword("");
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            const chunks = [];

            mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
                const url = URL.createObjectURL(blob);
                setAudioURL(url);

                // Save recording to state and localStorage
                setRecordings(prev => ({
                    ...prev,
                    [currentDialogueIndex]: url
                }));
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            drawWaveform();
        } catch (err) {
            setError("Could not access microphone. Please check permissions.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const togglePlayback = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const drawWaveform = () => {
        if (!canvasRef.current || !analyserRef.current) return;

        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        function draw() {
            if (!isRecording) return;

            requestAnimationFrame(draw);
            analyserRef.current.getByteTimeDomainData(dataArray);

            canvasCtx.fillStyle = 'rgb(200, 200, 200)';
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
            canvasCtx.beginPath();

            const sliceWidth = canvas.width * 1.0 / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = v * canvas.height / 2;

                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
        }

        draw();
    };

    const navigateDialogue = (direction) => {
        setCurrentDialogueIndex(prev => {
            const newIndex = direction === 'next' ? prev + 1 : prev - 1;
            return Math.max(0, Math.min(newIndex, mockDialogues.length - 1));
        });
        // Load recording for the new dialogue if it exists
        setAudioURL(recordings[currentDialogueIndex] || null);
    };

    const contextValue = {
        currentDialogue: mockDialogues[currentDialogueIndex],
        isRecording,
        audioURL,
        isPlaying,
        error,
        isAuthenticated,
    };

    if (!isAuthenticated) {
        return (
            <div className="max-w-md mx-auto p-4 space-y-4">
                <Card>
                    <CardContent className="p-4">
                        <h2 className="text-xl font-bold mb-4">Login</h2>
                        {error && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
                                <Input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                <LogIn className="h-4 w-4 mr-2" />
                                Login
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <DubbingContext.Provider value={contextValue}>
            <div className="max-w-md mx-auto p-4 space-y-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">Dubbing Interface</h1>
                    <Button onClick={handleLogout} variant="outline">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </Button>
                </div>

                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <Card>
                    <CardContent className="p-4">
                        <div className="aspect-video bg-gray-200 mb-4 relative">
                            <video
                                ref={videoRef}
                                className="w-full h-full"
                                src="/api/placeholder/400/320"
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 p-2">
                                <div className="flex justify-center">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={togglePlayback}
                                    >
                                        {isPlaying ? <PauseCircle className="h-6 w-6 text-white" /> : <PlayCircle className="h-6 w-6 text-white" />}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between mb-2">
                                <Button
                                    onClick={() => navigateDialogue('prev')}
                                    disabled={currentDialogueIndex === 0}
                                >
                                    <SkipBack className="h-4 w-4 mr-2" />
                                    Previous
                                </Button>
                                <Button
                                    onClick={() => navigateDialogue('next')}
                                    disabled={currentDialogueIndex === mockDialogues.length - 1}
                                >
                                    Next
                                    <SkipForward className="h-4 w-4 ml-2" />
                                </Button>
                            </div>

                            <div className="text-sm font-medium">Original Text:</div>
                            <div className="p-2 bg-gray-100 rounded">
                                {contextValue.currentDialogue.originalText}
                            </div>

                            <div className="text-sm font-medium">Translated Text:</div>
                            <div className="p-2 bg-gray-100 rounded">
                                {contextValue.currentDialogue.translatedText}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="space-y-4">
                            <canvas ref={canvasRef} className="w-full h-24 bg-gray-100 rounded" />

                            <div className="flex justify-center space-x-2">
                                <Button
                                    onClick={isRecording ? stopRecording : startRecording}
                                    variant={isRecording ? "destructive" : "default"}
                                >
                                    {isRecording ? (
                                        <>
                                            <Square className="h-4 w-4 mr-2" />
                                            Stop Recording
                                        </>
                                    ) : (
                                        <>
                                            <Mic className="h-4 w-4 mr-2" />
                                            Start Recording
                                        </>
                                    )}
                                </Button>
                            </div>

                            {audioURL && (
                                <div className="mt-4">
                                    <audio controls src={audioURL} className="w-full" />
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DubbingContext.Provider>
    );
}
