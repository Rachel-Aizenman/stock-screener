class Renderer{
    renderData (stockData) {
        $("#search-input").val("") 
        $("#display-stocks").empty()
          const source = $("#stocks-template").html()
          const template = Handlebars.compile(source)
          const someHTML = template({stockData}) 
          $("#display-stocks").append(someHTML)
          console.log(JSON.stringify(stockData[0].graph))
          let s
          let ctx = $('#myChart')
          let myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
              datasets: [{ 
                data:stockData[0].graph,
                label: stockData[0].company,
                backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              fill: false
              }]  
            },
            options: {
                         title: {
      display: true,
      text: 'Stock Price (Daily)'
    },
              scales: {
              yAxes: [{
                ticks: {
                    suggestedMin: 200,
                    suggestedMax: 250
                }
            }]
        
        }
            }
          })
            
            }
            }