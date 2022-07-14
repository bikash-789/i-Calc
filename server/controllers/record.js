const Record = require("../models/record");
const _ = require("lodash");

exports.create = (req, res) => {
  let data = req.body;
  const { principalAmount, rate, date, comment } = data;
  if (!principalAmount || !rate || !date || !comment) {
    return res.status(400).json({
      error: "All fields are required!",
    });
  }

  let record = new Record(data);
  record.addUserId(req.user._id);
  record.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      result,
    });
  });
};

exports.recordById = (req, res, next, id) => {
  Record.findById(id).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: "Record not found!",
      });
    }
    req.record = result;
    next();
  });
};

//get the records of the current logged in user
exports.records = (req, res, next) => {
  Record.find({ userId: req.user._id }, (err, result) => {
    if (err) {
      return res.status(400).json({
        error: "Records not found",
      });
    }
    req.records = result;
    next();
  });
};

//api for deleting record by recordId
exports.deleteRecordById = (req, res) => {
  Record.findByIdAndDelete({ _id: req.record._id }, (err, rec) => {
    if (err) {
      res.json({
        error: "Record couldnot be deleted!",
      });
    } else {
      res.json({
        deletedRecord: rec,
        message: "Successfully deleted!",
      });
    }
  });
};

//api for editing record by Id
exports.update = (req, res) => {
  let record = req.record;
  const { principalAmount, rate, date, comment } = req.body;
  if (!principalAmount || !rate || !date || !comment) {
    return res.status(400).json({
      error: "All fields are required!",
    });
  }
  const updatedRecord = _.merge(record, req.body);
  console.log(updatedRecord);
  record = updatedRecord;
  record.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json(result);
  });
};
