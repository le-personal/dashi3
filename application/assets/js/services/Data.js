(function() {
  'use strict';

  angular.module("dashi3")
  .service("Data", [
    "$resource",
    function($resource) {
      return $resource("/api/v1/widgets/:widgetId/data/:dataId", {
        widgetId: "@widgetId",
        dataId: "@dataId"
      }, {
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
