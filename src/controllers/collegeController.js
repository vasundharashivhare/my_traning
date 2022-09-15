const collegeModel = require("../models/collegeModels")
const validator = require("../validation/validation")
const internModel = require("../models/internModel")

const createCollege = async function (req, res) {
    try {
        let data = req.body
        if (!validator.isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Please provide details of the college" })
        }
        const { name, fullName, logoLink } = data
        if (!validator.isValid(data.name)) {
            return res.status(400).send({ status: false, message: "Please provide name of the college" })
        }
        if (!validator.isValidShortName(data.name)) {
            return res.status(400).send({ status: false, message: "Name can contain only letters" })
        }
        let duplicateName = await collegeModel.findOne({ name: data.name})
        if (duplicateName) {
            return res.status(400).send({ status: false, message: "Please provide unique name" })
        }
        if (!validator.isValid(data.name)) {
            return res.status(400).send({ status: false, message: "Please provide fullName of the college" })
        }
        if(!data.fullName){
          return res.status(400).send({ status: false, message: "Please provide full name" })
        }
        if (!validator.isValid(data.fullName)) {
            return res.status(400).send({ status: false, message: "fullName can contain only letters,space,comma,'&',and '-' " })
        }
      //   let duplicateFullName = await collegeModel.findOne({ fullName: fullName })
      //  if (duplicateFullName ) {
      //  return res.status(400).send({ status: false, msg: "FullName  already exist" })
      //   }
        if (!data.logoLink) {
            return res.status(400).send({ status: false, message: "Please provide logoLink of the college" })
        }
        
      //  if(!validator.isValidLink(data.logoLink)) {
      //    return res.status(400).send({ status: false, message: "LogoLink is Invalid" })
      //   }
    //     let duplicatelink= await collegeModel.findOne({logoLink:logoLink})
    //     if (duplicatelink){
    //   return res.status(400).send({ status: false, msg: "logolink  already exist" })
    // }
       data.name=name.toLowerCase() 
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
      let collegeName = req.query.collegeName;
      if (collegeName.length ===0) {
        return res.status(400).send({ status: false, message: "Please provide collegeName of the college" })}

      let college = await collegeModel.findOne({name:collegeName.toLowerCase()}).select({name:1,fullName:1,logoLink:1});
      if(!college)return res.status(400).send({ status: false, msg:"college not found" });
      let internName = await internModel.find({collegeId:college._id}).select({name:1,email:1,mobile:1,_id:1});
      if (internName.length===0)return res.status(404).send({status:false,message:"there is no students is applied for internship"})
      let allInterns ={
        name: college.name,
        fullName: college.fullName,
        logoLink: college.logoLink,
        interns: internName
      };
      return res.status(200).send({ status:true,data:allInterns});

  }

    catch (error) {
      return res.status(500).send({ status:false, msg: error.message });
  }
}

  module.exports={createCollege,getcollege};