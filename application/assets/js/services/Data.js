(function() {
  'use strict';

  angular.module("dashi3")
  .service("Data", [
    "$resource",
    function($resource) {
      return $resource("/api/v1/data/:dataset", {
        dataset: "@dataset"
      }, {
        index: {
          method: "GET",
          isArray: true,
          params: {
            query: "@query",
            access_token: "@access_token"
          }
        },
        get: {
          method: "GET",
          isArray: true,
          params: {
            access_token: "@access_token"
          }
        },
        save: {
          method: "POST",
          isArray: false,
          params: {
            access_token: "@access_token"
          }
        }
      })
    }
  ])

  angular.module("dashi3")
  .service("Datasets", [
    "$http",
    function($http) {
      return {
        get: function(query) {
          return $http.get("/api/v1/data", {
            params: {
              query: query
            }
          }).then(function(response) {
            return response.data.map(function(item) {
              return item.dataset;
            });
          });
        }
      }
    }
  ]);

  // .factory("storage", [
	// 	"$window",
	// 	function(window) {
	// 		var tokenService = {
  //       _hasToken: null,
  //     };
  //
	// 		tokenService.set = function(widgetId, access_token) {
	// 			// $window.localStorage.setItem('accessToken:'+widgetId, accessToken);
  //       this._hasToken = true;
	// 		}
  //
	// 		tokenService.getToken = function () {
  //       // return $window.localStorage.getItem('accessToken:'+widgetId);
  //     };
  //
	// 		return tokenService;
	// 	}
	// ]);

})();
