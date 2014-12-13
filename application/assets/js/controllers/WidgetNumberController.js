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
			var storageId = $scope.widget.storage;

			$scope.data = 0;

			// populate initial data value
			io.socket.get("/api/v1/data?storage="+ storageId +"&sort=createdAt DESC&limit=1", function(data, res) {
				$scope.data = !angular.isUndefined(data[0]) ? data[0].valueNumber : 0;
			});

			// when there is a change on the server, update
			// data is refering to the model Data
			io.socket.on("data", function(data) {
				// only update if the storage of this widget is the same
				// as the storage of the data updated
				if(data.data.storage == storageId) {
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
	])

	.controller("OpenAddDataPoint", [
		"$scope",
		"$modalInstance",
		"widget",
		"storage",
		"Data",
		function($scope, $modalInstance, widget, storage, Data) {
			$scope.ok = function () {
				var data = {
					storage: storage,
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
			var storageId = widget.storage;
			$scope.data = [];
			io.socket.get("/api/v1/data?storage="+ storageId +"&sort=createdAt DESC&limit=25", function(data) {
				$scope.data = data;
			});

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

			$scope.update = function () {
				Widgets.update({widgetId: widget.id}, {
					title: $scope.data.title,
					description: $scope.data.description,
					backgroundColor: $scope.data.backgroundColor,
					textColor: $scope.data.textColor,
					weight: 0
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
