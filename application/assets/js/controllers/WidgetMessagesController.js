(function() {
	'use strict';

	angular.module("dashi3")
	.controller("WidgetMessagesController", [
		"$scope",
		"$rootScope",
		"$sails",
		"$modal",
		function($scope, $rootScope, $sails, $modal) {
			var storageId = $scope.widget.storage;

			$scope.data = [];
			// populate initial data value
			io.socket.get("/api/v1/data?storage="+ storageId +"&sort=createdAt DESC&limit=5", function(data) {
				angular.forEach(data, function(element, key) {
					$scope.data.push(element);
				})
			});

			// when there is a change on the server, update
			// data is refering to the model Data
			io.socket.on("data", function(data) {
				// only update if the storage of this widget is the same
				// as the storage of the data updated
				if(data.data.storage == storageId) {
					$scope.data.unshift(data.data);
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
						storage: function() {
							return $scope.widget.storage;
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
