const userModel = require('../models/userModel')
const jwt=require('jsonwebtoken')

const createUser = async function (req, res) {
    try {
      
        let requestBody = req.body
      
        if (!requestBody) return res.status(400).send({ status: false, message: 'user data is required in body' })
        let userData = await userModel.create(requestBody)
        res.status(201).send({ status: true, message: 'Success', data: userData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
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
            "Group": 66,
             iat: Math.floor(Date.now() / 1000) - 30
        },
            "secretkey",
            { expiresIn:'200m'}
        )
        res.setHeader('x-api-key', token)

        res.status(201).send({ status: true,message:'Success',data:token })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

module.exports={createUser,login}