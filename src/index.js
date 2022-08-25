const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();
const moment = require("moment")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://1729ankit:MSfnlOw77aSsseHm@cluster0.g9nthlr.mongodb.net/middleware-1", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use (
    function (req, res, next) {
        console.log ("inside GLOBAL MW");
        // const date=new Date();
        const date = moment().format("DD-MM-YYYY,hh:mm:ss")
        const ip = req.ip
        const r=req.originalUrl
        console.log(date,",",",",ip,r)
        next();
  }
  );
  

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});