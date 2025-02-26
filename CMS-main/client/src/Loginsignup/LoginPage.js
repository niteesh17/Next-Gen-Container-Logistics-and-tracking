
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'; // Import CSS file for styling
import video from "../CSS/bg-video.mp4";

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:8900/admin', {
      userEmail,
      password,
      key: 0,
    });
    console.log(response.data.message);
    if (response.data.key === 1) {
      navigate('/admin', { state: { userEmail } });
    }
  };

  return (
    <div className='videoo'>
        <video autoPlay loop muted className='video-background'>
        <source src={video} type="video/mp4" />
      </video>
    <div className="card">
      <h1>Already a user? <Link to='/login'>Login instead!</Link></h1>
      <form onSubmit={handleSubmit}>
        <div className="card-content">
          <h2>SignUp</h2>
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
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default LoginPage;
