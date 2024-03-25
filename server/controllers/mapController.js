const db = require("../db");

module.exports.addName = (req, res) => {
  const { name, idno } = req.body;
  const checkName = "SELECT * FROM stores WHERE name=?";
  db.query(checkName, name, (err, response) => {
    if (response.length > 0) {
      res.status(422).json({ msg: "Place already exists" });
    } else {
      const insertQuery = "INSERT INTO stores(name, idno) VALUES(?, ?)";
      db.query(insertQuery, [name, idno], (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).json({ msg: "Something went wrong!" });
        } else {
          res.status(200).json({ msg: "Place added successfully" });
        }
      });
    }
  });
};
module.exports.mapInfo = (req, res) => {
  const name = req.body.name;

  const sql = "select * from stores where name=?";

  db.query(sql, name, (err, result) => {
    console.log("result", result);

    if (result) {
      console.log(result);
      res.status(200).json({ result });
    } else {
      res.status(400).json({ msg: "Something went wrong!" });
    }
  });
};

module.exports.addMap = (req, res) => {
  const mapId = req.body.mapId;
  const coordinates = req.body.coordinates;

  const sqlQuery = "INSERT INTO farmParcels ( mapId, coordinates) VALUES (?,?)";

  db.query(sqlQuery, [mapId, coordinates], (err, result) => {
    if (result) {
      res.status(200).json({ msg: "Polygon added successfully" });
    }
    if (err) {
      console.log(err);
      res.status(400).json({ msg: "Something went wrong" });
    }
  });
};

module.exports.getAllMaps = (req, res) => {
  const selectQuery = "SELECT * from stores";
  db.query(selectQuery, (err, result) => {
    if (result) {
      res.status(200).json(result);
      console.log("All Maps", result);
    }
    if (err) {
      res.status(400).json({ msg: "Something went wrong" });
    }
  });
};

module.exports.getGeoMapInfo = (req, res) => {
  const mapId = req.body.mapId;
  console.log(mapId);
  const sqlQuery = "SELECT mapId, coordinates from farmParcels where mapId=?";
  db.query(sqlQuery, mapId, (err, result) => {
    if (result) {
      //console.log("getGeoMap", result);
      res.status(200).json({ result });
    }
    if (err) {
      res.status(400).json({ msg: "Something went wrong" });
    }
  });
};

module.exports.updateGeoMap = (req, res) => {
  const mapId = req.body.mapId;
  const coordinates = req.body.coordinates;
  const updateSql = "UPDATE farmParcels SET coordinates = ? where mapId=?";
  db.query(updateSql, [coordinates, mapId], (err, result) => {
    if (result) {
      console.log(result);
      res.status(200).json({ msg: "Updated" });
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  });
};

module.exports.deleteMap = (req, res) => {
  const id = req.params.id;
  const deleteSql = "DELETE FROM farmParcels where mapId=?";
  db.query(deleteSql, id, (err, result) => {
    if (result) {
      res.send("Deleted Map successfully");
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  });
};

module.exports.deleteMapName = (req, res) => {
  const id = req.params.id;
  const deleteSql = "DELETE FROM stores where id=?";
  db.query(deleteSql, id, (err, result) => {
    if (result) {
      res.send("Deleted Map successfully");
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  });
};

module.exports.getAllCoordinateMaps = (req, res) => {
  const selectsql = "SELECT * FROM farmParcels";
  db.query(selectsql, (err, result) => {
    if (result) {
      res.status(200).json(result);
    }
    if (err) {
      res.status(400).json({ msg: "Something went wrong" });
    }
  });
};

module.exports.viewAllMaps = (req, res) => {
  const id = req.params.id;
  const selectSql = "SELECT coordinates from farmParcels";

  db.query(selectSql, (err, result) => {
    if (result) {
      console.log(result);
      res.status(200).json(result);
    }
    if (err) {
      res.status(400).json({ msg: "Something went wrong" });
    }
  });
};

module.exports.displayAllFarmersMaps = (req, res) => {
  const mapId = req.params.mapId; // Assuming you're passing mapId as a parameter
  console.log(mapId);
  // Assuming your SQL query to select coordinates based on the mapId
  const selectSql = "SELECT coordinates FROM farmParcels WHERE mapId = ?";

  db.query(selectSql, [mapId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ msg: "Error retrieving coordinates" });
    }

    if (result && result.length > 0) {
      console.log(result);
      return res.status(200).json(result);
    } else {
      return res
        .status(404)
        .json({ msg: "Coordinates not found for the given map ID" });
    }
  });
};

module.exports.addSoilData = (req, res) => {
  // Extract data from request body
  const {
    farmParcelId,
    temperature,
    humidity,
    moisture,
    soilType,
    pH,
    nitrogenLevel,
    potassiumLevel,
    phosphorusLevel,
  } = req.body;

  // SQL query to insert soil data
  const insertSql = `INSERT INTO soilData (farmParcelId, temperature, humidity, moisture, soilType, ph, nitrogenLevel, potassiumLevel, phosphorusLevel) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // Execute the SQL query
  db.query(
    insertSql,
    [
      farmParcelId,
      temperature,
      humidity,
      moisture,
      soilType,
      pH,
      nitrogenLevel,
      potassiumLevel,
      phosphorusLevel,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting soil data:", err);
        return res.status(400).json({ msg: "Failed to add soil data" });
      }
      // If insertion is successful, send success response
      res.status(200).json({ msg: "Soil data added successfully" });
    }
  );
};

module.exports.getSoilData = (req, res) => {
  // Extract the parcelID from the request query parameters
  const farmerIdNo = req.query.farmParcelId;

  // SQL query to fetch soil data based on parcelID
  const selectSql = `SELECT * FROM soilData WHERE parcelID = ?`;

  // Execute the SQL query
  db.query(selectSql, [farmParcelId], (err, result) => {
    if (err) {
      console.error("Error fetching soil data:", err);
      return res.status(500).json({ msg: "Failed to fetch soil data" });
    }

    // If soil data is found, send it in the response
    if (result.length > 0) {
      res.status(200).json({ soilData: result });
    } else {
      // If no soil data is found for the given parcelID, send a not found response
      res
        .status(404)
        .json({ msg: "Soil data not found for the provided parcelID" });
    }
  });
};

// mapController.js

// Import any necessary modules and database connection

// Function to check if data exists for the provided parcelID
module.exports.checkParcel = (req, res) => {
  const farmParcelId = req.params.farmParcelId; // Get parcelID from URL parameter

  // Query your database to check if data exists for the provided parcelID
  // Example SQL query:
  const checkSql =
    "SELECT COUNT(*) AS count FROM soilData WHERE farmParcelId = ?";
  db.query(checkSql, [farmParcelId], (err, result) => {
    if (err) {
      console.error("Error checking parcel:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    const exists = result[0].count > 0; // Check if count is greater than 0
    res.status(200).json({ exists: exists }); // Send response indicating if data exists
  });
};

module.exports.getAllFarmersMaps = (req, res) => {
  const idNo = req.query.idNo;
  const selectQuery = "SELECT * from stores WHERE idNo = ?";
  db.query(selectQuery, [idNo], (err, result) => {
    if (result) {
      res.status(200).json(result);
      console.log("All Farmers Maps", result);
    }
    if (err) {
      console.log(err);
      res.status(400).json({ msg: "Something went wrong" });
    }
  });
};
