const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const booksModel = require('../models/booksModel')

let authentication = async function (req, res, next) {
    try {
        let token = req.headers['x-api-key']
        if (!token) res.status(401).send({ status: false, message: "enter valid token" })

        jwt.verify(token, "secretkey", (err, user) => {
            if (err) { return res.status(403).send("failed authentication") }
            req.userLoggedIn = user
        })
        next()
    }
    catch (err) {
        return res.status(500).send({ satus: false, message: err.message })
    }
}

let authorisation = async function (req, res, next) {
    try {
        let BookId = req.params.bookId
        let book = await booksModel.findById(BookId)
        let userId = book.userId
        if (req.userLoggedIn.userId != userId) return res.status(403).send({ status: false, message: "User is unauthorised" })
        next()
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { authentication, authorisation }