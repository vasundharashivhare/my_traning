const jwt = require('jsonwebtoken')
const booksModel = require('../models/booksModel')

let authentication = async function (req, res, next) {
    try {
        let token = req.headers['x-api-key']
        if (!token) res.status(401).send({ status: false, message: "token must be present" })

        jwt.verify(token, "secretkey", (err, user) => {
            if (err) { return res.status(403).send("invalid token") }
            req.userLoggedIn = user
        })
        console.log(req.userLoggedIn)
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
        if (req.userLoggedIn.userId != userId) return res.status(403).send({ status: false, message: "User is unauthorised" })
        next()
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { authentication, authorisation }