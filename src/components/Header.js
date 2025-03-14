import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaHeartbeat, FaSignOutAlt } from "react-icons/fa";

const Header = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const location = useLocation();
    // const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State to control navbar

    // useEffect(() => {
    //     const handleResize = () => setIsMobile(window.innerWidth < 500);
    //     window.addEventListener("resize", handleResize);
    //     return () => window.removeEventListener("resize", handleResize);
    // }, []);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            setIsAuthenticated(false);
            navigate("/login-signup");
        }
    };

    return (
        <header className="header bg-primary text-white py-3">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark d-flex justify-content-between pr-5">
                    <Link to="/" className="navbar-brand">
                        <FaHeartbeat className="logo-icon" /> Smart Healthcare
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setIsNavbarOpen(!isNavbarOpen)}
                        aria-controls="navbarNav"
                        aria-expanded={isNavbarOpen}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`} id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link 
                                    to="/Tracking" 
                                    className={`nav-link ${location.pathname === "/Tracking" ? "active" : ""}`} 
                                    onClick={() => setIsNavbarOpen(false)}
                                >
                                    Tracker
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    to="/symptom-checker" 
                                    className={`nav-link ${location.pathname === "/symptom-checker" ? "active" : ""}`} 
                                    onClick={() => setIsNavbarOpen(false)}
                                >
                                    Symptom Checker
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    to="/Nearby-Hospitals" 
                                    className={`nav-link ${location.pathname === "/Nearby-Hospitals" ? "active" : ""}`} 
                                    onClick={() => setIsNavbarOpen(false)}
                                >
                                    Nearby Hospitals
                                </Link>
                            </li>
                            <li onClick={handleLogout} className="btn btn-danger text-white ms-2 mr-5" style={{maxWidth:"150px"}}>
                                <FaSignOutAlt /> Log Out
                                {/* {!isMobile && " Log Out"} */}
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
