(function() {
	'use strict';

	angular.module("dashi3")
	.service("Dashboard", [
		"$resource",
		function($resource) {
			return $resource("/api/v1/dashboard/:dashboardId", {
					dashboardId: "@dashboardId"
				}, {
					'get': {method: "GET"},
					'save': {method: "POST"},
					'all': {method: "GET", isArray: true},
					'remove': {method: "DELETE"}
				});
		}
	]);

})();