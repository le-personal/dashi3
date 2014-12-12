(function() {
	'use strict';

	angular.module("dashi3")
	.controller("WidgetTextController", [
		"$scope",
		"$rootScope",
		"$sails",
		"$modal",
		function($scope, $rootScope, $sails, $modal) {
			var sourceId = $scope.widget.source;

			$scope.data = [];
			// populate initial data value
			io.socket.get("/api/v1/data?source="+ sourceId +"&sort=createdAt DESC&limit=5", function(data) {
				angular.forEach(data, function(element, key) {
					$scope.data.push(element.valueText);
				})
			});

			// when there is a change on the server, update
			// data is refering to the model Data
			io.socket.on("data", function(data) {
				// only update if the source of this widget is the same
				// as the source of the data updated
				if(data.data.source == sourceId) {
					$scope.data.append(data.data.valueText);
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
	]);

	
})();
