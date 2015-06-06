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
			io.socket.get("/api/v1/data/" + widget.dataset, function getWidget(data) {
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

			/**
			 * React to event "openWidgetSettings"
			 * @type {[type]}
			 */
			$scope.openSettings = function(widget) {
				$modal.open({
					templateUrl: "/widgets/singlelinegraph/settings",
					controller: "WidgetSingleLineGraphSettingsController",
					resolve: {
						widget: function() {
							return $scope.widget;
						}
					}
				});
			}
		}
	])

	.controller("WidgetSingleLineGraphFormController", [
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

	.controller("WidgetSingleLineGraphSettingsController", [
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
					dataset: $scope.data.dataset,
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
