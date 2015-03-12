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
			console.log(storageId);
			$scope.data = [];
			// populate initial data value
			// When opening the widget we need to get all the latest data
			// this will also subscribe ourself to the data model so we
			// can listen to changes
			io.socket.get("/api/v1/storage/" + storageId + "/data", function(data) {
				angular.forEach(data, function(element, key) {
					$scope.data.push(element);
				});
			});

			// when there is a change on the server, update
			// data is refering to the model Data
			io.socket.on("data", function(data) {
				if(data.verb == "created") {
					// only update if the storage of this widget is the same
					// as the storage of the data updated
					if(data.data.storage == storageId) {
						$scope.data.unshift(data.data);

						// if the array is bigger than 10, reduce it
						if($scope.data.length > 10) {
							$scope.data.pop();
						}
					}
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
			$scope.openAddDataPointMessage = function(widget) {
				$modal.open({
					templateUrl: "/templates/openAddDataPointMessage",
					controller: "OpenAddDataPointMessage",
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

	.controller("OpenAddDataPointMessage", [
		"$scope",
		"$modalInstance",
		"widget",
		"storage",
		"Data",
		function($scope, $modalInstance, widget, storage, Data) {
			$scope.ok = function () {
				var data = {
					storageId: storage,
					value: $scope.value,
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

	
})();
