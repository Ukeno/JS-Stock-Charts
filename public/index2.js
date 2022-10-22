async function main() {
  const timeChartCanvas = document.querySelector('#time-chart');
  const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
  const averagePriceChartCanvas = document.querySelector('#average-price-chart');

  
  // fetch("https://api.twelvedata.com/time_series?symbol=GME, MSFT, DIS,   BNTX&interval=1min&format=JSON&apikey=0d5e3163b5f5467896ad4dece2981244")
  // .then((response) => response.json())
  // .then((data) => console.log(data));

  const { GME, MSFT, DIS, BNTX } = mockData;
  const stocks = [GME, MSFT, DIS, BNTX];
  //console.log(Chart)

  function getColor(stock) {
    if (stock === "GME") {
      return 'rgba(61, 161, 61, 0.7)'
    }
    if (stock === "MSFT") {
      return 'rgba(209, 4, 25, 0.7)'
    }
    if (stock === "DIS") {
      return 'rgba(18, 4, 209, 0.7)'
    }
    if (stock === "BNTX") {
      return 'rgba(166, 43, 158, 0.7)'
    }
  }

  stocks.forEach(stock => stock.values.reverse())

  // Time Chart
  new Chart(timeChartCanvas.getContext('2d'), {
    type: 'line',
    data: {
      labels: stocks[0].values.map(value => value.datetime),
      datasets: stocks.map(stock => ({
        label: stock.meta.symbol,
        data: stock.values.map(value => parseFloat(value.high)),
        backgroundColor: getColor(stock.meta.symbol),
        borderColor: getColor(stock.meta.symbol),
      }))
    }
  });
  // Displays datetime:"" open:""
  console.log(stocks[0].values)
  
  // High Chart
  new Chart(highestPriceChartCanvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: [GME, MSFT, DIS, BNTX],
      datasets: stocks.map(stock => ({
        label: 'Highest',
        data: [345,260,160,250],
        backgroundColor: getColor(stock.meta.symbol),
        borderColor: getColor(stock.meta.symbol),
      }))
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })

  // Average Chart
  new Chart(averagePriceChartCanvas.getContext('2d'), {
    type: 'pie',
    data: {
      labels: stocks[0].values.map(value => value.close),
      datasets: stocks.map(stock => ({
        label: stock.meta.symbol,
        data: stock.values.map(value => parseFloat(value.high)),
        backgroundColor: getColor(stock.meta.symbol),
        borderColor: getColor(stock.meta.symbol),
      }))
    }
  });
}

main()


  