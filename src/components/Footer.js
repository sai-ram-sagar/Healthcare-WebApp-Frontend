import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-primary text-white py-4 mt-auto position-relative">
            <div className="container text-center">
                <div className="mb-3">
                    <a href="#" className="text-white mx-2 fs-4"><FaFacebookF /></a>
                    <a href="#" className="text-white mx-2 fs-4"><FaTwitter /></a>
                    <a href="#" className="text-white mx-2 fs-4"><FaLinkedinIn /></a>
                    <a href="#" className="text-white mx-2 fs-4"><FaInstagram /></a>
                </div>
                <div className="mb-3">
                    <Link to="/" className="text-white text-decoration-none mx-2">Home</Link>
                    <Link to="/about" className="text-white text-decoration-none mx-2">About</Link>
                    <Link to="/services" className="text-white text-decoration-none mx-2">Services</Link>
                    <Link to="/team" className="text-white text-decoration-none mx-2">Team</Link>
                    <Link to="/contact" className="text-white text-decoration-none mx-2">Contact</Link>
                </div>
                <p className="mb-0">© 2025 Smart Healthcare WebApp</p>
            </div>
        </footer>
    );
};

export default Footer;
