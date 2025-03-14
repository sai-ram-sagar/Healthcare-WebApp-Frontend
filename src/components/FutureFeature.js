import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const FutureUpdate = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <motion.div 
            className="container d-flex flex-column justify-content-center align-items-center text-center vh-100"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}

        >
            <motion.div 
                initial={{ rotate: -10 }}
                animate={{ rotate: 10 }}
                transition={{ repeat: Infinity, repeatType: "mirror", duration: 2 }}
            >
                <FontAwesomeIcon icon={faTools} size="4x" className="text-warning mb-3" />
            </motion.div>

            <motion.h1 
                className="mb-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                Feature Coming Soon!
            </motion.h1>

            <motion.p 
                className="text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
            >
                We're working on this feature to make your experience even better. Stay tuned for updates!
            </motion.p>

            <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <Link to="/features" className="btn btn-primary mt-3">
                    Go Back to Explore Features
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default FutureUpdate;
