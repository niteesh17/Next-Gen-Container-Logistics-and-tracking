import React from 'react';
import "../CSS/centered.css";

const global = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh', // Set the minimum height to cover the viewport
  position: 'relative', // Ensure the video remains in the background
};

const background = {
  position: 'absolute', // Position the video element absolutely
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Ensure the video covers the entire container
  zIndex: -1, // Set z-index to ensure video is behind the content
  filter: 'blur(2px)' // Apply a blur effect to the video background
};

const About = () => {
  return (
    <div className='global' style={global}>
      <div className='background'>
        <video autoPlay loop muted className='background' style={background}>
          <source src={require("../CSS/bg-video.mp4")} type="video/mp4" />
        </video>
      </div>
      <div className='content'>
        <h1><strong>About</strong></h1>
        <p>
        <strong>The Container Management System for Ports is aimed at modernizing and optimizing cargo
        logistics facilitated via ports. With a focus on leveraging technology and management, the
        system aims to address blind spots of information and data present in the current container
        management processes. By introducing tracking, documentation, and unique identity of
        containers, the project seeks to reimagine how cargo containers are handled, enhancing
        operational efficiency and contributing to a more sustainable and transparent cargo
        management ecosystem.</strong>
        </p>
      </div>
    </div>
  );
};

export default About;
