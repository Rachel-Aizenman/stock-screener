const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockSchema = new Schema({
    BalanceSheet:Object,
    Inocome:Object,
    Cashflow:Object
})

const stock = mongoose.model("stock", stockSchema)
module.exports = stock