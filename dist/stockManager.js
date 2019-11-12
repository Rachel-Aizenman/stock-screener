class StockManager {
    constructor(){
        this.stockData = []
    }
    async putStockInDB(input) {
        let stock = await $.get('/stock/'+input)
    }
    async getDataFromDB(){
        let stocksData = await $.get('/stocks')
        stocksData.forEach(s=> {this.stockData.push(s); rc.calculateRatios(s);}) 
    }


    
}
