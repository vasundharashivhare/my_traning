const express = require('express');
const router = express.Router();

router.get('/students/:name', function(req, res) {
    let studentName = req.params.name
    console.log(studentName)
    res.send(studentName)
})

router.get("/random" , function(req, res) {
    res.send("hi there")
})


router.get("/test-api" , function(req, res) {
    res.send("hi FunctionUp")
})


router.get("/test-api-2" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API")
})


router.get("/test-api-3" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's ")
})


router.get("/test-api-4" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})



router.get("/test-api-5" , function(req, res) {
    res.send("hi FunctionUp5. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})

router.get("/test-api-6" , function(req, res) {
    res.send({a:56, b: 45})
})

router.post("/test-post", function(req, res) {
    res.send([ 23, 45 , 6])
})


router.post("/test-post-2", function(req, res) {
    res.send(  { msg: "hi" , status: true }  )
})

router.post("/test-post-3", function(req, res) {
    // let id = req.body.user
    // let pwd= req.body.password

    // console.log( id , pwd)

    console.log( req.body )

    res.send(  { msg: "hi" , status: true }  )
})



router.post("/test-post-4", function(req, res) {
    let arr= [ 12, "functionup"]
    let ele= req.body.element
    arr.push(ele)
    res.send(  { msg: arr , status: true }  )
})


   
//      let players = [ ]

    

//     router.post('/players', function (req, res) {
//     let newPlayer = req.body
//     let newPlayersName = newPlayer.name
//     let isNameRepeated = false

//     //let player = players.find(p => p.name == newPlayersName)

//     for(let i = 0; i < players.length; i++) {
//         if(players[i].name == newPlayersName) {
//             isNameRepeated = true;
//             break;
//         }
//     }

//     //undefined is same as false/ a falsy value
//     if (isNameRepeated) {
//         //Player exists
//         res.send("This player was already added!")
//     } else {
//         //New entry
//         players.push(newPlayer)
//         res.send(players)
//     }
// });



let players =
  [
    {
      "name": "manish",
      "dob": "1/1/1995",
      "gender": "male",
      "city": "jalandhar",
      "sports": [
        "swimming"
      ]
    },
    {
      "name": "gopal",
      "dob": "1/09/1995",
      "gender": "male",
      "city": "delhi",
      "sports": [
        "soccer"
      ],
    },
    {
      "name": "lokesh",
      "dob": "1/1/1990",
      "gender": "male",
      "city": "mumbai",
      "sports": [
        "soccer"
      ],
    } 
  ]

  router.post('/players1', function (req, res) {
    //LOGIC WILL COME HERE
    let newplayer = req.body
    let n = newplayer.name
  
    for (i = 0; i < players.length; i++) {
      if (players[i].name == n) {
        return res.send("Sorry, This name is already exist!")
      }
    }
    players.push(newplayer)
    res.send({players})
  
  });


let person = [

    {
        name:"vasu",
        age:2,
        votingStatus:false
        
    },
    {
        name:"prince",
        age:26,
        votingStatus:false
        
    },
    {
        name:"mahak",
        age:50,
        votingStatus:false
        
    },
    
]

router.post("/getvotingstatus", function(req, res) {
    let VotingAge = req.query.age
    let Elegibleperson =[]
    for(let i=0; i< person.length;i++ )
    {
        if(person[i].age >VotingAge){
            Elegibleperson.push(person[i])
            person[i].votingStatus=true;

        }
    }
    res.send({person:Elegibleperson,status:true})

})


        router.post('/players', function (req, res) {
        let newPlayerPost=req.body
        let newplayerName=newPlayerPost.name
        isNameRepeatedInPost=false//set flag bydafalut value which is false
        for(i=0;i<players.length;i++){
            if(players[i].name==newplayerName){
            isNameRepeatedInPost=true//set flag true if above condition true
            break;//if not condition true break the loop
            }
        }
            if(isNameRepeatedInPost){
      res.send("this player name is already exit")
            }
            else{
                players.push(newplayerName)
                res.send(players)
            }
        
        res.send(  { data: players , status: true }  )
    })

    router.post("/wikipedia/queryPrarams",function(req,res){
let countryValue=req.query
res.send({countryValue,status:true})

    })
    router.get("/queryPrarams-2",function(req,res){
    let marks=req.query.marks
    let result=marks>40?"pass":"fail"
    res.send({data:result,status:true})
    })
module.exports = router;
