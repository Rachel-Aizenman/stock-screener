class StockAnalyzer {
    constructor() {
        this.ranks = {}
    }
    analyzeStock(stock) {
        const binsObject = {}
        const ROEBins = [0, 0.05, 0.1, 0.15, 0.2]
        const strengthBins = [0, 0.4, 0.6, 0.8, 1, 1.5, 2]
        binsObject["ROE"] = ROEBins;
        binsObject["ROI"] = ROEBins;
        binsObject["profitMargin"] = ROEBins;
        binsObject["currentRatio"] = strengthBins;
        binsObject["PE"] = [50, 40, 30, 20, 15, 10, 5]
        binsObject["PB"] = [5, 4, 3, 2, 1, 0.8, 0.2]
        binsObject["PS"] = [8, 5, 3, 2, 1, 0.8, 0.2]
        binsObject["debtToEquity"] = [5, 4, 3, 2, 1.5, 1, 0.7, 0.5, 0.2, 0]
        const ratios = stock.ratios

        let fields = ["ROE", "ROI", "profitMargin", "currentRatio"]

        for (let field of fields) {
            let bins = binsObject[field]
            for (let index in bins)
                if (ratios[field] < bins[index]) { this.ranks[field] = index; break; }
            if (ratios[field]>=bins[bins.length-1])
                this.ranks[field] = bins.length
        }

        //debt to eq p/e p/s p/b
        fields = ["PE", "PS", "PB", "debtToEquity"]
        for (let field of fields) {
            let bins = binsObject[field]
            for (let index in bins)
                if (ratios[field] <= 0) { this.ranks[field] = index; break; }
                else if (ratios[field] > bins[index]) { this.ranks[field] = index; break; }
            if (ratios[field]<=bins[bins.length-1] && !ratios[field] <= 0)
                this.ranks[field] = bins.length
        }
        //final ranking
        if (ratios["ROI"] == 0) // return
            this.ranks["return"] = parseInt(this.ranks["ROE"])
        else
            this.ranks["return"] = (0.75 * parseInt(this.ranks["ROE"]) + 0.25 * parseInt(this.ranks["ROI"]))

        if (this.ranks["PS"]) // cost
            this.ranks["cost"] = 0.5 * parseInt(this.ranks["PE"]) + 0.25 * parseInt(this.ranks["PB"]) + 0.25 * parseInt(this.ranks["PS"])
        else
            this.ranks["cost"] = 0.5 * parseInt(this.ranks["PE"]) + 0.5 * parseInt(this.ranks["PB"])

        this.ranks["profitability"] = parseInt(this.ranks["profitMargin"])
        this.ranks["leverage"] = parseInt(this.ranks["debtToEquity"])
        return this.ranks
    }
}