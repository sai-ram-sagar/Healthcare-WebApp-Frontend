import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import images
import symptomChecker from "../images/symptom checker.png";
import mentalHealth from "../images/mental health.png";
import familyHealth from "../images/family health management.png";
import doctorCommunication from "../images/doctor communication.png";
import healthStatistics from "../images/health statitics.png";
import emergencyAssistance from "../images/emergency assistence.png";
import tracking from "../images/tracking.png";
import educationalContent from "../images/educational content.jpg";
import aiDriven from "../images/ai driven.png";
import voiceInteraction from "../images/voice interaction.png";
import hospitalLocation from "../images/hospital location.png";
import healthReminder from "../images/health remainder.png";

// Features data
const features = [
    { img: tracking, title: "Tracker", text: "Track your calories and nutrition.", link: "/Tracking" },
    { img: symptomChecker, title: "Symptom Checker", text: "Check your symptoms and get advice.", link: "/symptom-checker" },
    { img: hospitalLocation, title: "Nearby Hospitals", text: "Find hospitals near you for immediate assistance.", link: "/Nearby-Hospitals" },
];

const extraFeatures = [
    { img: healthReminder, title: "Health Reminders", text: "Set reminders for medications, appointments, and more.", link: "/future-feature" },
    { img: mentalHealth, title: "Mental Health Support", text: "Access mental health resources.", link: "/future-feature" },
    { img: familyHealth, title: "Family Health Management", text: "Manage your family's health records.", link: "/future-feature" },
    { img: doctorCommunication, title: "Doctor Communication", text: "Schedule Appointments and interact with your Doctor", link: "/future-feature" },
    { img: healthStatistics, title: "Health Statistics", text: "View health statistics for your region", link: "/future-feature" },
    { img: emergencyAssistance, title: "Emergency Assistance", text: "Get emergency assistance and guidance", link: "/future-feature" },
    { img: educationalContent, title: "Educational Content", text: "Access educational resources about health", link: "/future-feature" },
    { img: aiDriven, title: "AI-Driven Health Advice", text: "Get personalized health advice based on your symptoms and history", link: "/future-feature" },
    { img: voiceInteraction, title: "Voice Interaction", text: "Voice Chat", link: "/future-feature" },
];

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};



const Features = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return(
        <motion.section 
        className="features py-5"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
    >
        <div className="container">
            <motion.h1 className="text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <strong>Features</strong>
            </motion.h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-2 mb-5">
                {features.map(({ img, title, text, link }, index) => (
                    <motion.div className="col" key={title} variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.2 }}>
                        <motion.div className="card h-100 text-center" whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}>
                            <img src={img} className="card-img-top mx-auto" alt={title} />
                            <div className="card-body">
                                <h5 className="card-title">{title}</h5>
                                <p className="card-text">{text}</p>
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <Link to={link} className="btn btn-primary">{title}</Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
            
            <hr/>
            
            <motion.h1 className="text-center mt-5" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <strong>Extra Features</strong>
            </motion.h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-3">
                {extraFeatures.map(({ img, title, text, link }, index) => (
                    <motion.div className="col" key={title} variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.2 }}>
                        <motion.div className="card h-100 text-center" whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}>
                            <img src={img} className="card-img-top mx-auto" alt={title} />
                            <div className="card-body">
                                <h5 className="card-title">{title}</h5>
                                <p className="card-text">{text}</p>
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <Link to={link} className="btn btn-primary">{title}</Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    </motion.section>
    )
};

export default Features;
