import React, { useState, useEffect } from 'react';

const DoctorCommunication = () => {
    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({ date: "", time: "", reason: "" });

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/Doctor-Communication');
                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchAppointments();
    }, []);

    const handleScheduleAppointment = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/Doctor-Communication', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAppointment)
            });
            const data = await response.json();
            setAppointments([...appointments, data]);
            setNewAppointment({ date: "", time: "", reason: "" });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Doctor Communication</h2>
            <p>Schedule appointments and communicate with your doctor.</p>
            {/* Add functionality to schedule appointments and chat with doctors */}
            <button className="btn btn-primary">Schedule Appointment</button>
            <button className="btn btn-info">Start Chat</button>
        </div>
    );
};

export default DoctorCommunication;