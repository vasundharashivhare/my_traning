const express = require('express')
const mongoose = require('mongoose')
const route = require('./route/route')

const app = express()
const port = process.env.PORT || 3000
mongoose.connect('', {
    useNewUrlParser: true
})
    .then()
    .catch()

app.use('/', route)
app.use('/*', function (req, res) {
    return res.status(400).send({ status: false, msg: 'You Are In Wrong Path' })
})

app.listen(port, function () {
    console.log('Express Running on' + port)
})