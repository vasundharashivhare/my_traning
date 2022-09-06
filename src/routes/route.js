const express = require('express');
const router = express.Router();
const authorController=require("../controllers/authorsController")
const blogController=require("../controllers/blogsController")


router.get("/test-me",function(req,res){
    res.status(200).send({msg:"All ok"})
})

router.post("/authors",authorController.creatAuthor)
router.post("/blogs",blogController.createBlog)



module.exports = router;   