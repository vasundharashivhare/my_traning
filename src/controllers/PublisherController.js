const PublisherModel= require("../models/newPublisherModel")

const createpublisher= async function (req, res) {
    let publisher = req.body
    let publisherData = await PublisherModel.create(publisher)
    res.send({data: publisherData})
}



module.exports= createpublisher
