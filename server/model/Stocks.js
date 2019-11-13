const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockSchema = new Schema({
    company: String,
    price: Number,
    volume:Number,
    balanceSheet:Object,
    income:Object,
    cashflow:Object,
    sector: String,
    dividend: Number,
    marketCap: Number
})

const stock = mongoose.model("stock", stockSchema)
module.exports = stock