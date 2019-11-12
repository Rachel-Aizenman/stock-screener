const stockData = {
  balanceSheet: "balance-sheet here",
  income: "income here",
  cashFlow: "cash-flow here",
}
console.log(stockData)
class Renderer{
    renderData (stockData) {
        $("#search-input").val("") 
        $("#display-stocks").empty()
          const source = $("#stocks-template").html()
          const template = Handlebars.compile(source)
          const someHTML = template(stockData) //check the format in which you recieve it
         console.log(someHTML)
          $("#display-stocks").append(someHTML)
       }
}

const renderer = new Renderer()
 
const pageLoad = function(){
  renderer.renderData(stockData)}

pageLoad()
