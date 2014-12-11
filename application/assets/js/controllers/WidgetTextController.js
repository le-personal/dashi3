(function() {
	'use strict';

	angular.module("dashi3")
	.controller("WidgetTextController", [
		"$scope",
		"$modal",
		function($scope, $modal) {
			var sourceId = $scope.widget.source;

			$scope.data = 244;

			/**
			 * React to event "openDataList"
			 * @type {[type]}
			 */
			$scope.openDataList = function(widget) {
				$modal.open({
					templateUrl: "/templates/openDataList",
					controller: "OpenDataList",
					resolve: {
						widget: function() {
							return widget;
						}
					}
				});
			}

			/**
			 * React to event "openAddDataPoint"
			 * @type {[type]}
			 */
			$scope.openAddDataPoint = function(widget) {
				$modal.open({
					templateUrl: "/templates/openAddDataPoint",
					controller: "OpenAddDataPoint",
					resolve: {
						widget: function() {
							return $scope.widget;
						},
						source: function() {
							return $scope.widget.source;
						}
					}
				});
			}

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
	]);

	
})();
