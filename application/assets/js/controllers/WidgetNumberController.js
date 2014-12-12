(function() {
	'use strict';

	angular.module("dashi3")
	.controller("WidgetNumberController", [
		"$scope",
		"$rootScope",
		"$modal",
		"$sails",
		function($scope, $rootScope, $modal, $sails) {
			var widget = $scope.widget;
			var sourceId = $scope.widget.source;

			$scope.data = 0;

			// populate initial data value
			io.socket.get("/api/v1/data?source="+ sourceId +"&sort=createdAt DESC&limit=1", function(data, res) {
				$scope.data = data[0].valueNumber ? data[0].valueNumber : 0;
			});

			// when there is a change on the server, update
			io.socket.on("data", function(data) {
				// only update if the source of this widget is the same
				// as the source of the data updated
				if(data.data.source == sourceId) {
					$scope.data = data.data.valueNumber;
				}
			});
				
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
		"$rootScope",
		"$modalInstance",
		"widget",
		"source",
		"Data",
		function($scope, $rootScope, $modalInstance, widget, source, Data) {
			$scope.ok = function () {
				var data = {
					source: source,
					valueNumber: $scope.value
				}

				// By using the API, we make sure that the event is received
				// via sockets, if we use sockets to save the data, the event
				// will not be received for some reason
				Data.save(data, function(result) {
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
