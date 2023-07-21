const express = require("express");
const { getRandom, getCategory } = require("../controllers/get");

const router = express.Router();

router.get("/random", getRandom);

router.get("/cat", getCategory);

module.exports = router;
