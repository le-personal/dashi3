(function() {
	'use strict';
	
	google.load("visualization", "1", {packages:["gauge"]});

	/**
	 * Draws the gauge chart
	 * @param  {string} widgetId The id of the widget to use
	 * @param  {string} label    The string to use as label of the gauge widget
	 * @param  {integer} value    The value of the gauge
	 * @return {void}          
	 */
  function drawChart(widgetId, label, value) {
		

    
  }

	angular.module("dashi3")
	.controller("WidgetGaugeController", [
		"$scope",
		"$rootScope",
		"$modal",
		"$sails",
		function($scope, $rootScope, $modal, $sails) {
			var widget = $scope.widget;
			var label = widget.label;
			var widgetId = "gauge-" + widget.id;

			$scope.currentValue = 0;

			// define the initial array
			var chartData = google.visualization.arrayToDataTable([
			  ['Label', 'Value'],
			  [label, 0]
			]);

			// chart options
	    var options = {
	      redFrom: 90, 
	      redTo: 100,
	      yellowFrom:75, 
	      yellowTo: 90,
	      minorTicks: 5,
	      animation: {
	      	easing: "linear",
	      	duration: 1000
	      }
	    };

	    // initialize a chart variable empty, so it's out of the scope of
	    // other methods, it will be initialized once we get the first set of results
	    var chart;

			$scope.message = "";

			// When opening the widget we need to get all the latest data
			// this will also subscribe ourself to the data model so we
			// can listen to changes
			io.socket.get("/api/v1/data/" + widget.dataset, function(data) {
				// to avoid an error, we initialize it here
				chart = new google.visualization.Gauge(document.getElementById(widgetId));
				
				// 0 means the first row of the array data,
		    // but since the second argument is 1, it means that the first row is
		    // the header, so in reality, 0 is really in the position 1 of the array but
		    // is skyped
		    chartData.setValue(0, 1, data[0].content.value);

		    // set the current value for future use
		    $scope.currentValue = data[0].content.value;
				chart.draw(chartData, options);

				$scope.message = "Value of " + widget.title + " is " + data[0].content.value;
			});

			// when there is a change on the server, update
			// data is refering to the model Data
			io.socket.on("data", function(data) {
				if(data.verb == "created") {
					var oldValue = $scope.currentValue;
					// only update if the widget of this widget is the same
					// as the widget of the data updated
					if(data.data.dataset == widget.dataset) {
						// update the chart with the new value
						chartData.setValue(0, 1, data.data.content.value);
						chart.draw(chartData, options);

						// update the current value
						$scope.currentValue = data.data.content.value;
						$scope.message = "Current value of " + widget.title + " is " + data.data.content.value + " and the previous value was " + oldValue;
					}
				}
			});

			/**
			 * React to event "openAddDataPoint"
			 * @type {[type]}
			 */
			$scope.openForm = function(widget) {
				$modal.open({
					templateUrl: "/widgets/gauge/form",
					controller: "WidgetGaugeFormController",
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
			$scope.openSettings = function(widget) {
				$modal.open({
					templateUrl: "/widgets/gauge/settings",
					controller: "WidgetGaugeSettingsController",
					resolve: {
						widget: function() {
							return $scope.widget;
						}
					}
				});
			}
		}
	])

	.controller("WidgetGaugeFormController", [
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

	.controller("WidgetGaugeSettingsController", [
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
					dataset: $scope.data.dataset
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
