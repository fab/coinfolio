var ngApp = angular.module('coinfolio', ['finance'])

ngApp.controller('MainCtrl', ['$scope', 'currencyConverter',
  function ($scope, currencyConverter) {
    $scope.wallet = { btc : 0, ltc : 0 }
    $scope.usdTo = currencyConverter.usdToCryptocoin

    $scope.totalValue = function (wallet, exchangeRates) {
      var total = 0
      for (var currency in exchangeRates) {
        var rate = exchangeRates[currency]
        total += wallet[currency] * rate
      }
      return total
    }
  }
])
