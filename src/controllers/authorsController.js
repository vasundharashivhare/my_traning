const { request } = require("express")

const authorModel = require("../model/authorsModel")
const { isValidMail, isValid, isValidName, isValidRequestBody } = require("../validator/validator")


const createAuthor = async function (req, res) {
    try {
      let data = req.body
      // validation for empty for body.
      if (!isValidRequestBody(data)) return res.status(400).send({ status: false, message: "Plz enter some data." })
    // validation for empty string.
      if (!isValid(data.fname)) return res.status(400).send({ status: false,msg: "fname is  requred" })
    // validation for valid string.
      if (!isValidName.test(data.fname)) return res.status(400).send({ status: false, msg: "Enter a valid first name" })
    // validation for lname
  
    if (!isValid(data.lname)) return res.status(400).send({ status: false,msg: "lname is requred" })
    // validation for valid string.
      if (!isValidName.test(data.lname)) return res.status(400).send({ status: false, msg: "Enter a valid first name" })
  
  
    // validation for id
      if (!isValid(data.email)) return res.status(400).send({ status: false, msg: "mail id is required" })
    // validation for unic id.
      let uniqueEmail = await authorModel.findOne({ email: data.email })
      if (uniqueEmail) {
        return res.status(400).send({ status: false, msg: "Email Already Exists." })
      }
       // validation for valid email id
      if (!isValidMail.test(data.email)) return res.status(400).send({status: false, msg: "email id is not valid" })
         // validation for title
      if (!isValid(data.title)) return res.send({ status: false, msg: "Title is req" })
      if (!(["Mr", "Mrs", "Miss"].includes(data.title))) return res.status(400).send({ status: false, msg: "Enter a valid title " })
      
    // validation for password
      if (!isValid(data.password)) return res.status(400).send({ status: false, msg: "password is required" })
      let savedData = await authorModel.create(data)
      res.status(201).send({ status: true, message: "Author profile is created successfully.", data: savedData })
  
    }
    catch (error) {
      res.status(500).send({ msg: error.message });
    }
  };
  


module.exports.createAuthor = createAuthor