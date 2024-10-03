import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [dialogues, setDialogues] = useState([
        { id: 1, originalText: "Hello, how are you?", translatedText: "Hola, ¿cómo estás?" },
        { id: 2, originalText: "I'm fine, thank you.", translatedText: "Estoy bien, gracias." },
        { id: 3, originalText: "What's your name?", translatedText: "¿Cómo te llamas?" },
    ]);

    const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
    const [recordedAudio, setRecordedAudio] = useState(null);

    const updateDialogue = (updatedDialogue) => {
        const newDialogues = [...dialogues];
        newDialogues[currentDialogueIndex] = updatedDialogue;
        setDialogues(newDialogues);
    };

    useEffect(() => {
        // Load dialogues from local storage if available
        const storedDialogues = localStorage.getItem('dialogues');
        if (storedDialogues) {
            setDialogues(JSON.parse(storedDialogues));
        }
    }, []);

    useEffect(() => {
        // Save dialogues to local storage whenever they change
        localStorage.setItem('dialogues', JSON.stringify(dialogues));
    }, [dialogues]);

    return (
        <AppContext.Provider
            value={{
                dialogues,
                setDialogues,
                currentDialogueIndex,
                setCurrentDialogueIndex,
                currentDialogue: dialogues[currentDialogueIndex],
                updateDialogue,
                recordedAudio,
                setRecordedAudio,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};