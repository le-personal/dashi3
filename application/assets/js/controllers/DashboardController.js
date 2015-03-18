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
			$scope.init = function dashboardInit(dashboardId) {
				Dashboard.get({dashboardId: dashboardId}, function(dashboard) {
					$scope.dashboard = dashboard;
					$scope.widgets = dashboard.widgets;
				});
			}

			$scope.gridsterOptions = {
				margins: [5, 5],
				columns: 7,
				isMobile: true,
				rowHeight: 300,
				draggable: {
					handle: 'header',
					stop: function(event, $element, widget) {
						$scope.$emit("widget:update", widget);
					}
				},
				resizable: {
          enabled: true,
          handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
          stop: function(event, $element, widget) {
						console.log(widget);
						$scope.$emit("widget:update", widget);
					}
        },
			};

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

			$scope.$on("widget:update", function(ev, widget) {
				var data = {
					widgetId: widget.id,
					id: widget.id,
					sizeX: widget.sizeX,
					sizeY: widget.sizeY,
					col: widget.col,
					row: widget.row
				}

				console.log(data);
				Widgets.update(data);

			});
		}
	]);
})();
