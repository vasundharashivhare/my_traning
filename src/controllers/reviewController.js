const reviewModel=require('../models/reviewModel')

const createReview=async function(req,res){
    let requestBody=req.body
    if(!requestBody) return res.status(400).send({status:false,message:'review data is required in body'})
    let reviewData=await reviewModel.create(requestBody)
    res.status(201).send({status:true,message:'Success',data:reviewData})
}

module.exports.createReview=createReview