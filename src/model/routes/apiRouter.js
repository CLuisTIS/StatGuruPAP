const express = require("express");
const router = express.Router();
const userAuthentication = require("../userAuthentication");


router.use("/open", require("./apiRoutes/open"));

router.use("/admin",userAuthentication.checkAuthAdmin, require("./apiRoutes/admin"));

module.exports = router;