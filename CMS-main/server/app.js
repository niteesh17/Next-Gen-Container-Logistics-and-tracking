const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { handleAdminSignup, user, admin } = require('./router');  // Import everything once

const app = express();
const port = 8900;

app.use(cors());
app.use(bodyParser.json());

// GET request to test the API
app.get('/api/track/:containerId', (req, res) => res.json({ message: "Express backend is setup and running successfully" }));

// Define API routes
app.post('/admin', handleAdminSignup);
app.post('/Query-data', user);
app.post('/admin-data', admin);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
