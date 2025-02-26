const express = require("express");
const mysql = require("mysql2");


const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "nit@2004",
  database: "container",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

const handleAdminSignup = async (req, res) => {
  const { userEmail, password, key } = req.body;
  if(key==0) {
    try {
      connection.query(
        "insert into Admin(admin_email, admin_password) values(?,?)",
        [userEmail, password],
        (error, results) => {
          if (error)
            console.log("error while saving admin creds to table", error);
          else {
            console.log(results);
            res.json({ message: "admin creds saved", key: 1 });
          }
        }
      );
    } catch (error) {
      console.log("error while signin up");
      res.json({ message: "error while signing up, try again" });
    }
  } else if(key == 1) {
    try{
      connection.query('select admin_password as password from admin where admin_email = ?', [userEmail], (error, results) => {
        if(error) console.log('error while signing in',error);
        else {
          console.log(results);
          if(results[0].password == password) {
            console.log("password matches");
            res.json({message:"login successful", key:1})
          } else {
            console.log("password doesn't match");
            res.json({message:"login successful", key:0})
          }
        }
      })
    }catch(error) {
      console.log('error while logging in', error);
      res.json({message:"something went wrong, please try again", key:0});
    }
  }
};


const user = async (req, res) => {
  const { tableName } = req.body;
  const containerId= req.body.values;
  console.log("I am here",tableName,containerId);
  console.log(containerId)
   const query = `SELECT * FROM ${tableName} WHERE ContainerID = ?`;
  // const query = `SELECT * FROM ${tableName} WHERE CustomsCountry = ?`;
  // const query="select * from KeyInfo;"
  // Execute the query with the provided container ID
  connection.query(query, [containerId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send({ error: 'Internal Server Error' });
      return;
    }
    console.log('Retrieved data successfully:', results);
    res.status(200).send({ message: 'Data retrieved successfully', data: results });
    })
}



const admin = async (req, res) => {
  const { tableName, values } = req.body;
  console.log("Inside the router file",tableName, values);

  // If values is not an array of arrays, convert it to one
  const formattedValues = Array.isArray(values[0]) ? values : [values];
  
  let query = ''; // Declare query variable outside of if-else chain
  let message='';
  if(tableName === 'KeyInfo'){
    query = `INSERT INTO KeyInfo (ContainerID, ProductCategory, Industry, HandlingCompany, Shipper, Location) VALUES ?;`
  }
  else if (tableName === 'Origin'){
    query = `INSERT INTO Origin (ContainerID, Origin, ProductCategory, Contents, Shipper, ShippingDate, Contact1) VALUES ?;`
  }
  else if(tableName === 'Destination'){
    query = `INSERT INTO Destination (ContainerID, Destination, ProductCategory, Contents, Shipper, ReceivedDate, Contact2) VALUES ?;`
  }
  else if(tableName === 'Customs'){
    query = `INSERT INTO Customs (ContainerID, CustomsStatus, CustomsCountry, CustomDuty, DateofApproval) VALUES ?;`
  }
  else if(tableName === 'TransitStorage'){
    query = `INSERT INTO TransitStorage (ContainerID, StorageYard, StartDate, EndDate, Cost, Contact5) VALUES ?;`
  }
  else if(tableName === 'LMD'){
    query = `INSERT INTO LMD (ContainerID, VehicleID, Contact3, StartDetails, EndDetails) VALUES ?;`
  }
  else if(tableName === 'Insurance'){
    query = `INSERT INTO Insurance (ContainerID, PolicyNumber, Insurer, Contact4, EstimatedValue, InsuredValue) VALUES ?;`
  }
  else if(tableName === 'Ship'){
    query = `INSERT INTO Ship (ContainerID, ShippingCompany, ShipID, CountryOfRegistration, Contact6) VALUES ?;`
  }

  // Execute the query with the provided values
  connection.query(query, [formattedValues], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send({ error: 'Internal Server Error' });
      return;
    }
    console.log('Successfully entered data:', results);
    message = 'Data entered successfully'; // Set success message
    res.status(200).send({ message: message, data: results });
  });
};


module.exports = {
  handleAdminSignup,
  user,
  admin,
};
