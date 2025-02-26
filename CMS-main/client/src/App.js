import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from "./Components/About";
import "./CSS/centered.css";
import "./CSS/global.css";
import Card from "./Components/Card";
import LoginPage from './Loginsignup/LoginPage';
import Card_Admin from './Components/Card_Admin';
import ActualLoginPage from './Loginsignup/ActualLogin';

const App = () => {
  return (
<div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path="/signup" element={<LoginPage />} />
          <Route path="/" element={<About/>}/>
          <Route path="/Query" element={<Card />} />  
          <Route path="/admin" element={<Card_Admin />} />
          <Route path="/login" element={<ActualLoginPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};
export default App;


