function ratioCalculator(stock) {
    let ratios;
    const equity = stock.balanceSheet.StockholdersEquity
    const revenue = stock.income.Revenue
    const costOfGoods = stock.income.CostOfGoods
    const price = stock.price
    const assets = stock.balanceSheet.Assets
    const liabilities = stock.balanceSheet.Liabilities
    const longTermDebt = stock.balanceSheet.LongTermDebtCurrent + stock.balanceSheet.LongTermDebtNoncurrent

    const grossProfit = stock.income.grossProfit // if exists
    const operationalProfit = stock.income.OperationalProfit // if exists
    const netIncome = stock.income.NetIncome 
    
    
    ratios[ROE] = netIncome / equity
    ratios[ROI] = (revenue - costOfGoods) / costOfGoods

    ratios[PE] = price / netIncome
    ratios[PB] = price / (assets - liabilities)
    ratios[PS] = price / revenue

    ratios[grossProfitMargin] = grossProfit / revenues
    ratios[operationalProfitMargin] = operationalProfit / revenues
    ratios[netIncomeMargin] = netIncome / revenues

    ratios[debtToEquity] = (liabilities - equity) / equity
    ratios[LongTermDebtToEquity] = longTermDebt / equity

    const ratioKeys = Object.keys(ratios);
    for (ratio of ratioKeys)
        if (ratios[ratio] < 0)
            ratios[ratio] = 0;
    return ratios;
}