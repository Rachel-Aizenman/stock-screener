
class Renderer{
    renderData (stockData) {
        $("#display-stocks").empty()
          const source = $("#stocks-template").html()
          const template = Handlebars.compile(source)

          const someHTML = template({stockData}) //check the format in which you recieve it

          $("#display-stocks").append(someHTML)
       }
}

Handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});
