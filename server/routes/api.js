const express = require('express')
const router = express.Router()
const request = require('request')
const stock = require('../model/Stocks')
const requestPromise = require('request-promise')
const mongoose = require('mongoose')


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
    let balanceSheetData
    let incomeData
    try {
        balanceSheetData = await requestPromise(balanceSheetReq)
        incomeData = await requestPromise(incomeReq)
        balanceSheetData  = JSON.parse(balanceSheetData)
        incomeData  = JSON.parse(incomeData)
    }
    catch (err) {
        console.log(err)
    }
    companyData = {company:balanceSheetData.Company,
                   balanceSheetData: balanceSheetData.Data,
                   incomeData:incomeData.Data}
    res.send(JSON.stringify(companyData))
})

module.exports = router