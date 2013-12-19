angular.module('finance', [])
  .factory('currencyConverter', ['$http', function($http) {
    var btcUrl = 'https://api.bitcoinaverage.com/ticker/USD'
      , usdToCryptocoin = {}
    refresh()
    return {
      usdToCryptocoin: usdToCryptocoin,
      refresh: refresh
    }

    function refresh() {
      $http.get(btcUrl).success(function (res) {
        var exchangeRate = res.last
        usdToCryptocoin['btc'] = exchangeRate
        usdToCryptocoin['ltc'] = 15
      })
    }
  }])
