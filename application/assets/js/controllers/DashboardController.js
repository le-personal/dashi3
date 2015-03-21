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
			$scope.widgets = {};

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
          handles: ['s', 'w', 'se', 'sw'],
          stop: function(event, $element, widget) {
						$scope.$emit("widget:update", widget);
					}
        },
			};

			// Update the dashboard using events to avoid async problems
			$rootScope.$on("dashboard:update", function(ev, dashboard) {
				$scope.dashboard = dashboard;

				// We do this to subscribe to the model Widgets
				// When we konw which dashboard is this, get the widgets
				io.socket.get("/api/v1/dashboard/"+ $scope.dashboard.id +"/widgets", function(data) {
					$scope.widgets = data;
				});
			});

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

				Widgets.update(data);
			});

			// when there is a change on the server, refresh the dashboard by emmitting
			// a new event, this is safer than changing just the changed widget because
			// it might affected others
			io.socket.on("widgets", function(data) {
				// Update the dashboard if a widget changed
				$rootScope.$emit("dashboard:update", $scope.dashboard);
			});
		}
	]);
})();
