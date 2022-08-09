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

router.get('/student-record', function (req, res) {
    
    res.send('My second ever api!')
});
//first problem 
router.get('/get-movies',function(req, res){ 
    let movies1= ["shole ","Rang de basanti","dil mange more","tiranga"]
    res.send(movies1)
})


// second 
router.get('/get-movie/:indexNumber',function(req, res){ 
    
    let movies=['rang de basanti','The shining','Lord of the rings','batman begins']
    let index = req.params.indexNumber;
    console.log(movies[index])
     res.send(movies[index])
})

//Third wala solution 
router.get('/get-moviess/:indexNumber',function(req, res){ 
    
    let moviesName=['rang de basanti','The shining','Lord of the rings','batman begins']
    let index = req.params.indexNumber;

     if(index > moviesName.length){
        return res.send("use a valid index  ")
     }else{
    
     res.send(moviesName[index])
     }
})

//forth 
router.get('/get-/films',function(req, res){   

    let moviesName=[ {"id": 1,"name": "The Shining"}, 
 {"id": 2,"name": "Incendies"}, 
 {"id": 3,"name": "Rang de Basanti"},
  {"id": 4,"name": "Finding Nemo"}]
    res.send(moviesName)
})


// 5 problam
router.get('/get-/films/:indexNumber',function(req, res){ //student detail api he    

    let moviesName=[ {"id": 1,"name": "The Shining"}, 
 {"id": 2,"name": "Incendies"}, 
 {"id": 3,"name": "Rang de Basanti"},
  {"id": 4,"name": "Finding Nemo"}]
    let index = req.params.indexNumber;
     if(index > moviesName.length){
        return res.send("no movie exist with this id ")
     }else{
     res.send(moviesName[index])
     }
})





router.get('/test-you', function(req, res){
    
    res.send('This is the second routes implementation')
})
  

router.get('/test-me', function(req, res){
    
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
