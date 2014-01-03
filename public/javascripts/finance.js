angular.module('finance', [])
  .factory('currencyConverter', ['$http', function($http) {
    return {
      fetch: fetch
    }

    function fetch(callback) {
      $http.get('/rates').success(function (exchangeRates) {
        callback(null, exchangeRates)
      })
    }
  }])
