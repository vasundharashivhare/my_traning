const reviewModel = require('../models/reviewModel')
const bookModel = require('../models/booksModel')

const createReview = async function (req, res) {
    try {
        let bookId = req.params.bookId
       
        let bookData = await bookModel.findById(bookId).select({ __v: 0 })
        if (!bookData) return res.status(400).send({ status: false, message: 'id not present in bookdata' })
        
        let requestBody = req.body
        if (!requestBody) return res.status(400).send({ status: false, message: 'review data is required in body' })
        requestBody.bookId = bookId
        requestBody.reviewedAt = new Date()
       
        let reviewData = await reviewModel.create(requestBody)
        if (reviewData) { var updateData = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { $inc: { reviews: 1 } }, { new: true }).select({ __v: 0 }).lean() }

        let reviewsData = await reviewModel.find({ bookId: bookData._id }).select({ __v: 0 })
        updateData.reviewsData = reviewsData

        return res.status(201).send({ status: true, message: 'Success', data: updateData })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

//const updateReview=async function(req,res){


module.exports = { createReview }