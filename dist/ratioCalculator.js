class RatioCalculator {
    constructor(){
        this.ratios={}
    }
    calculateRatios(stock) {

        const equity = stock.balanceSheet.StockholdersEquity
        const revenue = stock.income.Revenue 
        const costOfGoods = stock.income.CostOfGoods || 0
        const marketCap = stock.marketCap
        const assets = stock.balanceSheet.Assets
        const liabilities = stock.balanceSheet.Liabilities
        const longTermDebt = (stock.balanceSheet.LongTermDebtCurrent + stock.balanceSheet.LongTermDebtNoncurrent) ||0 

        const grossIncome = revenue-costOfGoods // if exists
        const operatingIncome = stock.income.OperatingIncomeLoss // if exists
        const netIncome = stock.income.NetIncomeLoss

        this.ratios["ROE"] = netIncome / equity || 0
        this.ratios["ROI"] = (revenue - costOfGoods) / costOfGoods || 0

        this.ratios["PE"] = marketCap / netIncome
        this.ratios["PB"] = marketCap / (assets - liabilities)
        this.ratios["PS"] = marketCap / revenue

        this.ratios["grossMargin"] = grossIncome / revenue || null
        this.ratios["operatingMargin"] = operatingIncome / revenue || null
        this.ratios["profitMargin"] = netIncome / revenue ||null

        this.ratios["debtToEquity"] = (liabilities - equity) / equity
        this.ratios["LongTermDebtToEquity"] = longTermDebt / equity

        const ratioKeys = Object.keys(this.ratios);
        for (let ratio of ratioKeys)
            if (this.ratios[ratio] < 0)
                this.ratios[ratio] = 0;
            else
                this.ratios[ratio]=Math.round(this.ratios[ratio]*1000)/1000

        return this.ratios;
    }
}


