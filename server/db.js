const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password123#@!",
  database: "fertilizers",
  port: 3306,
});

connection.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("DataBase Connected Succefully");
  }
});

//exporting the connection
module.exports = connection;
