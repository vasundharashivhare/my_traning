const bookModel = require('../models/booksModel')
const reviewModel = require('../models/reviewModel')
const v = require('../validators/validation')

const aws = require("aws-sdk");

aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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", //buket create
    region: "ap-south-1"
})

let uploadFile= async ( file) =>{
   return new Promise( function(resolve, reject) {
    // this function will upload file to aws and return the link
    let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws

    var uploadParams= {
        ACL: "public-read", // public
        Bucket: "classroom-training-bucket",  //HERE  //user/object store
        Key: "abc/" + file.originalname, //HERE  // key+obj
        Body: file.buffer //
    }


    s3.upload( uploadParams, function (err, data ){ //callback
        if(err) {
            return reject({"error": err})
        }
        console.log(data)
        console.log("file uploaded succesfully")
        return resolve(data.Location)  
    })


   })
}









//_______________________________________________________________createBook___________________________________________
const createBook = async function (req, res) {
    try{
        
        let files= req.files
        let uploadedFileURL
        if(files && files.length > 0){
            //upload to s3 and get the uploaded link
            // res.send the link back to frontend/postman
             uploadedFileURL= await uploadFile( files[0] )
        }


         
    let requestBody = req.body

    requestBody.bookCover=uploadedFileURL
    if (!v.isvalidRequest(requestBody)) return res.status(400).send({ status: false, message: 'book data is required in body' })
    let {title,excerpt,userId,ISBN,category,subcategory,releasedAt} = requestBody
    
    if (!v.isValidSpace(title)) return res.status(400).send({ status: false, message: 'title is mandatory' })
    if (await bookModel.findOne({title:title}) )return res.status(400).send({ status: false, message: 'title already exist' })


    if (!v.isValidSpace(excerpt)) return res.status(400).send({ status: false, message: 'excerpt is mandatory' })
    if (!v.isValidSpace(userId)) return res.status(400).send({ status: false, message: 'userId is mandatory' })
    if (!v.isValidObjectId(userId)) return res.status(400).send({ status: false, message: 'valid userId is mandatory' })

    if (!v.isValidSpace(ISBN)) return res.status(400).send({ status: false, message: 'ISBN is mandatory' })

    if(await bookModel.findOne({ISBN:ISBN}) ) return res.status(400).send({ status: false, message: 'ISBN already exist' })

    if (!v.isValidSpace(category)) return res.status(400).send({ status: false, message: 'category is mandatory' })
    if (!v.isValidString(category)) return res.status(400).send({ status: false, message: 'category must be in string' })

    if (!v.isValidSpace(subcategory)) return res.status(400).send({ status: false, message: 'subcategory is mandatory' })
    if (!v.isValidString(subcategory)) return res.status(400).send({ status: false, message: 'subcategory must be in string' })

    if (!v.isValidSpace(releasedAt)) return res.status(400).send({ status: false, message: 'releasedAt is mandatory' })
    if(!(v.isValidDate(releasedAt))) return res.status(400).send({ status: false, message: 'releasedat should be date' })

    let bookData = await bookModel.create(requestBody)
    return res.status(201).send({ status: true, message: 'Success', data: bookData })
    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}


//_________________________________________________________getBook_______________________________________________________
const getBook = async function (req, res) {
    try {
        let queries = req.query
        let { userId, category, subcategory } = queries

    
        let filter = { isDeleted: false }

        if (subcategory) filter.subcategory = subcategory
        if (category) filter.category = category
        if (userId) filter.userId = userId
        let requiredData = await bookModel.find(filter).select({createdAt: 0, updatedAt: 0, ISBN: 0, subcategory: 0,isDeleted: 0, __v: 0 }).sort({ title: 1 }) 
        if (requiredData.length == 0) return res.status(404).send({ status: false, message: 'data not found' })

       
        return res.status(200).send({ status: true, message: 'Success', data: requiredData })
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}


//________________________________________________________________________________getBookById___________________________________________________
const getBookById = async function (req, res) {
    try {
        let bookId = req.params.bookId
        if (!v.isValidObjectId(bookId)) return res.status(400).send({ status: false, message: 'bookId is not valid' })
    
        let bookData = await bookModel.findById(bookId).select({ __v: 0 }).lean()
        if (!bookData) return res.status(404).send({ status: false, message: "bookId doesn't exist" })
        if(bookData.isDeleted==true) return res.status(404).send({ status: false, message: 'This book is already deleted' })

       let reviewsData = await reviewModel.find({ bookId: bookData._id , isDeleted:false})
        bookData.reviewsData = reviewsData

        return res.status(200).send({ status: true, message: 'Success', data: bookData })
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}


//________________________________________________________________________________UpdateBook______________________________________________________
const updateBook = async function (req, res) {
    try {
   
        let requestBody = req.body
        if (!v.isvalidRequest(requestBody)) return res.status(400).send({ status: false, message: 'give me some data to update' })
      if(req.book.isDeleted==true) return res.status(400).send({ status: false, message: 'this book is deleted, so you cant update' })
     
       
        let { title, excerpt, releasedAt, ISBN } = requestBody
        
        let filter = { isDeleted: false }


        const isUnique = await bookModel.find({ $or: [{ title: title }, { ISBN: ISBN }] })
        if (isUnique.length >= 1) {
            if (isUnique.length == 1) {
                if (isUnique[0].title == title) {
                    return res.status(400).send({ status: false, message: "title already exist" })
                }
                if (isUnique[0].ISBN == ISBN) {
                    return res.status(400).send({ status: false, message: "ISBN already exist" })
                }
            }else{
                return res.status(400).send({ status: false, message: "title and ISBN already exist" })
            }
        }


        if (title) filter.title = title
        if (excerpt) filter.excerpt = excerpt
        if (releasedAt) filter.releasedAt = releasedAt

        let updatedBook = await bookModel.findByIdAndUpdate({ _id: req.BookId }, filter, { new: true })
        return res.status(200).send({ status: true, message: 'Success', data: updatedBook })
    }
    catch (err) {
        return res.status(500).send({ err: err.message })
    }
}


//________________________________________________________________________deleteBook________________________________________________________________
const deleteBook = async function (req, res) {
    try {
        
        let bookData = await bookModel.findOneAndUpdate({ _id: req.BookId , isDeleted: false }, { isDeleted: true, deletedAt: Date.now() }, { new: true })
        if (!bookData) return res.status(404).send({ status: false, message: "Already deleted" })
        return res.status(200).send({ status: true, message: 'Successfully deleted'})
    } 
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createBook, getBook, getBookById, updateBook, deleteBook } 