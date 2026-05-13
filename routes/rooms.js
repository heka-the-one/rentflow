const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roomController = require("../controllers/roomController");

router.get("/", auth, roomController.getRooms);
router.post("/", auth, roomController.addRoom);
router.delete("/:id", auth, roomController.deleteRoom);

module.exports = router;