(function() {
	'use strict';

	angular.module("dashi3")
	.service("Sources", [
		"$resource",
		function($resource) {
			return $resource("/api/v1/sources/:sourceId", {
					sourceId: "@sourceId"
				}, {
					'get': {method: "GET"},
					'save': {method: "POST"},
					'all': {method: "GET", isArray: true},
					'remove': {method: "DELETE"}
				});
		}
	]);

})();