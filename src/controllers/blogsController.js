
const blogModel=require("../model/blogsModel")
const authorModel=require("../model/authorsModel")
const moment=require('moment')
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
const getblog=async function(req,res){
    try{
    let querys=req.query
    //console.log(querys)
    let keysOfQuerys=Object.keys(querys)
    if(keysOfQuerys.length==0) {
        let getblog=await  blogModel.find({isDeleted:false,isPublished:true})
        return res.status(200).send({status:true,msg:getblog})}
     
       // req.querys.isDeleted=false
        //req.querys.isPublished=true
     
    let getblog=await  blogModel.find({$and:[querys,{isDeleted:false},{isPublished:true},{tags: { $in: [querys.tag] }}]})
        //{ tags: { $in: [querys.tag] },isDeleted:false,isPublished:true,_id:querys._id }
        // $or:[
        //     {_id:querys._id,isDeleted:false,isPublished:true},
        //     {category:"adventures",isDeleted:false,isPublished:true}]
     //)
    if(getblog.length==0) return res.status(404).send({status:false,msg:"request not found"})
    res.status(200).send({status:true,data:getblog})
    }
    catch(err){
        res.status(500).send({status:false,msg:err})
    }

}



module.exports.createBlog=createBlog
module.exports.getblog=getblog