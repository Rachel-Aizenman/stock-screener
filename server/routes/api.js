const express = require('express')
const router = express.Router()
const Stock = require('../model/Stocks')
const requestPromise = require('request-promise')



router.get('/stock/:Ticker', async function (req, res) {
    let ticker = req.params.Ticker
    let balanceSheetReq = {
        url: "https://services.last10k.com/v1/company/" + ticker + "/balancesheet?formType=10-K&filingOrder=0",
        headers: {
            'Ocp-Apim-Subscription-Key': 'dafaeb91196a4819aa31f0ea73f48c54'
        }
    };
    let incomeReq = {
        url: "https://services.last10k.com/v1/company/" + ticker + "/income?formType=10-K&filingOrder=0",
        headers: {
            'Ocp-Apim-Subscription-Key': 'dafaeb91196a4819aa31f0ea73f48c54'
        }
    };
    let priceReq = {
        url: "https://services.last10k.com/v1/company/" + ticker + "/quote",
        headers: {
            'Ocp-Apim-Subscription-Key': 'dafaeb91196a4819aa31f0ea73f48c54'
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
    let balanceKeys = Object.keys(companyData.balanceSheet)
    const incomeKeys = Object.keys(companyData.income)

    //cost of goods
    if (incomeKeys.findIndex(k => k === "CostOfGoods")) {
        const goodsKey = incomeKeys.find(k => k.startsWith("CostOfGoods"))
        if (goodsKey)
            companyData.income["CostOfGoods"] = companyData.income[goodsKey]
    }

    //liabilites
    let liabilityKey
    if (balanceKeys.findIndex(k => k === "Liabilities") == -1)
    {
        liabilityKey = balanceKeys.find(k => k.startsWith("Liabilities"))
        companyData.balanceSheet["Liabilities"] = companyData.balanceSheet[liabilityKey]
    }    
    

    // stockholder field
    const equityKey = balanceKeys.find(k => k.startsWith("StockholderEquity"))
    if (equityKey)
        companyData.balanceSheet["StockholdersEquity"] = companyData.balanceSheet[equityKey]

    else {
        balanceKeys = Object.keys(companyData.balanceSheet)
        if (balanceKeys.findIndex(k => k === "StockholderEquity") == -1
            && balanceKeys.findIndex(k => k === "Liabilities") != -1
            && balanceKeys.findIndex(k => k === "LiabilitiesAndStockholdersEquity") != -1)
            companyData.balanceSheet["StockholdersEquity"] = companyData.balanceSheet["LiabilitiesAndStockholdersEquity"] - companyData.balanceSheet["Liabilities"]
    }

    // net income
    if (incomeKeys.findIndex(k => k === "NetIncomeLoss") == -1)
        companyData.income["NetIncomeLoss"] = companyData.income["profitLoss"]

    const stock2DB = new Stock(companyData)
    await stock2DB.save()
    res.send(companyData)
})

router.get('/stocks', async function (req,res){
    const stocks = await Stock.find({})
    res.send(stocks)
})

module.exports = router