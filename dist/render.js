const DudisObj = [{
  company: "hivoub",
   price: 'jbloinli',
volume: "iyviugkj",
balanceSheet: "iyviugkj", 
jsonIncome: "iyviugkj",
cashflow: "iyviugkj",
sector: "iyviugkj",
dividend: "iyviugkj",
marketCap: "iyviugkj"
}, {
  company: "hivoub",
   price: 'jbloinli',
volume: "iyviugkj",
balanceSheet: "iyviugkj", 
jsonIncome: "iyviugkj",
cashflow: "iyviugkj",
sector: "iyviugkj",
dividend: "iyviugkj",
marketCap: "iyviugkj"
}, {
  company: "hivoub",
   price: 'jbloinli',
volume: "iyviugkj",
balanceSheet: "iyviugkj", 
jsonIncome: "iyviugkj",
cashflow: "iyviugkj",
sector: "iyviugkj",
dividend: "iyviugkj",
marketCap: "iyviugkj"
}]

class Renderer{
    renderData (stockData) {
        $("#search-input").val("") 
        $("#display-stocks").empty()
        console.log(stockData)
          const source = $("#stocks-template").html()
          const template = Handlebars.compile(source)
          const someHTML = template({stockData}) //check the format in which you recieve it
          console.log(someHTML)
          $("#display-stocks").append(someHTML)
       }
}

const renderer = new Renderer()
 
const pageLoad = function(){
  renderer.renderData(DudisObj)}

pageLoad()


// Handlebars.registerHelper('json', function(context) {
//   return JSON.stringify(context);
// });