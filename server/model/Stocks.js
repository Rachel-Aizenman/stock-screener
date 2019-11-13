const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockSchema = new Schema({
    ticker:String,
    company: String,
    price: Number,
    volume:Number,
    balanceSheet:Object,
    balanceSheetPrev:Object,
    income:Object,
    incomePrev:Object,
    cashflow:Object,
    sector: String,
    dividend: Number,
    marketCap: Number,
    graph: [Number]
})

const stock = mongoose.model("stock", stockSchema)
module.exports = stock