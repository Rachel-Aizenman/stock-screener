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
         
        })}
        filterData(option,criteria) {
           if(criteria==="sector"){
               this.stockData = this.stockData.filter(s=> s.sector===option)
           }
            if(criteria==="market-cap"){
                let large = 5000000000
                let medium = 2000000000
                let small = 500000000
                let micro = 0
                if(option==="Large"){
                    this.stockData = this.stockData.filter(s=>s.marketCap>large)
                }
                if(option==="Medium"){
                    this.stockData = this.stockData.filter(s=>(s.marketCap<large && s.marketCap>medium))
                }
                if(option==="Small"){
                    this.stockData = this.stockData.filter(s=>(s.marketCap<medium && s.marketCap>small))
                }
                if(option==="Micro"){
                    this.stockData = this.stockData.filter(s=>(s.marketCap<small && s.marketCap>micro))
                }
                if(option==="Medium +"){
                    this.stockData = this.stockData.filter(s=>s.marketCap>=medium)
                }
            }
        }
        
    }
   
