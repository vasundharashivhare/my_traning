
const collegeModel = require("../models/collegeModels")

const Createcollege = async function (req, res) {
    try {
        let data=req.body
        let savedData = await collegeModel.create(data)
        res.status(201).send({ status: true, message: "college is created successfully.", data: savedData })
    }
    catch (error) {
      res.status(500).send({ msg: error.message });
    }
  };
  module.exports.Createcollege=Createcollege;
