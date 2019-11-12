const express = require('express')
const router = express.Router()
const Stock = require('../model/Stocks')
const requestPromise = require('request-promise')



router.get('/stock/:Ticker', async function (req, res) {
    let ticker = req.params.Ticker
    let balanceSheetReq = {
        url: "https://services.last10k.com/v1/company/" + ticker + "/balancesheet?formType=10-K&filingOrder=0",
        headers: {
            'Ocp-Apim-Subscription-Key': '9d6df703d4f14735afe82789694f959e'
        }
    };
    let incomeReq = {
        url: "https://services.last10k.com/v1/company/" + ticker + "/income?formType=10-K&filingOrder=0",
        headers: {
            'Ocp-Apim-Subscription-Key': '9d6df703d4f14735afe82789694f959e'
        }
    };
    let priceReq = {
        url: "https://services.last10k.com/v1/company/" + ticker + "/quote",
        headers: {
            'Ocp-Apim-Subscription-Key': '9d6df703d4f14735afe82789694f959e'
        }
    };
    let additionalInfoReq = {
        url:"https://datahub.io/core/s-and-p-500-companies-financials/r/constituents-financials.json"}
    let priceData
    let balanceSheetData
    let incomeData
    let additionalInfoData
    let tickerData
    try {
        balanceSheetData = await requestPromise(balanceSheetReq)
        incomeData = await requestPromise(incomeReq)
        priceData = await requestPromise(priceReq)
        additionalInfoData = await requestPromise(additionalInfoReq)
        balanceSheetData  = JSON.parse(balanceSheetData)
        incomeData  = JSON.parse(incomeData)
        priceData = JSON.parse(priceData)
        additionalInfoData = JSON.parse(additionalInfoData)
        tickerData = additionalInfoData.find(a=> a.Symbol===ticker)
        console.log(tickerData)
    }
    catch (err) {
        console.log(err)
    }
    companyData = {company:balanceSheetData.Company,
                   price: priceData.LastTradePrice,
                   volume: priceData.Volume,
                   balanceSheet: balanceSheetData.Data,
                   income:incomeData.Data,
                   cashFlow:{},
                   sector:tickerData.Sector,
                   dividend:tickerData["Dividend Yield"],
                   marketCap:tickerData["Market Cap"]
                }
    const stock2DB = new Stock(companyData)
    await stock2DB.save()               
    res.send(JSON.stringify(companyData))
})

router.get('/stocks', async function (req,res){
    const stocks = await Stock.find({})
    res.send(stocks)
})

module.exports = router