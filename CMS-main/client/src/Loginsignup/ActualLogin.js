import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./ActualLogin.css";
import "./singup.css";
import video from "../CSS/bg-video.mp4";

const ActualLoginPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8900/admin', {
        userEmail,
        password,
        key: 1,
      });
      console.log(response.data.message);
      if (response.data.key === 1) {
        navigate('/admin', { state: { userEmail } });
      } else if (response.data.key === 0) {
        setNotification('Wrong credentials, try again');
        console.log('Password mismatch');
      } else {
        setNotification('Something went wrong, try again');
        console.log('Something went wrong, try again');
      }
    } catch (error) {
      console.error('Error:', error);
      setNotification('Failed to connect to server');
    }
  };

  return (
    <div className='videoo'>
        <video autoPlay loop muted className='video-background'>
        <source src={video} type="video/mp4" />
      </video>
    
    <div className="login-container">
      <div className="login-form">
        <h3>{notification}</h3>
        <form onSubmit={handleSubmit}>
          <h2 style={{ color: 'white' }}>Login</h2>
          <div className="form-group">
            <label htmlFor="userEmail">User Email:</label>
            <input
              type="text"
              id="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={{ color: 'white' }}>Login</button>
          <div className='x'>
            <h3>Don't have an account?</h3>
            <Link to="/signup">Signup</Link>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ActualLoginPage;
