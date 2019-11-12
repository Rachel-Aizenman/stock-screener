class StockManager{
    constructor(){
        this.stockData = []
    }
    async putStockInDB(stock) {
        let stock = await $.get('/stocks/'+stock)
        if (stock) {
            this.stockData.push(stock)
        }
    }
}