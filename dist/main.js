const ratioCalculator = new RatioCalculator();
const analyzer = new StockAnalyzer();
const stocksManager = new StockManager();
const renderer = new Renderer

const handleSearch = async function () {
    let input = $("#stockSearch").val()
    $("#stockSearch").val("")
    await stocksManager.getStockData(input)
    renderer.renderData(stocksManager.stockData)
}

let input = $("#stockSearch").val()

$("#searchButton").on('click', async function () {
    handleSearch()
})

const rc = new RatioCalculator();


