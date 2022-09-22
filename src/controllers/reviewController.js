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


const updatereview = async function (req, res) {
    try {
        let params = req.params
        let { bookId, reviewId } = params
        let queries = req.body
        let { reviewedBy, rating, review } = queries
        let filter = {}

        if (reviewedBy) filter.reviewedBy = reviewedBy
        if (rating) filter.rating = rating
        if (review) filter.review = review

        let checkId = await bookModel.findOne({ _id: bookId, isDeleted: false }).select({ __v: 0 }).lean()
        if (!checkId) return res.status(404).send({ status: false, message: "book Data not found" })
        if (checkId) { var idOfReview = await reviewModel.findOneAndUpdate({ _id: reviewId, bookId: bookId, isDeleted: false }, filter, { new: true }) }
        if (!idOfReview) return res.status(404).send({ status: false, message: " Data not found" })

        const reviews = await reviewModel.find({ bookId: bookId, isDeleted: false }).select({ __v: 0 })
        checkId.reviewsData = reviews

        return res.status(201).send({ status: true, message: "Updated Successfully", data: checkId })
    }
    catch (err) {
        return res.status(500).send({ err: err.message })
    }
}


const deleteReview = async function (req, res) {
    try {
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId

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