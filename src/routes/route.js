const express = require('express');
const router = express.Router();
const authorController=require("../controllers/authorsController")
const blogController=require("../controllers/blogsController")


router.get("/test-me",function(req,res){
    res.status(200).send({msg:"All ok"})
})
//-------------------------------API for Create Author-----------------------//
router.post("/authors",authorController.createAuthor)

//-----------------------API for Create Blog-----------------------------//
router.post("/blogs",blogController.createBlog)

//---------------------API for Fetch Blog--------------------------//
router.get("/getblogs",blogController.getblog)

//---------------------API for Update  Blog------------------//
router.put("/blogs/:blogId",blogController.updateBlog)

//---------------API for Delete Blog---------------------//
router.delete("/blogs/:blogId",blogController.deleteBlog)
router.delete("/blogby",blogController.deleteBlogByQuery)

//......................................FOR restore  all data-------//
//router.delete("/undelete",blogController. undeleteall)


module.exports = router;   

