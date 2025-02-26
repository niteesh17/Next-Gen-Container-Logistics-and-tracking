import React, { useState } from 'react';
import axios from 'axios';

const DataForm = ({ fetchData }) => {
  const [formData, setFormData] = useState({
    // Initialize form fields here
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Make POST request to add data to the database
      await axios.post('http://localhost:8900/api/track}', formData);
      // Fetch updated data after adding new item
      fetchData();
      // Reset form fields
      setFormData({ /* Reset form fields */ });
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Add New Data</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DataForm;
