const jwt = require('jsonwebtoken')
const booksModel = require('../models/booksModel')
const v = require('../validators/validation')

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
        if (!v.isValidObjectId(BookId)) return res.status(400).send({ status: false, message: 'bookId is not valid' })


        if(!(await booksModel.findById(BookId))) return res.status(400).send({ status: false, message: 'BookId not exist' })

        let bodyUserId = req.body.userId
        if (!BookId) {
            if (req.userLoggedIn.userId != bodyUserId) return res.status(201).send({ status: false, message: 'Failed Authorisation' })
        }
       
        let book = await booksModel.findById(BookId)
        if(!book) return res.status(400).send({ status: false, message: 'BookId not exist' })

        if(BookId) { 
        let userId = book.userId
       
        if (req.userLoggedIn.userId != userId) return res.status(403).send({ status: false, message: "User is unauthorised" })
         } next()
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { authentication, authorisation }