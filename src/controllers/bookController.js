const bookModel=require('../models/booksModel')

const createBook=async function(req,res){
    let requestBody=req.body
    if(!requestBody) return res.status(400).send({status:false,message:'book data is required in body'})
    let bookData=await bookModel.create(requestBody)
    res.status(201).send({status:true,message:'Success',data:bookData})
}


const getBook=async function(req,res){
    let requestBody=req.body
    if(!requestBody) return res.status(400).send({status:false,message:'book data is required in body'})
    let bookData=await bookModel.create(requestBody)
    res.status(201).send({status:true,message:'Success',data:bookData})
}
module.exports.createBook=createBook