(function() {
	'use strict';

	angular.module("dashi3")
	.controller("WidgetFlotController", [
		"$scope",
		"$rootScope",
		"$modal",
		"$sails",
		function($scope, $rootScope, $modal, $sails) {
			var widget = $scope.widget;
			var label = widget.label;
			var widgetId = "#flot-" + widget.id;
      var currentValue = 0;
      var total = 0;

      $scope.dataset = [{ data: [], yaxis: 1, label: label }];

      // Flot options
      $scope.options = {
        series: {
          shadowSize: 0 // Drawing is faster without shadows
        },
        lines: {
          show: true
        },
        yaxis: {
          min: $scope.widget.settings.min ? $scope.widget.settings.min : 0,
          max: $scope.widget.settings.max ? $scope.widget.settings.max : 100,
        },
        xaxis: {
          show: false,
          tickSize: 25,
          ticks: 25
        },
        legend: {
          container: widgetId,
          show: false
        }
      };

			// When opening the widget we need to get all the latest data
			// this will also subscribe ourself to the data model so we
			// can listen to changes
			io.socket.get("/api/v1/data/" + widget.dataset, function(data) {
        var value = data[0].content.value;
        var currentValue = value;
        total = data.length;
        for (var i = 0; i < data.length; i++) {
          $scope.dataset[0].data.push([i, data[i].content.value]);
        }
			});

			// when there is a change on the server, update
			// data is refering to the model Data
			io.socket.on("data", function(data) {
				if(data.verb == "created") {
					var oldValue = currentValue;
					// only update if the widget of this widget is the same
					// as the widget of the data updated
					if(data.data.dataset == widget.dataset) {
						var value = data.data.content.value;
            total++;
            $scope.dataset[0].data.shift();
            $scope.dataset[0].data.push([total, value]);
					}
				}
			});

			/**
			 * React to event "openWidgetSettings"
			 * @type {[type]}
			 */
			$scope.openSettings = function(widget) {
				$modal.open({
					templateUrl: "/widgets/flot/settings",
					controller: "WidgetFlotSettingsController",
					resolve: {
						widget: function() {
							return $scope.widget;
						}
					}
				});
			}
		}
	])

	.controller("WidgetFlotFormController", [
		"$scope",
		"$modalInstance",
		"widget",
		"Data",
		function($scope, $modalInstance, widget, Data) {
			$scope.ok = function () {
				var data = {
					widgetId: widget.id,
					value: Number($scope.value),
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

	.controller("WidgetFlotSettingsController", [
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
					label: $scope.data.label,
					dataset: $scope.data.dataset,
          settings: {
            min: $scope.data.settings.min,
            max: $scope.data.settings.max,
            height: $scope.data.settings.height
          }
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
