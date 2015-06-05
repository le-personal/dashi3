(function() {
	'use strict';

	angular.module("dashi3")
	.controller("WidgetCounterController", [
		"$scope",
		"$rootScope",
		"$modal",
		"$sails",
		function($scope, $rootScope, $modal, $sails) {
			var widget = $scope.widget;

			$scope.data = {
				value: 0,
				definition: ""
			};

			$scope.indicator = "";
			$scope.message = "";

			// When opening the widget we need to get all the latest data
			// this will also subscribe ourself to the data model so we
			// can listen to changes
			io.socket.get("/api/v1/data/" + widget.dataset, function(data) {
				$scope.data = [];
				if(typeof data[0].content !== "undefined") {
					$scope.data = data[0].content;
				}

				if(data.length > 0) {
					// old data is the 1 in the
					var oldData = data[1].content;
					var latest = data[0].content;

					if(latest.value > oldData.value) {
						$scope.indicator = "up";
						$scope.message = "Up from " + oldData.value + " since " + moment(oldData.createdAt).format("MMMM/D h:m a");
					}
					if(latest.value < oldData.value) {
						$scope.indicator = "down";
						$scope.message = "Down from " + oldData.value + " since " + moment(oldData.createdAt).format("MMMM/D h:m a");
					}
					if(latest.value == oldData.value) {
						$scope.indicator = "same";
						$scope.message = "No change since " + moment(oldData.createdAt).format("MMMM/D h:m a");
					}
				}
			});

			// when there is a change on the server, update
			// data is refering to the model Data
			io.socket.on("data", function(data) {
				if(data.verb == "created") {
					// only update if the widget of this widget is the same
					// as the widget of the data updated
					if(data.data.dataset == widget.dataset) {
						var oldData = $scope.data;
						$scope.data = data.data.content;

						if(data.data.content.value > oldData.value) {
							$scope.indicator = "up";
							$scope.message = "Up from " + oldData.value + " since " + moment(oldData.createdAt).format("MMMM/D h:m a");
						}
						if(data.data.content.value < oldData.value) {
							$scope.indicator = "down";
							$scope.message = "Down from " + oldData.value + " since " + moment(oldData.createdAt).format("MMMM/D h:m a");
						}
						if(data.data.content.value == oldData.value) {
							$scope.indicator = "same";
							$scope.message = "No change since " + moment(oldData.createdAt).format("MMMM/D h:m a");
						}
					}
				}
			});

			/**
			 * React to event "openDataList"
			 * @type {[type]}
			 */
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
					templateUrl: "/widgets/counter/form",
					controller: "WidgetCounterFormController",
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
					templateUrl: "/widgets/counter/settings",
					controller: "WidgetCounterSettingsController",
					resolve: {
						widget: function() {
							return $scope.widget;
						}
					}
				});
			}
		}
	])

	.controller("WidgetCounterFormController", [
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

	// .controller("OpenDataList", [
	// 	"$scope",
	// 	"$modalInstance",
	// 	"widget",
	// 	function($scope, $modalInstance, widget) {
	// 		$scope.data = [];
	// 		io.socket.get("/api/v1/data?widget="+ widget.id +"&sort=createdAt DESC&limit=25", function(data) {
	// 			$scope.data = data;
	// 		});

	// 		$scope.ok = function () {
	// 	    $modalInstance.close($scope.selected.item);
	// 	  };

	// 	  $scope.cancel = function () {
	// 	    $modalInstance.dismiss('cancel');
	// 	  }
	// 	}
	// ])

	.controller("WidgetCounterSettingsController", [
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
