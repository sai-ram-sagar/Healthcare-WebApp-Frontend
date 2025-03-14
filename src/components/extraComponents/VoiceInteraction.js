
import React, { useState, useEffect } from 'react';
const VoiceInteraction = () => {
    const [voiceCommands, setVoiceCommands] = useState([]);
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        const fetchVoiceCommands = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/voice-interaction");
                const data = await response.json();
                setVoiceCommands(data);
            } catch (error) {
                console.error("Error fetching voice commands:", error);
            }
        };

        fetchVoiceCommands();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Voice Interaction</h2>
            <p>Interact with the app using voice commands.</p>
            {/* Integrate with voice recognition API */}
            <button className="btn btn-primary">Start Voice Chat</button>
        </div>
    );
};
export default VoiceInteraction;