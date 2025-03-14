import React, { useState } from 'react';
const AIDrivenHealthAdvice = () => {
    const [symptoms, setSymptoms] = useState("");
    const [advice, setAdvice] = useState("");

    const getAdvice = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/ai-health-advice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ symptoms })
            });
            const data = await response.json();
            setAdvice(data.advice);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>AI-Driven Health Advice</h2>
            <p>Get personalized health advice based on your symptoms and history.</p>
            {/* Integrate with AI chatbot to provide health advice */}
            <textarea className="form-control" rows="3" placeholder="Enter your symptoms"></textarea>
            <button className="btn btn-primary">Get Advice</button>
        </div>
    );
};

export default AIDrivenHealthAdvice;