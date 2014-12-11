(function() {
	'use strict';

	angular.module("dashi3")
	.controller("HeaderController", [
		'$scope',
		'$modal',
		'Sources',
		'Widgets',
		'Dashboard',
		function($scope, $modal, Sources, Widgets, Dashboard) {

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
		'$modalInstance',
		'Widgets',
		'sources',
		'templates',
		'dashboard',
		function($scope, $modalInstance, Widgets, sources, templates, dashboard) {
			$scope.data = {};
			$scope.templates = templates;
			$scope.sources = sources;

			console.log(sources);

			$scope.ok = function() {
				var data = $scope.data;
				var widget = Widgets.save({
					title: data.title,
					description: data.description,
					template: data.template,
					weight: 0,
					source: data.source,
					dashboard: dashboard.id
				});

				console.log(widget);

				$modalInstance.close();
			}

			$scope.cancel = function() {
				$modalInstance.dismiss("cancel");
			}
		}
	]);
})();