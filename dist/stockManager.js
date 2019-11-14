class StockManager {
    constructor() {
        this.stockData = []
    }
    async putStockInDB(input) {
        let stock = await $.get('/stock/' + input)
    }
    async getStockData(input) {
        let stock = await $.get('/stock/' + input)
        stock["ratios"] = ratioCalculator.calculateRatios(stock)
        stock["ranks"] = analyzer.analyzeStock(stock)
        this.stockData.push(stock)
    }
    async getDataFromDB() {
        let stocksData = await $.get('/stocks')
        stocksData.forEach(s => {
            const ratios = ratioCalculator.calculateRatios(s)
            s["ratios"]={...ratios}
            const ranks = analyzer.analyzeStock(s)
            s["ranks"]={...ranks}
            this.stockData.push(s)
        })
    }

    sortData(option, criteria) {
        this.stockData=this.stockData.sort(function (a, b) {
            
            const asc="Low to High"

            let keyA = a.ranks[criteria],
                keyB = b.ranks[criteria];
            if(option===asc)
            {
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            }
            else
            {
                if (keyA > keyB) return -1;
                if (keyA < keyB) return 1;
                return 0;
            }
            
        });
        console.log(this.stockData)
    }
}    
