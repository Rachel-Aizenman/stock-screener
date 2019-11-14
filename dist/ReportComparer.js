class ReportComparer {
    constructor() {
        this.comparison = {}
        this.significants = {}
    }

    compareReports(stock) {
        
        this.compareFields(stock.balanceSheet, stock.balanceSheetPrev)
        this.compareFields(stock.income, stock.incomePrev)
        console.log(this.comparison)
        let keys = Object.keys(this.comparison)
        keys.forEach(key => {
            if (this.comparison[key] >= 1.1 || this.comparison[key] <= 0.9)
                this.significants[key] = this.comparison[key]
        })
        console.log(this.significants)
        return this.significants

    }

    compareFields(currentReport, prevReport) {
        let current
        let previous
        let keys = Object.keys(currentReport)

        for (let key of keys) {
            current = currentReport[key]
            if(prevReport !== undefined){
               previous = prevReport[key]
            }
            if (previous && previous != 0)
                this.comparison[key] = current / previous
        }

    }
}