(function() {
	'use strict';

	angular.module("dashi3")
	.controller("DashboardController", [
		"$scope",
		"$modal",
		'Dashboard',
		'Widgets',
		function($scope, $modal, Dashboard, Widgets) {
			$scope.dashboard = {};
			$scope.init = function(dashboardId) {
				$scope.dashboard = Dashboard.get({dashboardId: dashboardId});
			}
		}
	]);
})();
