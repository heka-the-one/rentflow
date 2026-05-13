const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const tenantController = require("../controllers/tenantController");

router.get("/", auth, tenantController.getTenants);
router.post("/", auth, tenantController.addTenant);
router.put("/:id", auth, tenantController.updateTenant);
router.delete("/:id", auth, tenantController.deleteTenant);

module.exports = router;