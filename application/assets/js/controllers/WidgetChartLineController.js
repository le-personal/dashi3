(function() {
	'use strict';

	angular.module("dashi3")
	.controller("WidgetChartLineController", [
		"$scope",
		"$rootScope",
		"$modal",
		"$sails",
		function($scope, $rootScope, $modal, $sails) {
			var widget = $scope.widget;
			var sourceId = $scope.widget.source;

			$scope.data = [];
			var chartData = [];
			$scope.labels = [];
			$scope.series = [widget.title];

			// populate initial data value
			io.socket.get("/api/v1/data?source="+ sourceId +"&sort=createdAt DESC&limit=10", function(data, res) {
				// $scope.data = !angular.isUndefined(data[0]) ? data[0].valueNumber : 0;
				angular.forEach(data, function(item) {
					$scope.labels.push(item.createdAt);
					chartData.push(item.valueNumber);
				});

				$scope.data = [chartData.reverse()];
			});

			// when there is a change on the server, update
			// data is refering to the model Data
			io.socket.on("data", function(data) {
				// only update if the source of this widget is the same
				// as the source of the data updated
				if(data.data.source == sourceId) {
					$scope.data[0].push(data.data.valueNumber);
					$scope.labels.push(data.data.createdAt);
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
							return $scope.widget;
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
