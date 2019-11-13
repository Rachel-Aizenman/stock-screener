// const stockManager = new stockManager()
// const renderer = new Renderer()

const handleSearch = function(){
    const ticker = $('input').val()
    getStockData(ticker)
}

$('#stockSearch').keypress(function (e) {
    const keyCode = e.keyCode || e.which;
    console.log(keyCode)

    if (keyCode == 13) {
        console.log('keypress worked!')
    handleSearch()
}})

// const handleFilter = function(){
// const //version 2 stuff    
// }

$('#filter').on('click', function(){
    handleFilter()
})