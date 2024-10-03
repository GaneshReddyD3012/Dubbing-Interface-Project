import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const DialogueDisplay = () => {
    const { currentDialogue, updateDialogue } = useContext(AppContext);

    const handleOriginalTextChange = (e) => {
        updateDialogue({ ...currentDialogue, originalText: e.target.value });
    };

    const handleTranslatedTextChange = (e) => {
        updateDialogue({ ...currentDialogue, translatedText: e.target.value });
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <label htmlFor="originalText" className="block text-sm font-medium text-gray-700">
                    Original Text
                </label>
                <textarea
                    id="originalText"
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    value={currentDialogue.originalText}
                    onChange={handleOriginalTextChange}
                />
            </div>
            <div>
                <label htmlFor="translatedText" className="block text-sm font-medium text-gray-700">
                    Translated Text
                </label>
                <textarea
                    id="translatedText"
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    value={currentDialogue.translatedText}
                    onChange={handleTranslatedTextChange}
                />
            </div>
        </div>
    );
};

export default DialogueDisplay;