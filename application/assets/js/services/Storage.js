(function() {
	'use strict';

	angular.module("dashi3")
	.service("Storage", [
		"$resource",
		function($resource) {
			return $resource("/api/v1/storage/:storageId", {
					storageId: "@storageId"
				}, {
					'get': {method: "GET"},
					'save': {method: "POST"},
					'all': {method: "GET", isArray: true},
					'remove': {method: "DELETE"}
				});
		}
	])

	.factory("storage", [
		"$window",
		function(window) {
			var tokenService = {
        _hasToken: null,
      };

			tokenService.set = function(storageId, access_token) {
				$window.localStorage.setItem('accessToken:'+storageId, accessToken);
        this._hasToken = true;
			}

			tokenService.getToken = function () {
        return $window.localStorage.getItem('accessToken:'+storageId);
      };

			return tokenService;+
		}
	])

})();
