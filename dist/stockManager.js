class StockManager{
    constructor(){
        this.stockData = []
    }
    async putStockInDB(stock) {
        let stock = await $.get('/stock/'+stock)
    }
    async getDataFromDB(){
        let stocksData = await $.get('/stocks')
        stocksData.forEach(s=> this.stockData.push(s)) 
    }

    
}

const rc=ratioCalculator();