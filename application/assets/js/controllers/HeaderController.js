(function() {
	'use strict';

	angular.module("dashi3")
	.controller("HeaderController", [
		'$scope',
		'$sails',
		'$modal',
		'Widgets',
		'Dashboard',
		function($scope, $sails, $modal, Widgets, Dashboard) {
			var dashboard = {};
			$scope.init = function(dashboardId) {
				dashboard = Dashboard.get({dashboardId: dashboardId});
			}

			$scope.openNewWidgetFormModal = function() {
				var templates = Widgets.query({widgetId: "available"});

				$modal.open({
					templateUrl: "/templates/openNewWidgetFormModal",
					controller: "OpenNewWidgetFormModal",
					resolve: {
						templates: function() {
							return templates;
						},
						dashboard: function() {
							return dashboard;
						}
					}
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
					input.sizeY = 2;
				}
				else {
					input.sizeX = 1;
					input.sizeY = 1;
				}

				console.log(input);
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
