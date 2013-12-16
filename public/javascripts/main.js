var ngApp = angular.module('coinfolio', [])

ngApp.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.wallet = { btc : 0, ltc : 0 }
    $scope.usdTo = { btc : 1014, ltc : 34 }

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
