class Renderer{
    renderData (stockData) {
        $("#search-input").val("") 
        $("#display-stocks").empty()
          const source = $("#stocks-template").html()
          const template = Handlebars.compile(source)
          const someHTML = template({stockData}) 
          $("#display-stocks").append(someHTML)
       }
}
