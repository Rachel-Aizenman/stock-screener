const express = require('express')
const router = express.Router()
const Stock = require('../model/Stocks')
const requestPromise = require('request-promise')
const apikey = 'b984a472dfd64e209860a6d9ca936a85'


router.get('/stock/:Ticker', async function (req, res) {
    let ticker = req.params.Ticker
    const data=await Stock.find({"ticker":ticker});
    if(data.length!=0){
        res.end()
    }
    else{
    let balanceSheetReq = {
        url: "https://services.last10k.com/v1/company/" + ticker + "/balancesheet?formType=10-K&filingOrder=0",
        headers: {
            'Ocp-Apim-Subscription-Key': apikey
        }
    };
    let incomeReq = {
        url: "https://services.last10k.com/v1/company/" + ticker + "/income?formType=10-K&filingOrder=0",
        headers: {
            'Ocp-Apim-Subscription-Key': apikey
        }
    };
    let priceReq = {
        url: "https://services.last10k.com/v1/company/" + ticker + "/quote",
        headers: {
            'Ocp-Apim-Subscription-Key': apikey
        }
    };
    let additionalInfoReq = {
        url: "https://datahub.io/core/s-and-p-500-companies-financials/r/constituents-financials.json"
    }
    let graphReq = {
        url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts',
        qs: {
            region: 'US',
            lang: 'en',
            symbol: ticker,
            interval: '1d',
            range: '3mo'
        },
        headers: {
            'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
            'x-rapidapi-key': '58436f64b0msh35def4d22f5460ep1c0eedjsn0dc165d2a980'
        }
    };
    let priceData
    let balanceSheetData
    let incomeData
    let additionalInfoData
    let tickerData
    let graphData
    try {
        balanceSheetData = await requestPromise(balanceSheetReq)
        incomeData = await requestPromise(incomeReq)
        priceData = await requestPromise(priceReq)
        additionalInfoData = await requestPromise(additionalInfoReq)
        graphData = await requestPromise(graphReq)
        balanceSheetData = JSON.parse(balanceSheetData)
        incomeData = JSON.parse(incomeData)
        priceData = JSON.parse(priceData)
        additionalInfoData = JSON.parse(additionalInfoData)
        tickerData = additionalInfoData.find(a => a.Symbol === ticker)
        graphData = JSON.parse(graphData)
    }
    catch (err) {
        console.log(err)
    }
    let companyData = {
        ticker: ticker,
        company: balanceSheetData.Company,
        price: priceData.LastTradePrice,
        volume: priceData.Volume,
        balanceSheet: balanceSheetData.Data,
        income: incomeData.Data,
        cashFlow: {},
        balanceSheetPrev: {},
        incomePrev: {},
        sector: tickerData.Sector,
        dividend: tickerData["Dividend Yield"],
        marketCap: tickerData["Market Cap"],
        graph: graphData.chart.result[0].indicators.quote[0].open
    }
    let balanceKeys = Object.keys(companyData.balanceSheet)
    const incomeKeys = Object.keys(companyData.income)

    //cost of goods

    if (incomeKeys.findIndex(k => k === "CostOfGoods") == -1) {
        const goodsKey = incomeKeys.find(k => k.startsWith("CostOfGoods"))
        const revKey = incomeKeys.findIndex(k => k.startsWith("CostOfRevenue"))
        if (goodsKey)
            companyData.income["CostOfGoods"] = companyData.income[incomeKeys[goodsKey]]
        else if (revKey != -1)
            companyData.income["CostOfGoods"] = companyData.income[incomeKeys[revKey]]
    }

    //liabilites
    let liabilityKey
    if (balanceKeys.findIndex(k => k === "Liabilities") == -1) {
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
        companyData.income["NetIncomeLoss"] = companyData.income["ProfitLoss"]

    // revenue
    if (incomeKeys.findIndex(k => k === "Revenue") == -1) {
        const revenueKey = incomeKeys.findIndex(k => k.startsWith("Revenue"))
        const salesKey = incomeKeys.findIndex(k => k.startsWith("Sales"))
        if (revenueKey != -1)
            companyData.income["Revenue"] = companyData.income[incomeKeys[revenueKey]]
        else if (salesKey != -1)
            companyData.income["Revenue"] = companyData.income[incomeKeys[salesKey]]
    }
    console.log(companyData)
    const stock2DB = new Stock(companyData)
    await stock2DB.save()
    res.send(companyData)
    }
})

router.get('/compare/:Ticker', async function (req, res) {
    let ticker = req.params.Ticker
    let balanceSheetReq = {
        url: "https://services.last10k.com/v1/company/" + ticker + "/balancesheet?formType=10-K&filingOrder=1",
        headers: {
            'Ocp-Apim-Subscription-Key': apikey
        }
    };
    let incomeReq = {
        url: "https://services.last10k.com/v1/company/" + ticker + "/income?formType=10-K&filingOrder=1",
        headers: {
            'Ocp-Apim-Subscription-Key': apikey
        }
    };

    let balanceSheetData
    let incomeData
    try {
        balanceSheetData = await requestPromise(balanceSheetReq)
        incomeData = await requestPromise(incomeReq)
        balanceSheetData = JSON.parse(balanceSheetData)
        incomeData = JSON.parse(incomeData)
    }
    catch (err) {
        console.log(err)
    }

    let companyData = {
        balanceSheet: balanceSheetData.Data,
        income: incomeData.Data,
    }
    let balanceKeys = Object.keys(companyData.balanceSheet)
    const incomeKeys = Object.keys(companyData.income)

    //cost of goods

    if (incomeKeys.findIndex(k => k === "CostOfGoods") == -1) {
        const goodsKey = incomeKeys.find(k => k.startsWith("CostOfGoods"))
        const revKey = incomeKeys.findIndex(k => k.startsWith("CostOfRevenue"))
        if (goodsKey)
            companyData.income["CostOfGoods"] = companyData.income[incomeKeys[goodsKey]]
        else if (revKey != -1)
            companyData.income["CostOfGoods"] = companyData.income[incomeKeys[revKey]]
    }

    //liabilites
    let liabilityKey
    if (balanceKeys.findIndex(k => k === "Liabilities") == -1) {
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
        companyData.income["NetIncomeLoss"] = companyData.income["ProfitLoss"]

    // revenue
    if (incomeKeys.findIndex(k => k === "Revenue") == -1) {
        const revenueKey = incomeKeys.findIndex(k => k.startsWith("Revenue"))
        const salesKey = incomeKeys.findIndex(k => k.startsWith("Sales"))
        if (revenueKey != -1)
            companyData.income["Revenue"] = companyData.income[incomeKeys[revenueKey]]
        else if (salesKey != -1)
            companyData.income["Revenue"] = companyData.income[incomeKeys[salesKey]]
    }
    const filter={ company: balanceSheetData.Company }
    const update={balanceSheetPrev:companyData.balanceSheet,incomePrev:companyData.income}
    await Stock.findOneAndUpdate(filter,{"$set":update},{new:true})
    res.send()
})

router.get('/prices', async function (req, res) {
    let datahubReq = {
        url: "https://datahub.io/core/s-and-p-500-companies-financials/r/constituents-financials.json"
    }
    try {
        data = await requestPromise(datahubReq)
        data = JSON.parse(data)
    }
    catch (err) {
        console.log(err)
    }
    res.send(data)
})

router.get('/stocks', async function (req, res) {
    const stocks = await Stock.find({})
    res.send(stocks)
})

module.exports = router