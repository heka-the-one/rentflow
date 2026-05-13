const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const houseController = require("../controllers/houseController");

router.get("/", auth, houseController.getHouses);
router.post("/", auth, houseController.addHouse);
router.delete("/:id", auth, houseController.deleteHouse);

module.exports = router;