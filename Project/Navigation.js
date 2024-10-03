import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Navigation = () => {
    const { currentDialogueIndex, dialogues, setCurrentDialogueIndex } = useContext(AppContext);

    const goToPreviousDialogue = () => {
        if (currentDialogueIndex > 0) {
            setCurrentDialogueIndex(currentDialogueIndex - 1);
        }
    };

    const goToNextDialogue = () => {
        if (currentDialogueIndex < dialogues.length - 1) {
            setCurrentDialogueIndex(currentDialogueIndex + 1);
        }
    };

    return (
        <div className="flex justify-between p-4">
            <button
                onClick={goToPreviousDialogue}
                disabled={currentDialogueIndex === 0}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
                Previous
            </button>
            <span className="text-lg font-semibold">
                {currentDialogueIndex + 1} / {dialogues.length}
            </span>
            <button
                onClick={goToNextDialogue}
                disabled={currentDialogueIndex === dialogues.length - 1}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
                Next
            </button>
        </div>
    );
};

export default Navigation;