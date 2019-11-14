const ratioCalculator = new RatioCalculator();
const analyzer = new StockAnalyzer();
const stocksManager = new StockManager();
const renderer = new Renderer
const reportComparer=new ReportComparer();
const rc = new RatioCalculator();

const handleSearch = async function(){
    let input = $("#stockSearch").val()
    $("#stockSearch").val("") 
    await stocksManager.getStockData(input)
    renderer.renderData(stocksManager.stockData)
}
const loadPage = async function  () {
    await stocksManager.getDataFromDB()
    renderer.renderData(stocksManager.stockData)
}

$("#button").on("click",async function () {
    await handleSearch()
})
$("body").on("click","#compare",async function () {
    let companyName = $(this).siblings(".feature").text()
    let stock = stocksManager.stockData.find(s=> s.company === companyName)
    let compared = reportComparer.compareReports(stock)
    console.log(compared)
})
 loadPage()




