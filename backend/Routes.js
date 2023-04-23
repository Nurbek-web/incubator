const express = require("express");
const router = express.Router();
const fs = require("fs");

const usersRoutes = require("./users");
const filesRoutes = require("./files");

router.use(usersRoutes);
router.use(filesRoutes);

module.exports = router;
