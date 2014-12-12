(function() {
	'use strict';

	angular.module("dashi3")
	.controller("HeaderController", [
		'$scope',
		'$sails',
		'$modal',
		'Sources',
		'Widgets',
		'Dashboard',
		function($scope, $sails, $modal, Sources, Widgets, Dashboard) {
			var dashboard = {};
			$scope.init = function(dashboardId) {
				dashboard = Dashboard.get({dashboardId: dashboardId});
			}

			$scope.openNewWidgetFormModal = function() {
				var sources = Sources.all();
				var templates = Widgets.query({widgetId: "available"});

				$modal.open({
					templateUrl: "/templates/openNewWidgetFormModal",
					controller: "OpenNewWidgetFormModal",
					resolve: {
						sources: function() {
							return sources;
						},
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
		'sources',
		'templates',
		'dashboard',
		function($scope, $rootScope, $sails, $modalInstance, Widgets, sources, templates, dashboard) {
			$scope.data = {};
			$scope.templates = templates;
			$scope.sources = sources;

			$scope.ok = function() {
				var data = $scope.data;
				Widgets.save({
					title: data.title,
					description: data.description,
					template: data.template,
					textToAppend: data.textToAppend,
					weight: 0,
					backgroundColor: $scope.data.backgroundColor,
					textColor: $scope.data.textColor,
					source: data.source,
					dashboard: dashboard.id
				}, function(widget) {
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