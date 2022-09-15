const express = require('express');
const router = express.Router();
const collegeController=require("../controllers/collegeController")
const internController=require("../controllers/internController")
// const internController=require("../controllers/internController")



router.get("/test-me",function(req,res){
    res.status(200).send({msg:"All ok"})
})
//-------------------------------API for Create Author-----------------------//
router.post("/functionup/colleges",collegeController.createCollege)
router.post("/functionup/interns",internController.createIntern)
router.get("/functionup/collegeDetails",collegeController.getcollege)



module.exports = router;
