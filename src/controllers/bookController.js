const bookModel = require('../models/booksModel')
const reviewModel = require('../models/reviewModel')

const createBook = async function (req, res) {
    let requestBody = req.body
    if (!requestBody) return res.status(400).send({ status: false, message: 'book data is required in body' })
    let bookData = await bookModel.create(requestBody)
    res.status(201).send({ status: true, message: 'Success', data: bookData })
}


const getBook = async function (req, res) {
    try {
        let queries = req.query
        let { userId, category, subcategory } = queries

        let filter = { isDeleted: false }//{s,c,id}

        if (subcategory) filter.subcategory = subcategory
        if (category) filter.category = category
        if (userId) filter.userId = userId
        let requiredData = await bookModel.find(filter).select({ _id: 0, createdAt: 0, updatedAt: 0, ISBN: 0, subcategory: 0, reviews: 0, isDeleted: 0, __v: 0 }).sort({ title: 1 })
        if (requiredData.length == 0) return res.status(404).send({ status: false, message: 'data not found' })

        res.status(200).send({ status: true, message: 'Success', data: requiredData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

const getBookById = async function (req, res) {
    try {
        let bookId = req.params.bookId
        let bookData = await bookModel.findById(bookId).select({ __v: 0 }).lean()


        let reviewsData = await reviewModel.find({ bookId: bookData._id })
        bookData.reviewsData = reviewsData

        // let data=Object.create(bookData)

        res.status(200).send({ status: true, message: 'Success', data: bookData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

const updateBook = async function (req, res) {
    try {
        let bookId = req.params.bookId
        let queries = req.body
        let { title, excerpt, releasedAt, ISBN } = queries
        let filter = { isDeleted: false }


        if (ISBN) {
            let uniqueISBN = await bookModel.findOne({ ISBN: ISBN })
            if (uniqueISBN) res.status(200).send({ status: false, message: 'ISBN already exist' })
            filter.ISBN = ISBN
        }

        if (title) filter.title = title
        if (excerpt) filter.excerpt = excerpt
        if (releasedAt) filter.releasedAt = releasedAt

        let updatedBook = await bookModel.findByIdAndUpdate({ _id: bookId }, filter, { new: true })
        return res.status(200).send({ status: true, message: 'Success', data: updatedBook })
    }
    catch (err) {
        res.status(500).send({ err: err.message })

    }
}

const deleteBook = async function (req, res) {

    try {
        let bookId = req.params.bookId
        if (!(await bookModel.findById(bookId))) return res.status(404).send({ status: false, message: "enter correct bookid" })

        let bookData = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { isDeleted: true,isDeletedAt:Date.now() }, { new: true })
        if (!bookData) return res.status(404).send({ status: false, message: "Already delelted" })

        return res.status(200).send({ status: true, message: 'Success', data: bookData })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createBook, getBook, getBookById, updateBook, deleteBook } 