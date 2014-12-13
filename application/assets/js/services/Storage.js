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
	]);

})();