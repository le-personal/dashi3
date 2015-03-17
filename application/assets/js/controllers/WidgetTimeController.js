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
				time: moment().format("h:mm:ss a"),
				date: moment().format("D/MMMM/YYYY")
			}

			var time = $interval(function() {
				$scope.data.time = moment().format("h:mm:ss a");
				$scope.data.date = moment().format("D/MMMM/YYYY");
			}, 1000);

			/**
			 * React to event "openWidgetSettings"
			 * @type {[type]}
			 */
			$scope.openWidgetSettings = function(widget) {
				$modal.open({
					templateUrl: "/templates/openWidgetSettings",
					controller: "OpenWidgetSettings",
					resolve: {
						widget: function() {
							return $scope.widget;
						}
					}
				});
			}
		}
	])
})();
