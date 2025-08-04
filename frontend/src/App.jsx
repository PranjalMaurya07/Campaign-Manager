import React, { useState } from 'react';
import Login from './components/login';
import Signup from './components/signup';
import CampaignList from './components/campaign';
import './App.css'; 

const App = () => {
  const [authStep, setAuthStep] = useState(
    !!localStorage.getItem('token') ? 'dashboard' : 'login'
  );

  const handleLogin = () => setAuthStep('dashboard');
  const handleSignupRedirect = () => setAuthStep('login');

  return (
    <div className="app-container">
      {authStep === 'dashboard' && <CampaignList />}
      {(authStep === 'login' || authStep === 'signup') && (
        <div className="auth-box">
          {authStep === 'login' && (
            <>
              <Login onLogin={handleLogin} />
              <p>
                Don't have an account?{' '}
                <button onClick={() => setAuthStep('signup')}>Signup</button>
              </p>
            </>
          )}
          {authStep === 'signup' && (
            <>
              <Signup onSignup={handleSignupRedirect} />
              <p>
                Already have an account?{' '}
                <button onClick={() => setAuthStep('login')}>Login</button>
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
