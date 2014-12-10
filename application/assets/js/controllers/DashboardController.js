(function() {
	'use strict';

	angular.module("dashi3")
	.controller("DashboardController", [
		"$scope",
		"$modal",
		function($scope, $modal) {

			/**
			 * React to event "openDataList"
			 * @type {[type]}
			 */
			$scope.openDataList = function(widget) {
				$modal.open({
					templateUrl: "openDataList.html",
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
					templateUrl: "openAddDataPoint.html",
					controller: "OpenAddDataPoint",
					resolve: {
						widget: function() {
							return widget;
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
					templateUrl: "openWidgetSettings.html",
					controller: "OpenWidgetSettings",
					resolve: {
						widget: function() {
							return widget;
						}
					}
				});
			}

			$scope.labels = ["10/12", "11/12", "12/12", "13/12", "14/12"];
			$scope.series = ["Enlaces"];
			$scope.data = [[428, 429, 432, 432, 438]];
			$scope.onClick = function(points, evt) {
				
			}
		}
	])

	.controller("OpenAddDataPoint", [
		"$scope",
		"$modalInstance",
		"widget",
		function($scope, $modalInstance, widget) {
			$scope.ok = function () {
		    $modalInstance.close($scope.selected.item);
		  };

		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  }
		}
	])

	.controller("OpenDataList", [
		"$scope",
		"$modalInstance",
		"widget",
		function($scope, $modalInstance, widget) {
			$scope.ok = function () {
		    $modalInstance.close($scope.selected.item);
		  };

		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  }
		}
	])

	.controller("OpenWidgetSettings", [
		"$scope",
		"$modalInstance",
		"widget", 
		function($scope, $modalInstance, widget) {
			$scope.ok = function () {
		    $modalInstance.close($scope.selected.item);
		  };

		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  }
		}
	]);


})();
