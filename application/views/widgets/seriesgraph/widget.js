(function() {
	'use strict';

	angular.module("dashi3")
	.controller("WidgetSeriesGraphController", [
		"$scope",
		"$rootScope",
		"$modal",
		"$sails",
		function($scope, $rootScope, $modal, $sails) {
			var widget = $scope.widget;

			$scope.data = [];
			$scope.labels = [];
			$scope.series = [];
			var chartData = [];

			// When opening the widget we need to get all the latest data
			// this will also subscribe ourself to the data model so we
			// can listen to changes
			io.socket.get("/api/v1/widgets/" + widget.id + "/data", function getWidget(data) {
				// Series and labels are taken from the first element of the array
				var labels = [];
				$scope.series = data[0].value.series;

				angular.forEach(data, function(row, i) {
					labels.push(row.value.labels[0]);

					angular.forEach(row.value.data, function(item, index) {
						if(typeof chartData[index] === "undefined") {
							chartData[index] = [];
						}
						chartData[index].unshift(item);
					});
				});

				$scope.labels = labels.reverse();
				$scope.data = chartData;
			});

			// when there is a change on the server, update
			// data is refering to the model Data
			io.socket.on("data", function(data) {
				if(data.verb == "created") {
					// only update if the storage of this widget is the same
					// as the storage of the data updated
					if(data.data.widget == widget.id) {
						$scope.labels.push(data.data.value.labels);

						// if($scope.labels.length > 15) {
						// 	// remove the first element
						// 	$scope.labels.shift();
						// }

						angular.forEach(data.data.value.data, function(item, index) {
							$scope.data[index].push(item);

							// if($scope.labels.length > 15) {
							// 	// remove the first
							// 	angular.forEach($scope.data, function(elements, i) {
							// 		angular.foreach(elements, function(e) {
							// 			e.pop();
							// 		})
							//
							// 	})
							// 	// $scope.data.shift();
							// }
						});
					}
				}
			});

			/**
			 * React to event "openWidgetSettings"
			 * @type {[type]}
			 */
			$scope.openSettings = function(widget) {
				$modal.open({
					templateUrl: "/widgets/seriesgraph/settings",
					controller: "WidgetSeriesGraphSettingsController",
					resolve: {
						widget: function() {
							return $scope.widget;
						}
					}
				});
			}
		}
	])

	.controller("WidgetSeriesGraphSettingsController", [
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
