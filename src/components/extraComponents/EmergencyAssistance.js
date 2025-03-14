import React, { useState } from 'react';

const EmergencyAssistance = () => {
    const [nearbyHospitals, setNearbyHospitals] = useState([]);

    const callEmergencyServices = () => {
        // Implement logic to call emergency services
        alert("Calling emergency services...");
    };

    const findNearbyHospitals = async () => {
        try {
            // Get the user's current location
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    // Call an API to fetch nearby hospitals based on the user's location
                    const response = await fetch(`http://localhost:5000/api/nearby-hospitals?latitude=${latitude}&longitude=${longitude}`);
                    const data = await response.json();
                    setNearbyHospitals(data);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Could not get your location. Please try again.");
                }
            );
        } catch (error) {
            console.error("Error fetching nearby hospitals:", error);
            alert("Failed to fetch nearby hospitals.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Emergency Assistance</h2>
            <p>Get emergency assistance and guidance.</p>
            <button className="btn btn-danger">Call Emergency Services</button>
            <button className="btn btn-warning">Find Nearby Hospitals</button>
        </div>
    );
};

export default EmergencyAssistance;