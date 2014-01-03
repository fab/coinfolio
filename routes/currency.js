var request = require('request')

var exchangeRates = {}

function getExchangeRates () {
  var baseURL = 'http://cryptocoincharts.info/v2/api/tradingPairs'
    , currencies = ['btc', 'ltc', 'ppc']

  var reqString = currencies.map(function (currency) {
    return currency += '_usd'
  }).join(',')

  request.post(baseURL, { form: { pairs : reqString } }, function (err, response, body) {
    var responseArray = JSON.parse(body)
    responseArray.forEach(function (currencyData) {
      var currencyName = currencyData.id.substr(0, 3)
        , lastPrice = currencyData.price

      exchangeRates[currencyName] = lastPrice
    })
  })
}

exports.updateExchangeRates = function () {
  getExchangeRates()
  setInterval(getExchangeRates, 60000)
}

exports.rates = function (req, res) {
  res.send(exchangeRates)
}
