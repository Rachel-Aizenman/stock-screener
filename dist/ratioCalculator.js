class RatioCalculator {
    constructor(){
        this.ratios={}
    }
    calculateRatios(stock) {
        // console.log("hi")
        
        const equity = stock.balanceSheet.StockholdersEquity
        // console.log("bonsoir")
        const revenue = stock.income.Revenue
        const costOfGoods = stock.income.CostOfGoods
        const price = stock.price
        const assets = stock.balanceSheet.Assets
        const liabilities = stock.balanceSheet.Liabilities
        const longTermDebt = stock.balanceSheet.LongTermDebtCurrent + stock.balanceSheet.LongTermDebtNoncurrent

        const grossProfit = stock.income.grossProfit // if exists
        const operationalProfit = stock.income.OperationalProfit // if exists
        const netIncome = stock.income.NetIncomeLoss

        // console.log("bonjour")
        this.ratios["ROE"] = netIncome / equity || 0
        this.ratios["ROI"] = (revenue - costOfGoods) / costOfGoods || 0

        this.ratios["PE"] = price / netIncome
        this.ratios["PB"] = price / (assets - liabilities)
        this.ratios["PS"] = price / revenue

        this.ratios["grossProfitMargin"] = grossProfit / revenue || null
        this.ratios["operationalProfitMargin"] = operationalProfit / revenue || null
        this.ratios["netIncomeMargin"] = netIncome / revenue

        this.ratios["debtToEquity"] = (liabilities - equity) / equity
        this.ratios["LongTermDebtToEquity"] = longTermDebt / equity

        const ratioKeys = Object.keys(this.ratios);
        for (let ratio of ratioKeys)
            if (this.ratios[ratio] < 0)
                this.ratios[ratio] = 0;

        console.log(this.ratios)
        return this.ratios;
    }
}


