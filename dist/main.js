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

$("a").on('click',function(){
    const option=($(this).text())
    const criteria=$(this).data().id
    if(criteria==="leverage"||criteria==="cost"||criteria==="profitability"||criteria==="return")
        {stocksManager.sortData(option,criteria)
        renderer.renderData(stocksManager.stockData)}
})
 loadPage()




