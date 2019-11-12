const express = require('express')
const app = express()
const path = require('path')
const api = require('./routes/api')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "..", 'dist')))
app.use(express.static(path.join(__dirname, "..", 'node_modules')))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/stocksDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

app.use('/', api)


const port = 3000

app.listen(port, function() {
    console.log(`Running on port ${port}`)
})