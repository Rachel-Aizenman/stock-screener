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
    await stocksManager.updatePrices()
    renderer.renderData(stocksManager.stockData)
}

$("#button").on("click",async function () {
    await handleSearch()
})


$("body").on("click","#compare",async function () {
    let companyName = $(this).siblings(".feature").text()
    const data=await stocksManager.compareReports(companyName)
    renderer.renderComparison(data)
})
$("#update").on("click",async function () {
    await stocksManager.updatePrices()
    renderer.renderData(stocksManager.stockData)
})
$("a").on('click',function(){
    const option=($(this).text())
    const criteria=$(this).data().id
    if(criteria==="leverage"||criteria==="cost"||criteria==="profitability"||criteria==="return"){
        stocksManager.sortData(option,criteria)
        renderer.renderData(stocksManager.stockData)
    }
    if(criteria==="sector"||criteria==="market-cap"){
        stocksManager.filterData(option,criteria)
        renderer.renderData(stocksManager.stockData)
    }
})
loadPage()
