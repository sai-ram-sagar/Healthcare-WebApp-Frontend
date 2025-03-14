import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  return(
    <motion.section
        className="home py-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="container" style={{marginTop:"-200px"}}>
          <div className="row justify-content-center align-items-center text-center">
            <motion.div 
              className="col-md-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            >
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              >
                Welcome to Smart Healthcare
              </motion.h1>

              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
              >
                Your health, our priority. Get real-time assistance, personalized advice, and more.
              </motion.p>

              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link to="/features" className="btn btn-primary">
                  Explore Features
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section> 
  )
};

export default Home;
