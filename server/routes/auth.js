const express = require("express");
const router = express.Router();
const sequelize = require("../sequelize");

var http = require("http");
const Farmer = require("../models/user");
const Distributor = require("../models/distributor");
const Officer = require("../models/officer");
const SoilData = require("../models/soildata");
const Store = require("../models/store");
const Store2 = require("../models/store2");
const FarmParcel = require("../models/farmParcel");

const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const blacklistedTokens = new Set();
function blacklistToken(token) {
  blacklistedTokens.add(token);
}

Farmer.hasOne(Store, {
  foreignKey: "idno",
  as: "store",
});
Store.belongsTo(Farmer, { foreignKey: "idno", as: "farmer" });
Store.hasOne(FarmParcel, {
  foreignKey: "mapId",
  as: "farmparcels",
});
FarmParcel.belongsTo(Store, { foreignKey: "mapId" });
FarmParcel.hasOne(SoilData, {
  foreignKey: "farmParcelId",
  as: "soildata",
});
SoilData.belongsTo(FarmParcel, {
  foreignKey: "farmParcelId",
  as: "parcelData",
});

async function createFarmer(username, idno, password, res) {
  try {
    const user = await Farmer.create({
      username: username,
      idno: idno,
      password: password,
    });
    console.log("User created:", user.toJSON());
    return res.json({ data: user.username });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

async function createOfficer(username, idno, password, res) {
  try {
    const user = await Officer.create({
      username: username,
      idno: idno,
      password: password,
    });
    console.log("User created:", user.toJSON());
    return res.json({ data: user.username });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

async function createDistributor(username, idno, password, res) {
  try {
    const user = await Distributor.create({
      username: username,
      idno: idno,
      password: password,
    });
    console.log("User created:", user.toJSON());
    return res.json({ data: user.username });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

async function findUser(idno, password, res, req) {
  // try {
  const farmer = await Farmer.findOne({
    where: { idno: idno }, // Query condition
  });
  const officer = await Officer.findOne({
    where: { idno: idno }, // Query condition
  });
  const distributor = await Distributor.findOne({
    where: { idno: idno }, // Query condition
  });
  if (farmer) {
    console.log("User found:", farmer.toJSON());
    bcrypt.compare(password, farmer.password, async (err, data) => {
      //if error than throw error
      if (err) return res.status(401).json({ msg: "Missing fields" });

      //if both match than you can do anything
      if (data) {
        try {
          let jwtSecretKey = process.env.JWT_SECRET_KEY;
          const token = await jwt.sign({ userId: farmer.id }, jwtSecretKey);

          // console.log(req.session.token)
          return res.send({
            red: "/dashboard",
            type: "farmer",
            token: token,
            data: farmer.username,
            idno: farmer.idno,

            // Add more properties as needed
          });
        } catch (error) {
          return res.status(500).json({ msg: "Internal server error" });
        }
      } else {
        return res.status(401).json({ msg: "Wrong password entered" });
      }
    });
  } else if (officer) {
    console.log("User found:", officer.toJSON());
    bcrypt.compare(password, officer.password, async (err, data) => {
      //if error than throw error
      if (err) return res.status(401).json({ msg: "Missing fields" });

      //if both match than you can do anything
      if (data) {
        try {
          let jwtSecretKey = process.env.JWT_SECRET_KEY;
          const token = await jwt.sign({ userId: officer.id }, jwtSecretKey);
          //req.session.token = token;
          //console.log(req.session.token);
          return res.send({
            red: "/dashboard",
            type: "officer",
            token: token,
            data: officer.username,
          });
        } catch (error) {
          console.error("Error:", error); // Log the error to the console for debugging purposes
          return res
            .status(500)
            .json({ msg: "Internal server error", error: error.message });
        }
      } else {
        return res.status(401).json({ msg: "Wrong password entered" });
      }
    });
  } else if (distributor) {
    console.log("User found:", distributor.toJSON());
    bcrypt.compare(password, distributor.password, async (err, data) => {
      //if error than throw error
      if (err) return res.status(401).json({ msg: "Missing fields" });

      //if both match than you can do anything
      if (data) {
        try {
          let jwtSecretKey = process.env.JWT_SECRET_KEY;
          const token = await jwt.sign(
            { userId: distributor.id },
            jwtSecretKey
          );
          //req.session.token = token;
          // console.log(req.session.token)
          return res.send({
            red: "/dashboard",
            type: "distributor",
            token: token,
            data: distributor.username,
          });
        } catch (error) {
          return res.status(500).json({ msg: "Internal server error" });
        }
      } else {
        return res.status(401).json({ msg: "Wrong password entered" });
      }
    });
  } else {
    return res
      .status(401)
      .json({ msg: "Account with that ID Number was not found" });
  }
  // } catch (error) {
  //   console.log("hello")

  //     return res.status(401).json({ msg: "An error occured. Check fields" })
  // }
}

// Route for the home page (protected with middleware)
router.get("/is_authenticated", (req, res) => {
  // Render the home page content
  if (req.session | req.session.token) {
    console.log(req);
    res.json({ authenticated: true });
  } else {
    res.json({ authenticated: false });
  }
});

router.post("/user/farmer/generateToken", async (req, res) => {
  // Validate User Here
  // Then generate JWT Token

  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const { username, idno, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    data = {
      username: username,
      idno: idno,
      password: hashedPassword,
    };
    const token = jwt.sign(data, jwtSecretKey, { expiresIn: "1h" });
    console.log(token);
    await createFarmer(username, idno, hashedPassword);

    res.json({
      token: token,
      red: "/dashboard",
      type: "farmer",
      data: username,
      idno: idno,
    });
  } catch (error) {
    res.status(401).send(error);
  }
});
router.post("/user/officer/generateToken", async (req, res) => {
  // Validate User Here
  // Then generate JWT Token

  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const { username, idno, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    data = {
      username: username,
      idno: idno,
      password: hashedPassword,
    };
    const token = jwt.sign(data, jwtSecretKey, { expiresIn: "1h" });
    console.log(token);
    await createOfficer(username, idno, hashedPassword);

    res.json({
      token: token,
      red: "/dashboard",
      type: "officer",
      data: username,
    });
  } catch (error) {
    res.status(401).send(error);
  }
});

router.post("/user/distributor/generateToken", async (req, res) => {
  // Validate User Here
  // Then generate JWT Token

  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const { username, idno, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    data = {
      username: username,
      idno: idno,
      password: hashedPassword,
    };
    const token = jwt.sign(data, jwtSecretKey, { expiresIn: "1h" });
    console.log(token);
    await createDistributor(username, idno, hashedPassword);

    res.json({
      token: token,
      red: "/dashboard",
      type: "distributor",
      data: username,
    });
  } catch (error) {
    res.status(401).send(error);
  }
});

// Verification of JWT
router.get("/user/validateToken", (req, res) => {
  // Tokens are generally passed in header of request
  // Due to security reasons.
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    // const token = req.header(tokenHeaderKey);
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      return res.status(401).send("Authorization header missing");
    }

    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ authenticated: false, token: token });
      }
      let token1 = "";

      // Check if the token is about to expire (within 5 minutes)
      const currentTime = Date.now() / 1000;
      const tokenExpTime = decoded.exp;
      const timeToExpire = tokenExpTime - currentTime;
      const refreshTokenThreshold = 5 * 60; // 5 minutes

      if (timeToExpire <= refreshTokenThreshold) {
        // If the token is about to expire, generate a new token and send it to the client
        const newToken = generateToken({ userId: decoded.userId });
        res.setHeader("Authorization", newToken);
        token1 = newToken;
      }

      return res.json({ authenticated: true, token: token1 });
    });
  } catch (error) {
    // Access Denied
    return res.status(401).json({ authenticated: false });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { idno, password } = req.body;
    return findUser(idno, password, res, req);
  } catch (error) {
    return res.status(401).send("missing credentials");
  }
});

