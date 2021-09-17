const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
// parse application/json
app.use(bodyParser.json());
 
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123$Admin',
  database: 'reactApp'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");

  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };
  exports.userCategories = (req, res) => {
    let sql = "SELECT * FROM vehicle_category";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  };
  
  exports.userModels = (req, res) => {
    let sql = "SELECT * FROM vehicle_models";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });

  };
  exports.userSubcategories = (req, res) => {
    let sql = "SELECT * FROM vehicle_subcategory";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  
  };

  exports.modelwithcatandsubcat = (req, res) => {
    let sql = "SELECT m.modelid,m.vehicle_catid,v.vehicle_cat_name,m.vehicle_subcatid,s.vehicle_subcat_name,m.model_name FROM vehicle_category v,vehicle_models m,vehicle_subcategory s where m.vehicle_catid = v.vehicle_catid and m.vehicle_subcatid = s.vehicle_subcatid";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  
  };

  exports.newcustomer = (req, res) => {
    let data = {customercode: req.body.customercode, customername: req.body.customername ,customertype: req.body.customertype,contactno: req.body.contactno}; 
 let sql = "INSERT INTO customer SET ?";
 let query = conn.query(sql,data,(err, results) => {
  if(err) throw err;
  res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
});
  
  };
  exports.customerbyid = (req, res) => {
    let sql = "SELECT * FROM customer WHERE customerid="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  };
   
  exports.customerdelete = (req, res) => {
    let sql = "DELETE FROM customer WHERE customerid="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  };

exports.updatecustomer = (req, res) => {
  let sql = "UPDATE customer SET customername='"+req.body.customername+"',customertype='"+req.body.customertype+"',contactno='"+req.body.contactno+"' WHERE customerid="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
};





