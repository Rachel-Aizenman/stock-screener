class ReportComparer {
    constructor() {
        this.comparison = {}
        this.significants = {}
    }

    compareReports(stock) {
        
        compareFields(stock.balanceSheet, stock.balanceSheetPrev)
        compareFields(stock.income, stock.incomePrev)
        
        let keys = Obejct.keys(this.comparison)
        keys.forEach(k => {
            if (this.comparison[key] >= 1.1 || this.comparison[key] <= 0.9)
                this.significants[key] = comparison[key]
        })

        return this.significants

    }

    compareFields(currentReport, prevReport) {
        let current
        let previous
        let keys = Obejct.keys(currentReport)

        for (key of keys) {
            current = currentReport[key]
            previous = prevReport[key]
            if (previous && previous != 0)
                this.comparison[key] = current / previous
        }

    }
}