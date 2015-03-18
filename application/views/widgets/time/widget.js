(function() {
	'use strict';

	angular.module("dashi3")
	.controller("WidgetTimeController", [
		"$scope",
		"$rootScope",
		"$modal",
		"$sails",
		"$interval",
		function($scope, $rootScope, $modal, $sails, $interval) {
			var widget = $scope.widget;

			$scope.data = {
				time: moment().format("h:mm:ss a")
			}

			// if(widget.settings.showDate) {
			// 	$scope.data.date = moment().format("D/MMMM/YYYY");
			// }

			var time = $interval(function() {
				$scope.data.time = moment().format("h:mm:ss a");
				$scope.data.date = moment().format("D/MMMM/YYYY");
			}, 1000);

			/**
			 * React to event "openWidgetSettings"
			 * @type {[type]}
			 */
			$scope.openSettings = function(widget) {
				$modal.open({
					templateUrl: "/widgets/time/settings",
					controller: "WidgetTimeSettingsController",
					resolve: {
						widget: function() {
							return $scope.widget;
						}
					}
				});
			}
		}
	])

	.controller("WidgetTimeSettingsController", [
		"$scope",
		"$rootScope",
		"$modalInstance",
		"widget",
		"Widgets",
		function($scope, $rootScope, $modalInstance, widget, Widgets) {
			$scope.data = widget;
			$scope.remove = function() {
				Widgets.remove({widgetId: widget.id});
				$rootScope.$broadcast("dashboard:widget:remove", widget);
				$modalInstance.close();
			}

			var settings = {
				showDate: true
			}

			$scope.update = function () {
				Widgets.update({widgetId: widget.id}, {
					title: $scope.data.title,
					description: $scope.data.description,
					settings: settings
				}, function(result) {

				});

		    $modalInstance.close();
		  };

		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  }
		}
	]);
})();
