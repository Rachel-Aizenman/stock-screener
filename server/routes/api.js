const express = require('express')
const router = express.Router()
const request = require('request')
const stock = require('../model/Stocks')
const requestPromise = require('request-promise')
const mongoose = require('mongoose')

router.get('/stock/:ticker', async function (req, res) {
    res.append('Ocp-Apim-Subscription-Key', '9d6df703d4f14735afe82789694f959e')
    const requestedStock = req.params.ticker
    try { DATA = await requestPromise("https://services.last10k.com/v1/company/AAPL/balancesheet")}
    catch (err) {
        return
    }
})