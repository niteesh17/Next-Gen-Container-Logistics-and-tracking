import React, { useState } from 'react';
import './ScaleNoTilt.demozap.css';
import ResultTable from './ResultTable';

const Card = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [containerId, setContainerId] = useState('');
  const [responseData, setResponseData] = useState('');

  const cardStyles = {
    width: '600px',
    height:'550px',
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
    zIndex: -1, // Set z-index to -1 to position the video behind the card
    filter: 'blur(5px)'
  };

  const handleSubmit = () => {
    console.log('Details submitted:', selectedOption, containerId);
    fetchDetails(selectedOption, containerId);
  };

  const fetchDetails = (tableName, values) => {
    const data = {
      tableName: tableName,
      values: values,  
    };

    fetch('http://localhost:8900/Query-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      
    })
      .then(response => response.json())
      .then(data => {
        console.log("Data is in card", data.data[0]);
        // const country = data.data[0].CountryOfRegistration;
        // const ProductCategory = data.data[0].ProductCategory;
        // if(country==='Nassau' || country==='Liberia' || country==='Bahamas'){
        //   alert(`Registered Country does not press Environmental friendly policies `);
        // }
        // if (ProductCategory==='Chemicals'){
        //    alert(`Product is flammable`);
        // }
        // if (ProductCategory==='Food'){
        //   alert(`Product is Perishable`);
        // }
        // if (ProductCategory==='\'Electronics\'' || ProductCategory==='Electronics'){
        //  alert(`Prioritize the product`);
        // }
        // if (ProductCategory==='Apparel'){
        //  alert(`Product is flammable`);
        // }
        setResponseData(data.data);
      })
      .catch(error => {
        console.log('Error:', error);
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
            onChange={(e) => setSelectedOption(e.target.value)}
            style={inputStyles}
          >
            <option value="">Which table do you want to search from</option>
            <option value="KeyInfo">KeyInfo</option>
            <option value="Origin">Origin</option>
            <option value="Destination">Destination</option>
            <option value="customs">Customs</option>
            <option value="TransitStorage">TransitStorage</option>
            <option value="LMD">LMD</option>
            <option value="Insurance">Insurance</option>
            <option value="Ship">Ship</option>
          </select>
          <input
            type="text"
            placeholder="Enter container ID"
            value={containerId}
            onChange={(e) => setContainerId(e.target.value)}
            style={inputStyles}
          />
          <div style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
            <button type="button" style={{ fontSize: '20px' }} onClick={handleSubmit}>Submit</button>
            {responseData.length > 0 && <ResultTable data={responseData} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
