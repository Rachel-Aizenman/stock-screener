

const ratioCalculator= new RatioCalculator();
const analyzer=new StockAnalyzer();
const stocksManager = new StockManager
const renderer = new Renderer

const handleSearch = async function(){
    let input = $("#search-input").val()
    $("#search-input").val("") 
    await stocksManager.getStockData(input)
    renderer.renderData(stocksManager.stockData)
}

$("#search").on("click",async function () {
    await handleSearch()
})

const rc= new RatioCalculator();

