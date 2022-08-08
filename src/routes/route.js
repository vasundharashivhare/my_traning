const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();
const av =require('../logger/logger')
const abcd =require('../utill/helper')
const abce =require('../validator/formatter')


router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    av.Welcome()
    abcd.printDate()
    abcd.printMonth()
    abcd.BatchInfo()
    abce.namelowercase()
    abce.uppercase()
    abce.trim()
    res.send('My second ever api!')
});




router.get('/test-you', function(req, res){
    
    res.send('This is the second routes implementation')
})
  

router.get('/test-me', function(req, res){
    
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
