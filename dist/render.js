class Renderer {
  renderData(stockData) {
    $("#search-input").val("")
    $("#display-stocks").empty()
    const source = $("#stocks-template").html()
    const template = Handlebars.compile(source)
    const someHTML = template({ stockData })
    $("#display-stocks").append(someHTML)
    for (let i in stockData) {
      let ctx = $('#myChart-' + stockData[i].ticker)
      let maxY = Math.max(...stockData[i].graph) * 1.1
      let minY = Math.min(...stockData[i].graph) * 0.9
      let myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
          datasets: [{
            data: stockData[i].graph,
            label: stockData[i].company,
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
                suggestedMin: minY,
                suggestedMax: maxY
              }
            }]

          }
        }
      })

    }
  }
  renderComparison(significant) {
    const keys = Object.keys(significant)
    $('#report-comparison').empty()

    $('#report-comparison').append(`<div> Significant changes in comparison to last year</div>`)
    for (let key of keys) {
      $('#report-comparison').append(`<div> ${key} change of ${significant[key]}}</div>`)
    }

  }
}