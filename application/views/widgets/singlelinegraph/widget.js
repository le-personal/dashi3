(function() {
	'use strict';

	angular.module("dashi3")
	.controller("WidgetSingleLineGraphController", [
		"$scope",
		"$rootScope",
		"$modal",
		"$sails",
		function($scope, $rootScope, $modal, $sails) {
			var widget = $scope.widget;

			$scope.data = [];
			var chartData = [];
			$scope.labels = [];
			$scope.series = [widget.title];

			// When opening the widget we need to get all the latest data
			// this will also subscribe ourself to the data model so we
			// can listen to changes
			io.socket.get("/api/v1/widgets/" + widget.id + "/data", function getWidget(data) {
				angular.forEach(data, function(item) {
					$scope.labels.push(moment(item.createdAt).format("MMM/D"));
					chartData.push(item.value);
				});

				$scope.data = [chartData.reverse()];
			});

			// when there is a change on the server, update
			// data is refering to the model Data
			io.socket.on("data", function(data) {
				if(data.verb == "created") {
					// only update if the storage of this widget is the same
					// as the storage of the data updated
					if(data.data.widget == widget.id) {
						$scope.data[0].push(data.data.value);
						$scope.labels.push(moment(data.data.createdAt).format("MMM/D"));
					}
				}
			});

			// /**
			//  * React to event "openDataList"
			//  * @type {[type]}
			//  */
			// $scope.openDataList = function(widget) {
			// 	$modal.open({
			// 		templateUrl: "/templates/openDataList",
			// 		controller: "OpenDataList",
			// 		resolve: {
			// 			widget: function() {
			// 				return $scope.widget;
			// 			}
			// 		}
			// 	});
			// }

			/**
			 * React to event "openAddDataPoint"
			 * @type {[type]}
			 */
			$scope.openForm = function(widget) {
				$modal.open({
					templateUrl: "/widgets/singlelinegraph/form",
					controller: "WidgetSingleLingGraphFormController",
					resolve: {
						widget: function() {
							return $scope.widget;
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
					templateUrl: "/widgets/simplelinegraph/settings",
					controller: "WidgetSingleLingGraphSettingsController",
					resolve: {
						widget: function() {
							return $scope.widget;
						}
					}
				});
			}
		}
	])

	.controller("WidgetSingleLingGraphFormController", [
		"$scope",
		"$modalInstance",
		"widget",
		"Data",
		function($scope, $modalInstance, widget, Data) {
			$scope.ok = function () {
				var data = {
					widgetId: widget.id,
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

	.controller("WidgetSingleLingGraphSettingsController", [
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
					description: $scope.data.description
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
