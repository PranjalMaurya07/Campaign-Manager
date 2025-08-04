import React, { useState } from 'react';
import API from '../api';
import "../styles/signup.css";

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', { email, password });
      alert('Signup successful! Please login.');
      onSignup();
    } catch (err) {
      console.error(err);
      alert('Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Signup</h2>
        <form onSubmit={handleSignup} className="signup-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-input"
          />
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-input"
          />
          <button type="submit" className="signup-button">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