router.get("/user/logout", (req, res) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    return res.status(401).send("Authorization header missing");
  }
  const token = authorizationHeader.split(" ")[1];
  blacklistToken(token);
  return res.json({ msg: "Logout successfully" });
});

// Define a GET endpoint to query stores associated with a specific farmer
router.get("/stores/:farmerIdNo", async (req, res) => {
  try {
    const farmerIdNo = req.params.farmerIdNo;

    const store = await Store.findAll({
      where: { idno: farmerIdNo },
    });

    if (store.length === 0) {
      // No store found for the given farmerIdNo
      console.log("No store found for farmer ID:", farmerIdNo);
      return res
        .status(404)
        .json({ message: "No store found for the given farmer ID" });
    }

    // Log the farmer and associated store
    console.log("Farmer and Store:", store);

    // Send the store data as a response
    return res.status(200).json(store);
  } catch (error) {
    console.error("Error fetching farmer and store:", error);
    return res.status(500).send("Internal server error");
  }
});

router.get("/soildata/:farmParcelId", async (req, res) => {
  try {
    const farmParcelId = req.params.farmParcelId;

    const soilData = await SoilData.findOne({
      // include: [
      //   {
      //     model: FarmParcel,
      //     as: "parcelData",
      //   },
      // ],
      where: { farmParcelId: farmParcelId },
    });

    // Log the farmer and associated store
    console.log("Farmer and Store:", soilData);

    // Send the farmer data as a response
    return res.status(200).json(soilData);
  } catch (error) {
    console.error("Error fetching soil data:", error);
    return res.status(500).send("Internal server error");
  }
});

router.get("/officer/allFarmers", async (req, res) => {
  try {
    const farmers = await Farmer.findAll({});

    // Log the farmer and associated store
    console.log("Farmer and Store:", farmers);

    // Send the farmer data as a response
    return res.status(200).json(farmers);
  } catch (error) {
    console.error("Error fetching farmer and store:", error);
    return res.status(500).send("Internal server error");
  }
});

router.get("/parcel/:mapId", async (req, res) => {
  try {
    const mapId = req.params.mapId;

    const farmparcel = await FarmParcel.findOne({
      where: { mapId: mapId },
    });

    // Log the farmer and associated store
    console.log("Farm Parcel:", farmparcel);

    // Send the farmer data as a response
    return res.status(200).json(farmparcel);
  } catch (error) {
    console.error("Error farmparcel:", error);
    return res.status(500).send("Internal server error");
  }
});
router.get("/getAllFarmersMaps/:idNo", async (req, res) => {
  try {
    const idNo = req.params.idNo;

    const farmersMap = await Store.findAll({
      where: { idNo: idNo },
    });

    // Log the farmer and associated store
    console.log("Farm Parcel:", farmersMap);

    // Send the farmer data as a response
    return res.status(200).json(farmersMap);
  } catch (error) {
    console.error("Error farmparcel:", error);
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;
