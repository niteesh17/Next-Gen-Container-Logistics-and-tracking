import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={centeredContent}>
        <h3 style={thankyou}>Thank you for visiting</h3>
        <p style={smallText}>&copy; 2025 Niteesh</p>
      </div>
    </footer>
  );
};
const thankyou={
  color: '#fff'
};

const footerStyle = {
  backgroundColor: '#222',
  position: 'relative', // Fixed position
  bottom: 0, // At the bottom of the viewport
  width: '100%', // Full width
};

const centeredContent = {
  textAlign: 'center',
  padding: '10px 0',
};

const smallText = {
  fontSize: '12px',
  color: '#fff',
};

export default Footer;