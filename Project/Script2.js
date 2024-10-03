import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VideoPlayer from './components/VideoPlayer';
import AudioRecorder from './components/AudioRecorder';
import DialogueDisplay from './components/DialogueDisplay';
import Navigation from './components/Navigation';
import { AppProvider, AppContext } from './context/AppContext';

const App = () => {
    return (
        <AppProvider>
            <Router>
                <div className="min-h-screen bg-gray-100 p-4">
                    <h1 className="text-2xl font-bold mb-4">Mobile Dubbing Interface</h1>
                    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                        <VideoPlayer />
                        <AudioRecorder />
                        <DialogueDisplay />
                        <Navigation />
                    </div>
                </div>
            </Router>
        </AppProvider>
    );
};

export default App;