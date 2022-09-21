const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')
 const bookController=require('../controllers/bookController')
// const reviewController=require('../controllers/reviewController')


router.post('/register',userController.createUser)
router.post('/login',userController.login)
router.post('/books',bookController.createBook)
router.get('/books',bookController.getBook)
router.get('/books/:bookId',bookController.getBookById)
// router.put('/books/:bookId',bookController.putBookById)

// router.post('/register',)



module.exports=router

