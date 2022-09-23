const reviewModel = require('../models/reviewModel')
const bookModel = require('../models/booksModel')
const v = require('../validators/validation')

const createReview = async function (req, res) {
    try {
        let bookId = req.params.bookId
        if (!v.isValidObjectId(bookId)) return res.status(400).send({ status: false, message: 'bookId is not valid' })

        let bookData = await bookModel.findById(bookId).select({ __v: 0 })
        if (!bookData) return res.status(400).send({ status: false, message: 'id not present in bookdata' })

        let requestBody = req.body
        if (!v.isvalidRequest(requestBody)) return res.status(400).send({ status: false, message: 'review data is required in body' })
        
        let {rating}=requestBody
        if (!v.isValidSpace(rating)) return res.status(400).send({ status: false, message: 'rating is mandatory' })
        if (!v.isvalidRating(rating)) return res.status(400).send({ status: false, message: 'valid rating is mandatory' })


        requestBody.bookId = bookId
        requestBody.reviewedAt = new Date()

        let reviewData = await reviewModel.create(requestBody)
        if (reviewData) { var updateData = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { $inc: { reviews: 1 } }, { new: true }).select({ __v: 0 }).lean() }

        updateData.reviewsData = reviewData

        return res.status(201).send({ status: true, message: 'Success', data: updateData })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


const updatereview = async function (req, res) {
    try {
        let { bookId, reviewId } = req.params
        if (!v.isValidObjectId(bookId)) return res.status(400).send({ status: false, message: 'bookId is not valid' })
        if (!v.isValidObjectId(reviewId)) return res.status(400).send({ status: false, message: 'reviewId is not valid' })

        let requestBody = req.body
        if (!v.isvalidRequest(requestBody)) return res.status(400).send({ status: false, message: 'give me some data to update' })

        let { reviewedBy, rating, review } = requestBody
        let filter = {}

        if (reviewedBy) filter.reviewedBy = reviewedBy
        if (rating) filter.rating = rating
        if (review) filter.review = review

        let bookData = await bookModel.findOne({ _id: bookId, isDeleted: false }).select({ __v: 0 }).lean()
        if (!bookData) return res.status(404).send({ status: false, message: "book Data not found" })
        if (bookData) { var updatedReviewData = await reviewModel.findOneAndUpdate({ _id: reviewId, bookId: bookId, isDeleted: false }, filter, { new: true }).select({ __v: 0 }) }
        if (!updatedReviewData) return res.status(404).send({ status: false, message: "review Data not found" })

        bookData.reviewsData = updatedReviewData

        return res.status(201).send({ status: true, message: "Updated Successfully", data: bookData })
    }
    catch (err) {
        return res.status(500).send({ err: err.message })
    }
}


const deleteReview = async function (req, res) {
    try {
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId
        if (!v.isValidObjectId(bookId)) return res.status(400).send({ status: false, message: 'bookId is not valid' })
        if (!v.isValidObjectId(reviewId)) return res.status(400).send({ status: false, message: 'reviewId is not valid' })


        if (bookId) { var checkId = await bookModel.findOne({ _id: bookId, isDeleted: false }) }
        if (!bookId) return res.status(404).send({ status: false, message: "book Data not found" })
        if (checkId) { var idOfReview = await reviewModel.findOneAndUpdate({ _id: reviewId, bookId: bookId, isDeleted: false }, { isDeleted: true, }, { new: true }) }
        if (!idOfReview) return res.status(404).send({ status: false, message: " Data not found" })
        if (idOfReview)  await bookModel.findOneAndUpdate({ _id: bookId }, { $inc: { reviews: -1 } }, { new: true })

        return res.status(200).send({ status: true, message: "Deleted Successfully" })
    }
     catch (err) {
        return res.status(500).send({ err: err.message })
    }
}


module.exports = { createReview, updatereview, deleteReview }