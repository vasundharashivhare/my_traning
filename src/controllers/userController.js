const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const v = require('../validators/validation')

const createUser = async function (req, res) {
    try {
        let requestBody = req.body
        let { title, name, phone, email, password, } = requestBody


        if (!(v.isvalidRequest(requestBody)) ) return res.status(400).send({ status: false, message: 'user data is required in body' })

        if( (Object.keys(body).length > 6)) return res.status(400).send({ status: false, message: 'extra keys are not allowed' })


        if (!title) return res.status(400).send({ status: false, message: 'title is mandatory' })
        if (v.isValidTitle(title)) return res.status(400).send({ status: false, message: 'title should be either Miss., Mrs. or Mr.' })

        if (!name) return res.status(400).send({ status: false, message: 'name is mandatory' })
        if ((!v.isValidString(name)) && (!v.isValidSpace(name))) return res.status(400).send({ status: false, message: 'Name should be in alphabet' })

        if (!phone) return res.status(400).send({ status: false, message: 'phone is mandatory' })
        if (!v.isValidMobileNumber(phone)) return res.status(400).send({ status: false, message: 'Enter a valid 10 digit phone number' })

        if (!email) return res.status(400).send({ status: false, message: 'email is mandatory' })
        if ((!v.isValidEmail(email)) && (!v.isLowerCase(email))) return res.status(400).send({ status: false, message: 'enter valid email in lowercase' })

        if (!password) return res.status(400).send({ status: false, message: 'password is mandatory' })
        if (!v.isValidPassword(password)) return res.status(400).send({ status: false, message: 'Enter valid password' })


        const isUnique = await internModel.find({
            $or: [
                { email: email },
                { phone: phone }
            ]
        })
        if (isUnique.length >= 1) {
            if (isUnique.length == 1) {
                if (isUnique[0].email == email) {
                    return res
                        .status(400)
                        .send({ status: false, message: "Email already exist" })
                }
                if (isUnique[0].phone == phone) {
                    return res
                        .status(400)
                        .send({ status: false, message: "phone already exist" })
                }

            }
            else {
                return res
                    .status(400)
                    .send({ status: false, message: "Both already exist" })
            }
        }

        let userData = await userModel.create(requestBody)
        return res.status(201).send({ status: true, message: 'Success', data: userData })
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}


//_____________________________________________________________________________________login user___________________________________________________________


const login = async function (req, res) {
    try {
        let requestBody = req.body
        if (!requestBody) return res.status(400).send({ status: false, message: 'user data is required in body' })
        let { email, password } = requestBody

        if (!email) return res.status(400).send({ status: false, message: 'email is mandatory' })
        if ((!isValidEmail(email)) && (!isLowerCase(email))) return res.status(400).send({ status: false, message: 'enter valid email and in lowercase' })

        if (!password) return res.status(400).send({ status: false, message: 'password is mandatory' })
        if (!isValidPassword(password)) return res.status(400).send({ status: false, message: 'Enter valid password' })

        let userData = await userModel.findOne({ email: email, password: password })
        if (!userData) return res.status(400).send({ status: false, message: 'no such user found' })


        let token = jwt.sign({
            userId: userData._id.toString(),
            iat: Math.floor(Date.now() / 1000),
            expln: "200m"
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
