const bookModel = require('../models/booksModel')

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
        if (Object.keys(queries).length == 0) return res.status(400).send({ status: false, message: 'book data is required to find' })

        let filter = { isDeleted: false }//{s,c,id}

        if (subcategory) filter.subcategory = subcategory
        if (category) filter.category = category
        if (userId) filter.userId = userId
        let requiredData = await bookModel.find(filter).select({ _id: 0, createdAt: 0, updatedAt: 0, ISBN: 0, subcategory: 0, reviews: 0, isDeleted: 0, __v: 0 }).sort({ title: 1 })
        if (requiredData.length == 0) return res.status(404).send({ status: false, message: 'data not found' })

        res.status(200).send({ status: true, message: 'Success', data: requiredData })
    }
    catch {
    }
}
module.exports = { createBook, getBook } 