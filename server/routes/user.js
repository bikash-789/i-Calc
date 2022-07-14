const express = require("express");
const router = express.Router();

const { userById } = require("../controllers/user");

router.get("/user/:userId", userById, (req, res) => {
  res.json({
    user: req.user,
  });
});
router.param("userId", userById);
module.exports = router;
