import React, { useState, useEffect } from 'react';

const HealthStatistics = () => {
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/Health-Statistics');
                const data = await response.json();
                setStatistics(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchStatistics();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Health Statistics</h2>
            <p>View health statistics for your region.</p>
            {/* Display charts and graphs with health statistics */}
            <img src="health statistics graph.png" alt="Health Statistics Graph" className="img-fluid" />
        </div>
    );
};
export default HealthStatistics;