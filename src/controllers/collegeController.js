const collegeModel = require("../models/collegeModels")
const validator = require("../validation/validation")

const createCollege = async function (req, res) {
    try {
        let data = req.body
        if ((Object.keys(req.body)).length == 0) {
            return res.status(400).send({ status: false, message: "Please provide details of the college" })
        }
        if (!validator.isValid(data.name)) {
            return res.status(400).send({ status: false, message: "Please provide name of the college" })
        }
        if (!validator.isValidShortName(data.name)) {
            return res.status(400).send({ status: false, message: "Name can contain only letters" })
        }
        let name = await collegeModel.findOne({ name: data.name,isDeleted:false })
        if (name) {
            return res.status(400).send({ status: false, message: "Please provide unique name" })
        }
        if (!validator.isValid(data.name)) {
            return res.status(400).send({ status: false, message: "Please provide fullName of the college" })
        }
        if (!validator.isValidFullName(data.fullName)) {
            return res.status(400).send({ status: false, message: "fullName can contain only letters,space,comma,'&',and '-' " })
        }
        if (!data.logoLink) {
            return res.status(400).send({ status: false, message: "Please provide logoLink of the college" })
        }
        if (typeof data.logoLink !== "string") {
            return res.status(400).send({ status: false, message: "LogoLink is Invalid" })
        }
        
        let savedData = await collegeModel.create(data)
        res.status(201).send({ status: true, message: "college is created successfully.", data: savedData })
    }
    catch (error) {
      res.status(500).send({ msg: error.message });
    }
  };

  //    ============================================================intern detalis by college name =================================
  const getcollege= async function(req, res){
    try{
      let collegeName = req.params.collegeName;
      if (collegeName.length ==0) {
        return res.status(400).send({ status: false, message: "Please provide collegeName of the college" })
      let college = await collegeModel.findOne({name:collegeName}).select({name:1,fullName:1,logoLink:1});
      let collegeName = await internModel.find({collegeId:college._id}).select({name:1,email:1,mobile:1,_id:1});
      let allInterns ={
        name: college.name,
        fullName: college.fullName,
        logoLink: college.logoLink,
        interns: collegeName
      };
      return res.status(200).send({ status:true,data:allInterns});
}
  }
    catch (error) {
      return res.status(500).send({ status:false, msg: error.message });
  }
}
  module.exports={createCollege,getcollege};