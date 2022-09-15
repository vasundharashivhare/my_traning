const internModel = require("../models/internModel")
const validator = require("../validation/validation")
const mongoose = require('mongoose')
const collegeModel = require("../models/collegeModels")






//=================================================create interns====================================================================

const createIntern = async function (req, res) {
    try {
        let data = req.body;
        const { name, email, mobile, collegeName } = data

        if (!validator.isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Please enter details to create intern" });
        }
        if (!name) return res.status(400).send({ status: false, message: "please provide name " });

        if (!validator.isValidName(name)) {
            return res.status(400).send({ status: false, message: "Name should be in Alphabetic format" });
        }
        if (!email) {
            return res.status(400).send({ status: false, message: "Email is mandatory" });
        }
        if (!validator.isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "please enter valid email" });

        }
        const duplicateEmail = await internModel.findOne({ email });
        if 
        (duplicateEmail) return res.status(400).send({ status: false, message: " the email is already exist" });

        if (!mobile) {
            
            return res.status(400).send({ status: false, message: "Mobile no. is mandatory" });
        }
        if (!validator.isValidMobile(mobile)) {
            return res.status(400).send({ status: false, message: "please enter valid mobile no." });
        }
        const duplicateMobile = await internModel.findOne({ mobile });
        if (duplicateMobile) return res.status(400).send({ status: false, message: "Mobile is already exist" });

        const getCollegeDetails = await collegeModel.findOne({ name: collegeName})
        if (!getCollegeDetails) return res.status(404).send({ status: false, message: "college not found." })

        const collegeId = getCollegeDetails._id
        const allInternsData = { name, email, mobile, collegeName, collegeId}

        const intern = await internModel.create(allInternsData)
        let internsData = {
            name: intern.name, email: intern.email, mobile: intern.mobile, collegeId: intern.collegeId,isDeleted:intern.isDeleted
        }
        return res.status(201).send({ data: internsData })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }

}



module.exports.createIntern = createIntern