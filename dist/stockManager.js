class StockManager {
    constructor() {
        this.stockData = []
    }
    async putStockInDB(input) {
        let stock = await $.get('/stock/' + input)
    }
    async getStockData(input) {
        let stock = await $.get('/stock/' + input)
        this.stockData.push(stock)
    }
    async getDataFromDB() {
        let stocksData = await $.get('/stocks')
        stocksData.forEach(s => {
            this.stockData.push(s)
            s["ratios"] = ratioCalculator.calculateRatios(s)
            s["ranks"] = analyzer.analyzeStock(s)
            console.log(s)
        })
    }

    async updatePrices() {
        data = await $.get('/prices')
        // not the most efficient solution. can be more efficient with sorting...
        this.stockData.forEach(s => {
            const updatedStockData = data.find(t => t.name === s.name)
            s.price = updatedStockData.price
        })
    }

}
