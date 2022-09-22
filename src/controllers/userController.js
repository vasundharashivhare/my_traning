const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createUser = async function (req, res) {
    try {
        let requestBody = req.body
        if (!requestBody) return res.status(400).send({ status: false, message: 'user data is required in body' })
        let userData = await userModel.create(requestBody)
        return res.status(201).send({ status: true, message: 'Success', data: userData })
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}

const login = async function (req, res) {
    try {
        let requestBody = req.body
        if (!requestBody) return res.status(400).send({ status: false, message: 'user data is required in body' })
        let { email, password } = requestBody
        if (!email) return res.status(400).send({ status: false, message: 'email data is required in body' })
        if (!password) return res.status(400).send({ status: false, message: 'password data is required in body' })

        let userData = await userModel.findOne({ email: email, password: password })
        if (!userData) return res.status(400).send({ status: false, message: 'no such user found' })


        let token = jwt.sign({
            userId: userData._id.toString(),
            iat: Math.floor(Date.now() / 1000),
            expln:"200m"
        },
            "g66indmahraj"
        );

        res.setHeader('x-api-key', token)
        return res.status(201).send({ status: true, message: 'Success', data: token })
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}

module.exports = { createUser, login }
