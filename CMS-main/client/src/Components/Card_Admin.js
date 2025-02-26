import React, { useState } from 'react';
import './ScaleNoTilt.demozap.css';

const Card = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [tableName, setTableName] = useState('');
  const [values, setValues] = useState('');

  const cardStyles = {
    width: '600px',
    height:'430px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    border: '2px solid black', 
    backgroundColor: '#ffffff',
    color:'black'
  };

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    zIndex: 1,
    position: 'relative',
  };

  const inputStyles = {
    margin: '10px',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    color: 'blue',
    fontSize: '14px',
    width: '100%',
  };

  const videoStyles = {
    position: 'absolute', 
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1,
    filter: 'blur(5px)'
  };

const handleSubmit = () => {
    // Fetch details here
    console.log('Details submitted:', tableName, values);
    // Convert comma-separated string to an array
    const valuesArray = values.split(',').map(value => value.trim());
    // Perform fetch request to send the details to the server
    fetchDetails(tableName, valuesArray);
  };
  
  const fetchDetails = (tableName, values) => {
    // Prepare data to send to the server
    const data = {
      tableName: tableName,
      values: values
    };
  
    // Make a POST request to the server
    fetch('http://localhost:8900/admin-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      console.log(data); // Log the response data
      alert(data.message)
      // Perform any actions based on the response
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle any errors that occur during the request
    });
  };
  

  return (
    <div style={cardStyles}>
      <video autoPlay loop muted style={videoStyles}>
        <source src={require("../CSS/bg-video.mp4")} type="video/mp4" />
      </video>
      <div className="background-stripes">
        <div className="header">
          <div>Enter details</div>
          <hr />
        </div>
        <div className="form" style={formStyles}>
          <select
             value={selectedOption}
             onChange={(e) => {
             setSelectedOption(e.target.value);
             setTableName(e.target.value); // Update tableName state with the selected option
             }}
             style={inputStyles}
           >
            <option value="">Which table do you want to enter into</option>
            <option value="KeyInfo">KeyInfo</option>
            <option value="Origin">Origin</option>
            <option value="Destination">Destination</option>
            <option value="Customs">Customs</option>
            <option value="TransitStorage">TransitStorage</option>
            <option value="LMD">LMD</option>
            <option value="Insurance">Insurance</option>
            <option value="Ship">Ship</option>
          </select>
          <input
             type="text"
             placeholder="ContainerID, ProductCategory, Industry, HandlingCompany, Shipper,Location"
             value={values}
             onChange={(e) => setValues(e.target.value)} // Update values state
            style={inputStyles}
         />
          <div style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
            <button type="button" style={{ fontSize: '20px' }} onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
