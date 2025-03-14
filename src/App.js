import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import Home from "./components/Home";
import SymptomChecker from "./components/SymptomChecker";
import Features from "./components/Features";
import NearbyHospitals from "./components/NearbyHospitals";
import Tracking from "./components/Tracking";
import FutureFeature from "./components/FutureFeature";

import MentalHealth from "./components/extraComponents/MentalHealth";
import FamilyHealth from "./components/extraComponents/FamilyHealth";
import DoctorCommunication from "./components/extraComponents/DoctorCommunication";
import HealthStatistics from "./components/extraComponents/HealthStatistics";
import EmergencyAssistance from "./components/extraComponents/EmergencyAssistance";
import EducationalContent from "./components/extraComponents/EducationalContent";
import AIDrivenHealthAdvice from "./components/extraComponents/AIDrivenHealthAdvice";
import VoiceInteraction from "./components/extraComponents/VoiceInteraction";
import ForgotPassword from "./components/extraComponents/ForgotPassword";
import Diagnostics from "./components/extraComponents/Diagnostics";
import HealthReminders from "./components/extraComponents/HealthReminders";

// ✅ Use State for Authentication
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

    // Update auth state when `token` changes in localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem("token"));
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // Protected Route: Redirect if not authenticated
    const ProtectedRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/login-signup" />;
    };

    // Prevent logged-in users from accessing login page
    const AuthRoute = ({ element }) => {
        return isAuthenticated ? <Navigate to="/" /> : element;
    };

    // Layout for Header/Footer
    const Layout = ({ children }) => {
        const location = useLocation();
        const hideHeaderFooter = location.pathname === "/login-signup";
        return (
            <div>
                {!hideHeaderFooter && <Header setIsAuthenticated={setIsAuthenticated} /> }
                {children}
                {!hideHeaderFooter && <Footer />}
            </div>
        );
    };

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/login-signup" element={<AuthRoute element={<Auth setIsAuthenticated={setIsAuthenticated} />} />} />
                    <Route path="/" element={<ProtectedRoute element={<Home />} />} />
                    <Route path="/symptom-checker" element={<ProtectedRoute element={<SymptomChecker />} />} />
                    <Route path="/mental-health" element={<ProtectedRoute element={<MentalHealth />} />} />
                    <Route path="/family-health" element={<ProtectedRoute element={<FamilyHealth />} />} />
                    <Route path="/Doctor-Communication" element={<ProtectedRoute element={<DoctorCommunication />} />} />
                    <Route path="/Health-Statistics" element={<ProtectedRoute element={<HealthStatistics />} />} />
                    <Route path="/Emergency-Assistance" element={<ProtectedRoute element={<EmergencyAssistance />} />} />
                    <Route path="/Tracking" element={<ProtectedRoute element={<Tracking />} />} />
                    <Route path="/Educational-Content" element={<ProtectedRoute element={<EducationalContent />} />} />
                    <Route path="/AI-Driven-Health-Advice" element={<ProtectedRoute element={<AIDrivenHealthAdvice />} />} />
                    <Route path="/Voice-Interaction" element={<ProtectedRoute element={<VoiceInteraction />} />} />
                    <Route path="/Nearby-Hospitals" element={<ProtectedRoute element={<NearbyHospitals />} />} />
                    <Route path="/Health-Reminders" element={<ProtectedRoute element={<HealthReminders />} />} />
                    <Route path="/forgot-password" element={<ProtectedRoute element={<ForgotPassword />} />} />
                    <Route path="/diagnostics" element={<ProtectedRoute element={<Diagnostics />} />} />
                    <Route path="/features" element={<ProtectedRoute element={<Features />} />} />
                    <Route path="/future-feature" element={<ProtectedRoute element={<FutureFeature />} />} />
                    <Route path="*" element={<Navigate to="/login-signup" />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
