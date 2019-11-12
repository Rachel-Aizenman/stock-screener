function analyzeStocks(ratios) {
    // const fields=["ROE","ROI","PE","PS","PB","debtToEquity","currentRatio",]
    ranks = {}
    ratios = { "ROE": 0.07, "ROI": 0.03, "profitMargin": .12, "currentRatio": 0.8,"PE":22,"PB":1.5,"PS":3.3,"debtToEquity":0.6 }
    const ROEBins = [0, 0.05, 0.1, 0.15, 0.2]
    const strengthBins = [0, 0.4, 0.6, 0.8, 1, 1.5, 2]

    const binsObject = {}

    binsObject["ROE"] = ROEBins;
    binsObject["ROI"] = ROEBins;
    binsObject["profitMargin"] = strengthBins;
    binsObject["currentRatio"] = strengthBins;
    let fields = ["ROE", "ROI", "profitMargin", "currentRatio"]

    for (field of fields) {
        let bins = binsObject[field]
        for (index in bins)
            if (ratios[field] < bins[index]) { ranks[field] = index; break; }
    }

    //debt to eq p/e p/s p/b
    binsObject["PE"] = [50, 40, 30, 20, 15, 10, 5]
    binsObject["PB"] = [5, 4, 3, 2, 1, 0.8, 0.2]
    binsObject["PS"] = [8, 5, 3, 2, 1, 0.8, 0.2]
    binsObject["debtToEq"] = [5, 4, 3, 2, 1.5, 1, 0.7, 0.5, 0.2, 0]

    fields = ["PE", "PS", "PB", "debtToEquity"]
    for (field of fields) {
        let bins = binsObject[field]
        for (index in bins)
            if (ratios[field] <= 0) { ranks[field] = index; break; }
            else if (ratios[field] > bins[index]) { ranks[field] = index; break; }
    }


    console.log(ranks)
}