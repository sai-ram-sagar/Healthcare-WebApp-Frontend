import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";

const SymptomChecker = () => {
    const [symptoms, setSymptoms] = useState("");
    const [advice, setAdvice] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [allSymptoms, setAllSymptoms] = useState([]);

    // Fetch available symptoms from backend on component mount
    useEffect(() => {
        const fetchSymptoms = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/symptoms-list`);
                const data = await response.json();
                setAllSymptoms(data.symptoms); // Assuming backend returns { symptoms: [...] }
            } catch (error) {
                console.error("Error fetching symptoms:", error);
            }
        };

        fetchSymptoms();
    }, []);

    // Handle input change and filter suggestions
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSymptoms(value);

        if (value.length > 0) {
            const filtered = allSymptoms.filter(symptom =>
                symptom.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (symptom) => {
        setSymptoms(symptom);
        setSuggestions([]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/symptom-checker`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ symptoms }),
            });
            const data = await response.json();
            setAdvice(data.advice);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <BackButton/>
            <div className=" shadow p-4 rounded" style={{ width: "100%", maxWidth: "500px", background: "#f8f9fa" }}>
                <h2 className="text-center mb-3 text-primary">🩺 Symptom Checker</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 position-relative">
                        <label htmlFor="symptoms" className="form-label fw-bold">
                            Enter your symptoms:
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-pill px-3 py-2"
                            id="symptoms"
                            value={symptoms}
                            onChange={handleInputChange}
                            autoComplete="off"
                            placeholder="E.g., Fever, Headache..."
                        />
                        {/* Suggestions dropdown */}
                        {suggestions.length > 0 && (
                            <ul className="list-group position-absolute w-100 mt-1 shadow-sm rounded" style={{ zIndex: 10 }}>
                                {suggestions.map((symptom, index) => (
                                    <li
                                        key={index}
                                        className="list-group-item list-group-item-action text-secondary"
                                        onClick={() => handleSuggestionClick(symptom)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {symptom}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 fw-bold">
                        Get Advice
                    </button>
                </form>
                {advice && (
    <div className="mt-4 p-3 bg-light rounded text-center">
        <h5 className="text-success">💡 Advice:</h5>
        <ul className="text-muted text-start">
            {String(advice).split('.').filter(sentence => sentence.trim()).map((sentence, index) => (
                <li key={index}>{sentence.trim()}.</li>
            ))}
        </ul>
    </div>
)}



            </div>
        </div>
    );
};

export default SymptomChecker;
