const jwt=require("jsonwebtoken")


const authenticate = async function (req, res, next) {
    try {
      let token = req.headers["x-api-key"] 
      if (!token) return res.status(400).send({ status: false, msg: "token must be present in the request header" })
      let decodedToken = jwt.verify(token, 'thou-hath-the-poer')
      if(!decodedToken)  return res.status(401).send({status:false,msg:"user is not authenticate..."})
      req.decodedToken = decodedToken
      next()
    }
    catch (err) {
      res.status(500).send({ msg: err })
    }
  }
  

  module.exports.authenticate=authenticate