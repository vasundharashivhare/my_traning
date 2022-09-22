const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')
const bookController=require('../controllers/bookController')
const reviewController=require('../controllers/reviewController')
const mid=require('../middleware/mid')

router.post('/register',userController.createUser)
router.post('/login',userController.login)

router.post('/books',mid.authentication,mid.authorisation,bookController.createBook)
router.get('/books',mid.authentication,bookController.getBook)
router.get('/books/:bookId',mid.authentication,bookController.getBookById)
router.put('/books/:bookId',mid.authentication, mid.authorisation,bookController.updateBook)
router.delete('/books/:bookId',mid.authentication, mid.authorisation, bookController.deleteBook)

router.post('/books/:bookId/review',reviewController.createReview)
router.put('/books/:bookId/review/:reviewId',reviewController.updatereview)
router.delete('/books/:bookId/review/:reviewId',reviewController.deleteReview )


module.exports=router

