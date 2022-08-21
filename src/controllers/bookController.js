const bookModel= require("../models/newbookModel")
const publisherModel= require("../models/newPublisherModel")
const authorModel= require("../models/newauthorModel")
const mongoose= require("mongoose")



const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
};

const createBook = async function (req, res) {
    let book = req.body;
    let { author_id, publisher_id } = book;
    if (!author_id || !publisher_id) {
        return res.send("ID is required")
    }
    if (!isValidObjectId(author_id)) {
        return res.send({ status: false, message: "Author is not present" });
    }
    if (!isValidObjectId(publisher_id)) {
        return res.send({ status: false, message: "Publisher is not present" });
    }

    let bookCreated = await bookModel.create(book)
    return res.send({ data: bookCreated })
}

const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate(['author_id','publisher_id'])
    res.send({data: specificBook})

}

module.exports= {
    createBook,
    getBooksWithAuthorDetails

}