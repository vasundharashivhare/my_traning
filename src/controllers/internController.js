const internModel = require("../models/internModel")
const validator = require("../validation/validation")
const mongoose = require('mongoose')
const collegeModel = require("../models/collegeModel")


const createIntern = async function (req, res) {
    try {
        const body = req.body
        if (Object.keys(body).length == 0) return res.status(404).send({ status: false, msg: "Please enter details of interns" })

        let { name, email, mobile, collegeName } = body

        //edge cases
//    ===========================================================================intern=====================================
        if (!validator.isValid) return res.status(400).send({ status: false, msg: "It is mandatory to enter intern details" })
        if (!validator.isValidName(name)) return res.status(400).send({ status: false, msg: "please enters in alphabet format." })
        //    ===========================================================================intern mobile=====================================
        if (!validator.isValid) return res.status(400), send({ status: false, msg: "It is mandatory to enter mobile number." })
        if (!validator.isValidMobile(mobile)) return res.status(400).send({ status: false, msg: "Please enter valid mobile number." })
        let doc= await internModel.findOne({ mobile: mobile,isDeleted:false })
        if (doc) return res.status(400).send({ status: false, msg: "mobile is already registered." })
        //    ===========================================================================intern email=====================================
        if (!validator.isValid) return res.status(400).send({ status: false, msg: "It is mandatory to enter emailId." })
        if (!validator.isValidEmail(email)) return res.status(400).send({ status: false, msg: "Please enter valid emailId." })
        doc = await internModel.findOne({ email: email,isDeleted:false })
        if (doc) return res.status(400).send({ status: false, msg: "emailId is already registered." })
//    ===========================================================================intern college id=====================================
        if (!validator.isValid) return res.status(400).send({ status: false, msg: "collegeName must be required." })
        let college = await collegeModel.findById({ _id:collegeId})
        if (!college) return res.status(400).send({ status: false, msg: "college not found..Please try with another college Name." })
       
        
        let result = await internModel.create(body)
        return res.status(201).send({ status: true, data: result })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createIntern = createIntern
