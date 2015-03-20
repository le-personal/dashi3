(function() {
	'use strict';

	angular.module("dashi3")
	.service('SplitArray', function () {
		return {
	    split: function (array, columns) {
        if (array.length <= columns) {
            return [array];
        };

        var rowsNum = Math.ceil(array.length / columns);
        var rowsArray = new Array(rowsNum);

        for (var i = 0; i < rowsNum; i++) {
          var columnsArray = new Array(columns);
          for (j = 0; j < columns; j++) {
            var index = i * columns + j;

            if (index < array.length) {
                columnsArray[j] = array[index];
            } else {
                break;
            }
          }
          rowsArray[i] = columnsArray;
        }
        return rowsArray;
	    }
		}
	})

	.controller("HeaderController", [
		'$scope',
		'$rootScope',
		'$sails',
		'$modal',
		'Widgets',
		'Dashboard',
		'Marketplace',
		function($scope, $rootScope, $sails, $modal, Widgets, Dashboard, Marketplace) {
			var dashboard = {};
			$scope.init = function(dashboardId) {
				dashboard = Dashboard.get({dashboardId: dashboardId});
				$rootScope.dashboard = dashboard;
			}

			// this will have to go and we'll rely on the path
			$scope.openMarketplace = function() {
				$modal.open({
					templateUrl: "/templates/marketplace",
					controller: "MarketplaceController",
					size: "lg"
				});
			}
		}
	])

	.controller("MarketplaceController", [
		"$scope",
		"$rootScope",
		"$location",
		"$routeParams",
		"Marketplace",
		"Widgets",
		"SplitArray",
		"$modal",
		"$modalInstance",
		function($scope, $rootScope, $location, $routeParams, Marketplace, Widgets, SplitArray, $modal, $modalInstance) {
			$scope.params = $routeParams;
			var dashboard = $rootScope.dashboard;

			$scope.ok = function () {
		    $modalInstance.close();
		  };

		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  };

		  $rootScope.$on("closeModal", function() {
		  	$modalInstance.close();
		  });

			$scope.widgets = Marketplace.index();
			$scope.rows = SplitArray.split($scope.widgets, 3);
			
			$scope.addWidget = function(widgetTemplate) {		
				var input = {
					id: widgetTemplate.template + "_" + new Date().getTime(),
					title: widgetTemplate.name,
					type: widgetTemplate.template,
					description: widgetTemplate.description,
					label: "",
					dashboard: $rootScope.dashboard.id,
					sizeX: 1,
					sizeY: 1,
					settings: {

					}
				};

				Widgets.save(input, function(widget) {
					// emit an event
					$rootScope.$emit("dashboard:widget:new", widget);
					
					// Close the current modal and then open a new one delegating the new
					// responsability to the settings controller of the widget added
					$modalInstance.close();
					$modal.open({
						templateUrl: "/widgets/" + widgetTemplate.template + "/settings",
						controller: "Widget" + widgetTemplate.name + "SettingsController",
						size: 'lg',
						resolve: {
							widget: function() {
								return widget;
							}
						},
					});
				});
			}
		}
	])

	.controller("OpenNewWidgetFormModal", [
		'$scope',
		'$rootScope',
		'$sails',
		'$modalInstance',
		'Widgets',
		'templates',
		'dashboard',
		function($scope, $rootScope, $sails, $modalInstance, Widgets, templates, dashboard) {
			$scope.data = {
				title: ""
			};
			$scope.templates = templates;

			$scope.id = "";
			$scope.idInputIsVisible = false;
			$scope.idButtonLabel = "Edit";

			$scope.$watch("data.title", function() {
				$scope.id = $scope.data.title.toLowerCase().replace(/ /g, '');
			});

			$scope.toggleIdInput = function() {
				var status = $scope.idInputIsVisible;

				if(status) {
					// status is shown
					$scope.idInputIsVisible = false;
					$scope.idButtonLabel = "Edit";
				}
				else {
					$scope.idInputIsVisible = true;
					$scope.idButtonLabel = "Hide";
				}
			}

			$scope.ok = function() {
				var data = $scope.data;
				var input = {
					id: $scope.id,
					title: data.title,
					type: data.type,
					description: data.description,
					label: data.label,
					dashboard: dashboard.id,
				};

				if(data.size == "big") {
					input.sizeX = 2;
					input.sizeY = 1;
				}
				else {
					input.sizeX = 1;
					input.sizeY = 1;
				}

				Widgets.save(input, function(widget) {
					// emit an event
					$rootScope.$emit("dashboard:widget:new", widget);
					$modalInstance.close();
				});
			}

			$scope.cancel = function() {
				$modalInstance.dismiss("cancel");
			}
		}
	]);
})();
