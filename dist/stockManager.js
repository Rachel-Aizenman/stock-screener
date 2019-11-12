class StockManager {
    constructor() {
        this.stockData = []
    }
    async putStockInDB(input) {
        let stock = await $.get('/stock/' + input)
    }
    async getDataFromDB() {
        let stocksData = await $.get('/stocks')
        stocksData.forEach(s => {
            this.stockData.push(s)
            s["ratios"]=ratioCalculator.calculateRatios(s)
            s["ranks"]=analyzer.analyzeStock(s)
            console.log(s)
        })
    }



}
