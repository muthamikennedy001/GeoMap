const db = require("../db");

module.exports.addName = (req, res) => {
  const name = req.body.name;
  const checkName = "select * from store where name=?";
  db.query(checkName, name, (err, response) => {
    if (response.length > 0) {
      res.status(422).json({ msg: "Place already exists" });
    } else {
      db.query("INSERT INTO store(name) VALUES(?)", name, (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result) {
          res.status(200).json({ msg: "Place added successfuly" });
        } else {
          res.status(400).json({ msg: "Something went wrong!" });
        }
      });
    }
  });
};
module.exports.mapInfo = (req, res) => {
  const name = req.body.name;

  const sql = "select * from store where name=?";

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
  const parentId = req.body.parentId;
  const coordinates = req.body.coordinates;

  const sqlQuery =
    "INSERT INTO store2 (id,parentId,coordinates) VALUES (id,?,?)";

  db.query(sqlQuery, [parentId, coordinates], (err, result) => {
    if (result) {
      res.status(200).json({ msg: "Polygon added successfully" });
    }
    if (err) {
      res.status(400).json({ msg: "Something went wrong" });
    }
  });
};

module.exports.getAllMaps = (req, res) => {
  const selectQuery = "SELECT * from store";
  db.query(selectQuery, (err, result) => {
    if (result) {
      res.status(200).json(result);
    }
    if (err) {
      res.status(400).json({ msg: "Something went wrong" });
    }
  });
};

module.exports.getGeoMapInfo = (req, res) => {
  const parentId = req.body.parentId;
  const sqlQuery = "SELECT parentId,coordinates from store2 where parentId=?";
  db.query(sqlQuery, parentId, (err, result) => {
    if (result) {
      //console.log(result)
      res.status(200).json({ result });
    }
    if (err) {
      res.status(400).json({ msg: "Something went wrong" });
    }
  });
};

module.exports.updateGeoMap = (req, res) => {
  const parentId = req.body.parentId;
  const coordinates = req.body.coordinates;
  const updateSql = "UPDATE store2 SET coordinates = ? where parentId=?";
  db.query(updateSql, [coordinates, parentId], (err, result) => {
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
  const deleteSql = "DELETE FROM store2 where parentId=?";
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
  const deleteSql = "DELETE FROM store where id=?";
  db.query(deleteSql, id, (err, result) => {
    if (result) {
      res.send("Deleted Map successfully");
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  });
};

module.exports.getAllCoordinateMaps = (req, res) => {
  const selectsql = "SELECT * FROM store2";
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
  const selectSql = "SELECT coordinates from store2";

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
