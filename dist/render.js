const stockData = [{
  balanceSheet: "balance-sheet here",
  income: "income here",
  cashFlow: "cash-flow here"
}, 
{
  balanceSheet: "2 balance-sheet here",
  income: "2 income here",
  cashFlow: "2 cash-flow here"
}, {
  balanceSheet: "3 balance-sheet here",
  income: "3 income here",
  cashFlow: "3 cash-flow here"
}]

class Renderer{
    renderData (stockData) {
        $("#search-input").val("") 
        $("#display-stocks").empty()
          const source = $("#stocks-template").html()
          const template = Handlebars.compile(source)
          const someHTML = template({stockData}) //check the format in which you recieve it
          $("#display-stocks").append(someHTML)
       }
}

const renderer = new Renderer()
 
const pageLoad = function(){
  renderer.renderData(stockData)}

pageLoad()
