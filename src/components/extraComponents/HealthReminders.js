import React, { useState } from "react";
import axios from "axios";

const PUBLIC_VAPID_KEY = "BFcjrmp0Tg_zLSxXT9M5XR3xCAonlRFlOcMFmqDbNJxGjwCt5RQbCDCSCm6HYnXWUYQXRFn56iA1fALBLbBI4G4";

const Remainder = () => {
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");

  const handleSubscribe = async () => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      alert("Push notifications are not supported in this browser.");
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
      });

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/subscribe`, subscription);
      alert("Subscribed to notifications!");
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  const handleSetReminder = async () => {
    if (!message || !time) {
      alert("Please enter a message and time.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/set-reminder`, { time, message });
      alert("Reminder set successfully!");
    } catch (error) {
      console.error("Error setting reminder:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Set a Health Reminder</h2>
      <input
        type="text"
        placeholder="Enter reminder message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={styles.input}
      />
      <input
        type="datetime-local"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSetReminder} style={styles.buttonPrimary}>
        Set Reminder
      </button>
      <button onClick={handleSubscribe} style={styles.buttonSecondary}>
        Enable Notifications
      </button>
    </div>
  );
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "auto",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
    fontSize: "22px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
  },
  buttonPrimary: {
    width: "100%",
    padding: "12px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#28a745",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "10px",
    transition: "background 0.3s ease",
  },
  buttonSecondary: {
    width: "100%",
    padding: "12px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
};

export default Remainder;
