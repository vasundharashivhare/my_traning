const jwt = require('jsonwebtoken')
const booksModel = require('../models/booksModel')

let authentication = async function (req, res, next) {
    try {
        let token = req.headers['x-api-key']
        if (!token) return res.status(401).send({ status: false, message: "token must be present" })

        jwt.verify(token, "g66indmahraj", (err, user) => {
            if (err) { return res.status(403).send("invalid token") }
            req.userLoggedIn = user
        })
        next()
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

let authorisation = async function (req, res, next) {
    try {
        let BookId = req.params.bookId
        let book = await booksModel.findById(BookId)
        let userId = book.userId
        console.log(userId)
        if (req.userLoggedIn.userId != userId) return res.status(403).send({ status: false, message: "User is unauthorised" })
        next()
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { authentication, authorisation }