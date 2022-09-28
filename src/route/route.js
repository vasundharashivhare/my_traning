const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')
const bookController=require('../controllers/bookController')
const reviewController=require('../controllers/reviewController')
const mid=require('../middleware/mid')
const aws = require("aws-sdk")



router.post('/register',userController.createUser)//create user


router.post('/login',userController.login)//login user

router.post('/books',mid.authentication,mid.authorisation,bookController.createBook)//create book
router.get('/books',mid.authentication,bookController.getBook)//get books by query
router.get('/books/:bookId',mid.authentication,bookController.getBookById)//get books by params
router.put('/books/:bookId',mid.authentication, mid.authorisation,bookController.updateBook)//update books
router.delete('/books/:bookId',mid.authentication, mid.authorisation, bookController.deleteBook)//delete book by id

router.post('/books/:bookId/review',reviewController.createReview)//create review 
router.put('/books/:bookId/review/:reviewId',reviewController.updatereview)//update review
router.delete('/books/:bookId/review/:reviewId',reviewController.deleteReview )//delete review


module.exports=router

