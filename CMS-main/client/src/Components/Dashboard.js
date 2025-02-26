// Dashboard.js
import React, { useState } from 'react';
import Card from './Card';
import ResultTable from './ResultTable';

const Dashboard = () => {
  const [responseData, setResponseData] = useState([]);

  const fetchDetails = (tableName, values) => {
    const data = {
      tableName: tableName,
      values: values
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
        console.log("Data is", data.data[0]);
        setResponseData(data.data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  return (
    <div>
      <Card fetchDetails={fetchDetails} />
      {responseData.length > 0 && <ResultTable data={responseData} />}
    </div>
  );
};

export default Dashboard;
