(function() {
	'use strict';

	angular.module("dashi3")
	.controller("DashboardController", [
		"$scope",
		"$rootScope",
		"$modal",
		"$sails",
		'Dashboard',
		'Widgets',
		'Globals',
		function($scope, $rootScope, $modal, $sails, Dashboard, Widgets, Globals) {
			$scope.dashboard = {};
			$scope.widgets = [];
			$scope.init = function(dashboardId) {
				Dashboard.get({dashboardId: dashboardId}, function(dashboard) {
					$scope.dashboard = dashboard;
					$scope.widgets = dashboard.widgets;
				});
			}

			// add the widget to the dashboard when is created
			$rootScope.$on("dashboard:widget:new", function(ev, widget) {
				if(widget.dashboard == $scope.dashboard.id) {
					$scope.widgets.push(widget);
				}
			});

			// Remove the widget from the dashboard when is removed
			$rootScope.$on("dashboard:widget:remove", function(ev, widget) {
				if(widget.dashboard == $scope.dashboard.id) {
					// Loop to find the key where the widget to remove is equal
					// to the widget in the array $scope.widgets. if it is found, remove
					// it from the array
					angular.forEach($scope.widgets, function(element, key) {
						if(element.id == widget.id) delete $scope.widgets[key];
					});
				}
			});			
		}
	]);
})();
