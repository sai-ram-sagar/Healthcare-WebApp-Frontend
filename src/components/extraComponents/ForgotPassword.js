import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleForgotPassword = (e) => {
      e.preventDefault();
      // Simulate password reset logic
      if (email) {
        setMessage("Password reset email sent successfully.");
        setError("");
      } else {
        setError("Please enter a valid email.");
        setMessage("");
      }
    };

    return (
      <motion.section
        className="container forgotPasswordContainer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card forgotPasswordCard">
              <h1 className="mb-3">Forgot Password</h1>
              <form onSubmit={handleForgotPassword}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary">
                    Send Reset Email
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.section>
    );
  };
  export default ForgotPassword;