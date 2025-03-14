import React, { useState, useEffect } from 'react';
const EducationalContent = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/educational-content");
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Educational Content</h2>
            <p>Access educational resources about health.</p>
            {/* Display articles and videos about health topics */}
            <ul className="list-group">
                <li className="list-group-item">
                    <a href="https://www.who.int/" target="_blank" rel="noopener noreferrer">
                        World Health Organization
                    </a>
                </li>
                <li className="list-group-item">
                    <a href="https://www.cdc.gov/" target="_blank" rel="noopener noreferrer">
                        Centers for Disease Control and Prevention
                    </a>
                </li>
            </ul>
        </div>
    );
};
export default EducationalContent;