
const blogModel=require("../model/blogsModel")
const authorModel=require("../model/authorsModel")
const moment=require('moment')
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
       try{ 
        let validAuthorId=await authorModel.findById({_id:object.authorId})
        if(!validAuthorId) return res.status(404).send({status: false,msg:"authorId Is not found"})
        }
        catch(err){
           return  res.status(400).send({status: false,msg:"Type of AuthorId must be (ObjectId)"})
        }
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


module.exports.createBlog=createBlog