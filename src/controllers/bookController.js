const bookModel = require('../models/booksModel')
const reviewModel = require('../models/reviewModel')
const v = require('../validators/validation')

const createBook = async function (req, res) {
    let requestBody = req.body
    if (!v.isvalidRequest(requestBody)) return res.status(400).send({ status: false, message: 'book data is required in body' })
    let {title,excerpt,userId,ISBN,category,subcategory,releasedAt} = requestBody
    
    if (!v.isValidSpace(title)) return res.status(400).send({ status: false, message: 'title is mandatory' })

    if (!v.isValidSpace(excerpt)) return res.status(400).send({ status: false, message: 'excerpt is mandatory' })
    if (!v.isValidSpace(userId)) return res.status(400).send({ status: false, message: 'userId is mandatory' })
    if (!v.isValidObjectId(userId)) return res.status(400).send({ status: false, message: 'valid userId is mandatory' })

    if (!v.isValidSpace(ISBN)) return res.status(400).send({ status: false, message: 'ISBN is mandatory' })
    if (!v.uniqueISBN(ISBN)) return res.status(400).send({ status: false, message: 'valid ISBN is mandatory' })

    if (!v.isValidSpace(category)) return res.status(400).send({ status: false, message: 'category is mandatory' })
    if (!v.isValidString(category)) return res.status(400).send({ status: false, message: 'category must be in string' })

    if (!v.isValidSpace(subcategory)) return res.status(400).send({ status: false, message: 'subcategory is mandatory' })
    if (!v.isValidString(subcategory)) return res.status(400).send({ status: false, message: 'subcategory must be in string' })

    if (!v.isValidSpace(releasedAt)) return res.status(400).send({ status: false, message: 'releasedAt is mandatory' })

    let bookData = await bookModel.create(requestBody)
    return res.status(201).send({ status: true, message: 'Success', data: bookData })
}


const getBook = async function (req, res) {
    try {
        let queries = req.query
        let { userId, category, subcategory } = queries

     
        let filter = { isDeleted: false }

        if (subcategory) filter.subcategory = subcategory
        if (category) filter.category = category
        if (userId) filter.userId = userId
        let requiredData = await bookModel.find(filter).select({ _id: 0, createdAt: 0, updatedAt: 0, ISBN: 0, subcategory: 0, reviews: 0, isDeleted: 0, __v: 0 }).sort({ title: 1 })
        if (requiredData.length == 0) return res.status(404).send({ status: false, message: 'data not found' })

        return res.status(200).send({ status: true, message: 'Success', data: requiredData })
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}

const getBookById = async function (req, res) {
    try {
        let bookId = req.params.bookId
        if (!v.isValidObjectId(bookId)) return res.status(400).send({ status: false, message: 'bookId is not valid' })

        let bookData = await bookModel.findById(bookId).select({ __v: 0 }).lean() 
        if (!bookData) return res.status(400).send({ status: false, message: "bookId doesn't exist" })


        let reviewsData = await reviewModel.find({ bookId: bookData._id })
        bookData.reviewsData = reviewsData

        return res.status(200).send({ status: true, message: 'Success', data: bookData })
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}

const updateBook = async function (req, res) {
    try {
        let bookId = req.params.bookId
        if (!v.isValidObjectId(bookId)) return res.status(400).send({ status: false, message: 'bookId is not valid' })

        let requestBody = req.body
        if (!v.isvalidRequest(requestBody)) return res.status(400).send({ status: false, message: 'give me some data to update' })

        let { title, excerpt, releasedAt, ISBN } = requestBody
        
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
        return res.status(500).send({ err: err.message })
    }
}

const deleteBook = async function (req, res) {
    try {
        let bookId = req.params.bookId
        if (!v.isValidObjectId(bookId)) return res.status(400).send({ status: false, message: 'bookId is not valid' })

        if (!(await bookModel.findById(bookId))) return res.status(404).send({ status: false, message: "enter correct bookid" })

        let bookData = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { isDeleted: true, isDeletedAt: Date.now() }, { new: true })
        if (!bookData) return res.status(404).send({ status: false, message: "Already deleted" })
        return res.status(200).send({ status: true, message: 'Success', data: bookData })
    } 
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createBook, getBook, getBookById, updateBook, deleteBook } 