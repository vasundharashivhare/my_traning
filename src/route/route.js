const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')
// const bookController=require('../controllers/bookController')
// const reviewController=require('../controllers/reviewController')


router.post('/register',userController.createUser)
// router.post('/register',bookController.createBook)
// router.post('/register',)
router.post('/login',userController.login)


module.exports=router

