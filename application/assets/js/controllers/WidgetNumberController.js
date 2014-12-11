(function() {
	'use strict';

	angular.module("dashi3")
	.controller("WidgetNumberController", [
		"$scope",
		"$modal",
		function($scope, $modal) {
			var sourceId = $scope.widget.source;

			$scope.data = 0;
			$scope.$on("widget:data", function(event, data) {
				console.log(data);
				$scope.data = data.valueNumber;
			})

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
	])

	.controller("OpenAddDataPoint", [
		"$scope",
		"$modalInstance",
		"widget",
		"source",
		"Data",
		function($scope, $modalInstance, widget, source, Data) {
			$scope.ok = function () {
				var data = {
					source: source,
					valueNumber: $scope.value
				}

				Data.save(data, function(result) {
					$scope.$emit("widget:data", result);
		    	$modalInstance.close();
				});
			
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
