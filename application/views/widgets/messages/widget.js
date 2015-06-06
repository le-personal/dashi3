(function() {
	'use strict';

	angular.module("dashi3")
	.controller("WidgetMessagesController", [
		"$scope",
		"$rootScope",
		"$sails",
		"$modal",
		function($scope, $rootScope, $sails, $modal) {
			var widget = $scope.widget;
			$scope.data = [];
			// populate initial data value
			// When opening the widget we need to get all the latest data
			// this will also subscribe ourself to the data model so we
			// can listen to changes
			io.socket.get("/api/v1/data/" + widget.dataset, function(data) {
				angular.forEach(data, function(element, key) {
					$scope.data.push(element.content);
				});
			});

			// when there is a change on the server, update
			// data is refering to the model Data
			io.socket.on("data", function(data) {
				if(data.verb == "created") {
					// only update if the dataset of this widget is the same
					// as the dataset of the data updated
					if(data.data.dataset == widget.dataset) {
						$scope.data.unshift(data.data.content);
					}
				}
			});

			/**
			 * React to event "openAddDataPoint"
			 * @type {[type]}
			 */
			$scope.openForm = function(widget) {
				$modal.open({
					templateUrl: "/widgets/messages/form",
					controller: "WidgetMessagesFormController",
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
					templateUrl: "/widgets/messages/settings",
					controller: "WidgetMessagesSettingsController",
					resolve: {
						widget: function() {
							return $scope.widget;
						}
					}
				});
			}
		}
	])

	.controller("WidgetMessagesSettingsController", [
		"$scope",
		"$rootScope",
		"$modalInstance",
		"widget",
		"Widgets",
		"Data",
		"Datasets",
		function($scope, $rootScope, $modalInstance, widget, Widgets, Data, Datasets) {
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
					settings: {
						limit: $scope.data.settings.limit
					}
				}, function(result) {
					console.log(result);
				});

		    $modalInstance.close();
		  };

		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  }
		}
	])

	.controller("WidgetMessagesFormController", [
		"$scope",
		"$modalInstance",
		"widget",
		"Data",
		function($scope, $modalInstance, widget, Data) {
			$scope.ok = function () {
				var data = {
					widgetId: widget.id,
					value: {
						title: $scope.data.title,
						content: $scope.data.content,
						image: $scope.data.image,
						link: $scope.data.link
					},
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
