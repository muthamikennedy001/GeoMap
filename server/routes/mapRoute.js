const express = require("express");
const router = express.Router();
const {
  addName,
  getAllCoordinateMaps,
  mapInfo,
  addMap,
  getAllMaps,
  getGeoMapInfo,
  updateGeoMap,
  deleteMap,
  deleteMapName,
  viewAllMaps,
  addSoilData,
  checkParcel,
  displayAllFarmersMaps,
  //getAllFarmersMaps,
} = require("../controllers/mapController");

router.post("/addName", addName);
router.post("/getMapInfo", mapInfo);
router.post("/addMap", addMap);
router.get("/getAllMaps", getAllMaps);
router.post("/allGeoMapInfo", getGeoMapInfo);
router.post("/updateGeoMap", updateGeoMap);
router.delete("/deleteMap/:id", deleteMap);
router.get("/getAllCoordinateMaps", getAllCoordinateMaps);
router.delete("/deleteMapName/:id", deleteMapName);
router.get("/viewAllMaps", viewAllMaps);
router.post("/addSoilData", addSoilData);
router.get("/checkParcel/:id", checkParcel);
router.get("/displayAllFarmersMaps/:mapId", displayAllFarmersMaps);
//router.get("/getAllFarmersMaps/:idNo", getAllFarmersMaps);

module.exports = router;
