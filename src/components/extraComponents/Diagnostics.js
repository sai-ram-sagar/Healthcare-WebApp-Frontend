import React, { useState, useEffect } from "react";

const Diagnostics = () => {
    const [diagnosticTests, setDiagnosticTests] = useState([]);

    useEffect(() => {
        const fetchDiagnosticTests = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/diagnostics");
                const data = await response.json();
                setDiagnosticTests(data);
            } catch (error) {
                console.error("Error fetching diagnostic tests:", error);
            }
        };

        fetchDiagnosticTests();
    }, []);
    
    const [location, setLocation] = useState(null);
    const [diagnosticCenters, setDiagnosticCenters] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to get user's location
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                    },
                    (error) => {
                        setError(error.message);
                    }
                );
            } else {
                setError("Geolocation is not supported by this browser.");
            }
        };

        getLocation();
    }, []);

    useEffect(() => {
        // Function to fetch nearby diagnostic centers
        const fetchNearbyDiagnosticCenters = async () => {
            if (location) {
                // Replace with your API call to Google Maps, Yelp, or a similar service
                // Example using a mock API:
                try {
                    const response = await fetch(
                        `/api/diagnostic-centers?lat=${location.latitude}&lng=${location.longitude}` // Replace with your actual API endpoint
                    );
                    const data = await response.json();
                    setDiagnosticCenters(data);
                } catch (err) {
                    setError(err.message);
                }
            }
        };

        fetchNearbyDiagnosticCenters();
    }, [location]);

    return (
        <div className="container mt-5">
            <h2>Nearby Diagnostic Centers</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {location ? (
                <div>
                    <p>
                        Your location: Latitude {location.latitude}, Longitude{" "}
                        {location.longitude}
                    </p>
                    {diagnosticCenters.length > 0 ? (
                        <ul>
                            {diagnosticCenters.map((center) => (
                                <li key={center.id}>{center.name}</li> // Adjust based on your API response
                            ))}
                        </ul>
                    ) : (
                        <p>No diagnostic centers found nearby.</p>
                    )}
                </div>
            ) : (
                <p>Loading your location...</p>
            )}
        </div>
    );
};
export default Diagnostics;