const ctrlAuth = require("../controllers/authentication");
const ctrlProfile = require("../controllers/profile");
const ctrlEvent = require("../controllers/event");
const express = require("express");
const jwt = require("express-jwt");
const router = express.Router();

const auth = jwt({
  secret: "MY_SECRET",
  userProperty: "payload"
});

router.get("/profile", auth, ctrlProfile.profileRead);
router.get("/list", ctrlEvent.list);

router.post("/event", ctrlEvent.event);
router.post("/register", ctrlAuth.register);
router.post("/login", ctrlAuth.login);

module.exports = router;
