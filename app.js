
/**
 * Module dependencies.
 */

var express = require('express')
var routes = require('./routes')
var user = require('./routes/user')
var http = require('http')
var path = require('path')
var ejs  = require('ejs')
var request = require('request')

var app = express()

var exchangeRates = {}

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('html', ejs.renderFile)
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler())
}

app.get('/', routes.index)
app.get('/users', user.list)
app.get('/rates', function(req, res) {
  res.send(exchangeRates)
})

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

getExchangeRates()
setInterval(getExchangeRates, 60000)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})
