// const express = require('express');
// const router = express.Router();
const collegeModel = require("../models/collegeModels")
// const internController=require("../controllers/internController")

// const { request } = require("express")
// const collegeModel = require("../model/collegeModel")
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
