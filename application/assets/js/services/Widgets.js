(function() {
	'use strict';

	angular.module("dashi3")
	.service("Widgets", [
		'$resource',
		function($resource) {
			return $resource("/api/v1/widgets/:widgetId", {
				widgetId: "@widgetId"
			}, {
				'get': {method: "GET"},
				'save': {method: "POST"},
				'update': {method: "PUT"},
				'all': {method: "GET", isArray: true},
				'remove': {method: "DELETE"},
				'query': {method: "GET", isArray: true}
			})
		}
	]);
})();
