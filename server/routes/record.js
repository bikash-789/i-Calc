const express = require("express");
const { requireSignIn, isAuth } = require("../controllers/auth");
const router = express.Router();

const {
  create,
  recordById,
  records,
  deleteRecordById,
  update,
} = require("../controllers/record");
const { userById } = require("../controllers/user");

//post record api
router.post("/record/add/:userId", requireSignIn, isAuth, create);

//get recordById api
router.get("/record/:recordId", recordById, (req, res) => {
  res.json({
    record: req.record,
  });
});

//get records api
router.get("/records/:userId", requireSignIn, isAuth, records, (req, res) => {
  res.json({
    records: req.records,
  });
});

//delete record api
router.delete("/record/del/:recordId", deleteRecordById, (req, res) => {
  res.json({
    success: `Successfully deleted!`,
  });
});

//update record api
router.put("/record/update/:recordId", update, (req, res) => {
  res.json({
    record: req.record,
  });
});
router.param("recordId", recordById);
router.param("userId", userById);

module.exports = router;
