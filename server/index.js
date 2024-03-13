const express = require("express");
const app = express();
const env = require("dotenv"); // store constant variables in environment file
const cors = require("cors"); //prevents cors policy error
const db = require("./db"); // calling the db file
const router = require("./routes/mapRoute");
const auth = require("./routes/auth");
//import session from "express-session";

// connecting to the db
//calling the env file
env.config();
db;

const port = process.env.PORT;
app.use(express.json());
app.use(cors());

//calling the route
app.use("/api", router);
app.use("/api", auth);

//listening to port 2000
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
