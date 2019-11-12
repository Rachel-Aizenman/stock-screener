function dataCleaner(stock) {

    let balanceKeys = Object.keys(stock.balanceSheet)
    const incomeKeys = Object.keys(stock.income)

    //cost of goods
    if (incomeKeys.findIndex(k => k === "CostOfGoods")) {
        const goodsKey = incomeKeys.find(k => k.startsWith("CostOfGoods"))
        if (goodsKey)
            stock.income["CostOfGoods"] = stock.income[goodsKey]
    }

    //liabilites
    if (balanceKeys.findIndex(k => k === "Liabilities") == -1)
        const liabilityKey = balanceKeys.find(k => k.startsWith("Liabilities"))
    stock.balanceSheet["Liabilities"] = stock.balanceSheet[liabilityKey]

    // stockholder field
    const equityKey = balanceKeys.find(k => k.startsWith("StockholderEquity"))
    if (equityKey)
        stock.balanceSheet["StockholdersEquity"] = stock.balanceSheet[equityKey]

    else {
        balanceKeys = Object.keys(stock.balanceSheet)
        if (balanceKeys.findIndex(k => k === "StockholderEquity") == -1
            && balanceKeys.findIndex(k => k === "Liabilities") != -1
            && balanceKeys.findIndex(k => k === "LiabilitiesAndStockholdersEquity") != -1)
            stock.balanceSheet["StockholdersEquity"] = stock.balanceSheet["LiabilitiesAndStockholdersEquity"] - stock.balanceSheet["Liabilities"]
    }

    // net income
    if(incomeKeys.findIndex(k=>k==="NetIncomeLoss")==-1)
            stock.income["NetIncomeLoss"]=stock.income["profitLoss"]






}