
const internModel = require("../models/internModel")
const { isValidMail, isValid, isValidName, isValidRequestBody } = require("../validation/validation")

const Createintern = async function (req, res) {
    try {
        let data=req.body
        if (!isValidRequestBody(data)) return res.status(400).send({ status: false, message: "Plz enter some data." })
        if (!isValid(data.name)) return res.status(400).send({ status: false,msg: "name is  requred" })
        if (!isValid(data.email)) return res.status(400).send({ status: false, msg: "mail id is required" })
        // validation for unic id.
          let uniqueEmail = await internModel.findOne({ email: data.email })
          if (uniqueEmail) {
            return res.status(400).send({ status: false, msg: "Email Already Exists." })
          }
           // validation for valid email id
          if (!isValidMail.test(data.email)) return res.status(400).send({status: false, msg: "email id is not valid" })
          // validation for mobile

          
        let savedData = await internModel.create(data)
        res.status(201).send({ status: true, message: "intern is created successfully.", data: savedData })
    }
    catch (error) {
      res.status(500).send({ msg: error.message });
    }
  };
  module.exports.Createintern=Createintern;
