class StockManager {
    constructor() {
        this.stockData = []
    }
    async putStockInDB(input) {
        let stock = await $.get('/stock/' + input)
    }
    async getStockData(input) {
        let stock = await $.get('/stock/'+ input)
        stock["ratios"]=ratioCalculator.calculateRatios(stock)
        stock["ranks"]=analyzer.analyzeStock(stock)
        this.stockData.push(stock)
    }
    async getDataFromDB() {
        let stocksData = await $.get('/stocks')
        stocksData.forEach(s => {
            s["ratios"]=ratioCalculator.calculateRatios(s)
            s["ranks"]=analyzer.analyzeStock(s)
            this.stockData.push(s)
        })
    }

    async updatePrices() {
        data = await $.get('/prices')
        this.stockData.forEach(s => {
            const updatedStockData = data.find(t => t.name === s.name)
            s.price = updatedStockData.price
        })
    }
}    
