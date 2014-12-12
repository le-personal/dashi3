(function() {
	'use strict';

	angular.module("dashi3")
	.controller("DashboardController", [
		"$scope",
		"$modal",
		"$sails",
		'Dashboard',
		'Widgets',
		function($scope, $modal, $sails, Dashboard, Widgets) {
			$scope.dashboard = {};
			$scope.widgets = [];
			$scope.init = function(dashboardId) {
				Dashboard.get({dashboardId: dashboardId}, function(dashboard) {
					$scope.dashboard = dashboard;
					$scope.widgets = dashboard.widgets;
				});
			}

			// a new widget is created
			io.socket.on("widgets", function(data) {
				console.log("Fired");
				console.log(data);
			});
		}
	]);
})();
