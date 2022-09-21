const bookModel=require('../models/booksModel')

const createBook=async function(req,res){
    let requestBody=req.body
    if(!requestBody) return res.status(400).send({status:false,message:'book data is required in body'})
    let bookData=await bookModel.create(requestBody)
    res.status(201).send({status:true,message:'Success',data:bookData})
}


const getBook=async function(req,res){
    let userID=req.query.userId
    let Category=req.query.category
    let subCategory=req.query.subcategory
    let filter = {isDeleted:false}
    if(!requestBody) return res.status(400).send({status:false,message:'book data is required to find'})
  if(subCategory){
filter.subcategory = subCategory

  }
  if(Category){
    filter.category = Category
    
      }if(userID){
        filter.userId = userID
        
          }
    let requiredData=await bookModel.find({filter}).select({_id:0, createdAt:0, updatedAt:0, _v:0})
    res.status(201).send({status:true,message:'Success',data:requiredData})
}
module.exports={createBook,getBook}