import React, { useState, useEffect } from 'react';

const FamilyHealth = () => {
    const [familyMembers, setFamilyMembers] = useState([]);
    const [newMember, setNewMember] = useState({ name: "", age: "", relationship: "" }); // Example state for adding members
    useEffect(() => {
        const fetchFamilyMembers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/family-health');
                const data = await response.json();
                setFamilyMembers(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchFamilyMembers();
    }, []);

    const handleAddMember = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/family-health', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMember)
            });
            const data = await response.json();
            setFamilyMembers([...familyMembers, data]);
            setNewMember({ name: "", age: "", relationship: "" }); // Clear the form
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Family Health Management</h2>
            <p>Manage and track health records for your family members.</p>
            {/* Add form to add family members and their health details */}
            <button className="btn btn-primary">Add Family Member</button>
            {/* Display family members and their health details */}
        </div>
    );
};

// ** Doctor Communication Component
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

export default FamilyHealth;