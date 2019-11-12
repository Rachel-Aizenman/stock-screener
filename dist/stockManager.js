class StockManager{
    constructor(){
        this.stockData = []
    }
    async getStockData(input) {
        let stock = await $.get('/stock/'+ input)
        this.stockData.push(stock)
    }
    async getDataFromDB(){
        let stocksData = await $.get('/stocks')
        stocksData.forEach(s=> this.stockData.push(s)) 
    }
}