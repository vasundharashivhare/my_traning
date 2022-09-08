const jwt=require("jsonwebtoken")


const authenticate = async function (req, res, next) {
    try {
      let token = req.headers["x-api-key"] 
      if (!token) return res.status(400).send({ status: false, msg: "token must be present in the request header" })
      let decodedToken = jwt.verify(token, 'thou-hath-the-poer')
      req.decodedToken = decodedToken
      next()
    }
    catch (err) {
      res.status(500).send({ msg: err })
    }
  }
  const authorization = async function (req, res, next) {
    
    authorized_id = req.decodedToken["authorId"]
    if (userid == authorized_id) {
      next()
    } else {
      return res.status(400).send({ status: false, msg: "Un-authorized_User" })
    }
  }


  module.exports.authenticate=authenticate