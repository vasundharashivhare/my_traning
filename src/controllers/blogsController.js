
const blogModel=require("../model/blogsModel")
const authorModel=require("../model/authorsModel")
const moment=require('moment')
const mongoose = require('mongoose');
const { query } = require("express")
const createBlog=async function(req,res){
    try{
        let object=req.body
        let objectlength=Object.keys(object)
        if(objectlength==0){
           return res.status(400).send({status: false,msg:"Body is require"})
        }
        if(!object.title||!object.authorId||!object.body||!object.category){
            return res.status(400).send({status: false,msg:"Body missing a mandatory field"})
        }
        
        let validAuthorId=await authorModel.findById({_id:object.authorId})
        if(!validAuthorId) return res.status(404).send({status: false,msg:"authorId Is not found"})
        
        
        if(object.isPublished===true){
            req.body.publishedAt=moment().format();
        }
        
        let createBlog=await blogModel.create(object)
        res.status(201).send({status:true,msg:createBlog})
    }
    catch(err){
        res.status(500).send({msg:err})
    }
}
const getblog=async function(req,res){
  let a=req.body
  a.sameer="pluto batch"
    try{
        if (Object.keys(req.query).length === 0){
         let totalBlogs = await blogModel.find({ isDeleted: false,isPublished: true,});
    if (totalBlogs.length === 0)  return res.status(404).send({ status: false, msg: "None of the Blogs are Published" });
              
           return res.status(200).send({ status: true, msg: totalBlogs });
            }
            
    
    let { _id,title,authorId, category, tags, subcategory} = req.query;
    let query = {};
    if (_id != null) query._id = _id;
    if (title != null) query.title = title;
    if (authorId != null) query.authorId = authorId;
    if (category != null) query.category = category;
    if (tags != null) query.tags = tags;
    if (subcategory != null) query.subcategory = subcategory;
    query.isDeleted= false   
    query.isPublished= true
      let finalFilter = await blogModel.find(query);
    if(finalFilter.length==0) return res.status(404).send({status:true,msg:"Request is Not found"})
      return res.status(200).send({ status: true, msg: finalFilter });
    
  } catch (error) {
    res.status(500).send({ status: false, msg: "server error" });
  }
};


const updateBlog = async function (req, res) {
    try {
        let blogId=req.params.blogId
        if(!mongoose.isValidObjectId(blogId)) return res.status(400).send({status:false,msg:"Type of BlogId is must be ObjectId "})
      let foundDoc = await blogModel.findById(blogId);
      if(!foundDoc) return res.status(401).send({
        status: false,
        msg: "id not available / invalid or unauthorized BlogId",
      });
      if(foundDoc.isDeleted == true) return res.status(404).send({status: true, msg: "Blog is deleted"})
      
  
      if (foundDoc && foundDoc.isDeleted == false) {
        let updatedDoc = await blogModel.updateMany(
          { _id:blogId, },
          {
            $push: req.body.subcategory,
            $set: { isPublished: true, publishedAt: new Date() },
          },
          { new: true }
        );
  
        let data = await blogModel.findById({ _id:blogId });
        return res.status(200).send({ status: true, data: data });
      }
      
    } catch (error) {
      return res.status(500).send({ msg: error.message });
    }
  };
  const deleteBlog = async function (req, res) {

    let blogId = req.params.blogId;
    let blogs = await blogModel.findById(blogId);
    
    if (!blogs) {
      return res.status(400).send({status:false,msg:"Blog is not available or not valid"});

    } else if(blogs.isDeleted == true){
      res.status (400).send({status:false,msg:'this blog  is already deleted.'} )
      
    }else{
    let updatebloge = await blogModel.findOneAndUpdate({ _id: blogId },{ isDeleted : true},{new : true});
    res.send({ status: true, msg : "blog deleted successfully"});
  }
  };

  // const undeleteall=async function(req,res){
  //   let undelete=await blogModel.updateMany({},{isDeleted:false},{new:true})
  //   res.status(200).send({status:true,msg:"done he....:)>>:)>>:)"})
  // }


  const deleteBlogByQuery = async function (req, res) {
    try {
        let query = req.query
        if (Object.keys(query).length == 0) {
            return res.status(400).send({ status: false, msg: "Query Params cannot be empty" })
        }

        let deleteBlogs = await blogModel.updateMany({authorId: query.authorId, isDeleted: false}, { $set: { isDeleted: true, deletedAt: Date.now() } })
        if (deleteBlogs.matchedCount == 0) {
            return res.status(404).send({ status: false, msg: "Blog Not Found" })
        }
        
        res.status(200).send({ status: true, msg: "Document is deleted" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.createBlog=createBlog
module.exports.getblog=getblog
module.exports.updateBlog = updateBlog
module.exports.deleteBlog = deleteBlog;
module.exports.deleteBlogByQuery=deleteBlogByQuery
//module.exports. undeleteall= undeleteall