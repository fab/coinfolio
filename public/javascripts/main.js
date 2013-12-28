var ngApp = angular.module('coinfolio', ['finance'])

ngApp.controller('MainCtrl', ['$scope', 'currencyConverter',
  function ($scope, currencyConverter) {
    $scope.wallet = {}
    currencyConverter.fetch(function (err, exchangeRates) {
      $scope.usdTo = exchangeRates
      $scope.currencies = Object.keys(exchangeRates)
      angular.forEach($scope.currencies, function (currency) {
        $scope.wallet[currency] = 0
      })
    })

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
