function ratioCalculator(stock) {
    let ratios;
    const netIncome = stock.income.NetIncome
    const equity = stock.balanceSheet.StockholdersEquity
    const revenue = stock.income.Revenue
    const costOfGoods = stock.income.CostOfGoods
    const price = stock.price
    const assets = stock.balanceSheet.Assets
    const liabilities = stock.balanceSheet.Liabilities
    const grossProfit = stock.income.grossProfit
    const operationalProfit = stock.income.OperationalProfit
    const netProfit = stock.income.NetProfit
    const longTermDebt= stock.balanceSheet.LongTermDebtCurrent+ stock.balanceSheet.LongTermDebtNoncurrent 
    
    ratios[ROE] = netIncome / equity
    ratios[ROI] = (revenue - costOfGoods) / costOfGoods
    
    ratios[PE] = price / netProfit
    ratios[PB] = price / (assets - liabilities)
    ratios[PS] = price / revenue
    
    ratios[grossProfitMargin] = grossProfit / revenues
    ratios[operationalProfitMargin] = operationalProfit / revenues
    ratios[netProfitMargin] = netProfit / revenues
    
    ratios[debtToEquity]=(liabilities-equity)/equity
    ratios[LongTermDebtToEquity]=longTermDebt/equity

    return ratios;
}