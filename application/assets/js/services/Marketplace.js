(function() {
	'use strict';

	angular.module("dashi3")
	.service("Marketplace", [
		'$resource',
		function($resource) {
			return $resource("/api/v1/marketplace", {
				
			}, {
				'index': {method: "GET", isArray: true}
			})
		}
	]);
})();
