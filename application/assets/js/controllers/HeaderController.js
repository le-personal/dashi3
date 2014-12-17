(function() {
	'use strict';

	angular.module("dashi3")
	.controller("HeaderController", [
		'$scope',
		'$sails',
		'$modal',
		'Storage',
		'Widgets',
		'Dashboard',
		function($scope, $sails, $modal, Storage, Widgets, Dashboard) {
			var dashboard = {};
			$scope.init = function(dashboardId) {
				dashboard = Dashboard.get({dashboardId: dashboardId});
			}

			$scope.openNewWidgetFormModal = function() {
				var storage = Storage.all();
				var templates = Widgets.query({widgetId: "available"});

				$modal.open({
					templateUrl: "/templates/openNewWidgetFormModal",
					controller: "OpenNewWidgetFormModal",
					resolve: {
						storage: function() {
							return storage;
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
		'storage',
		'templates',
		'dashboard',
		function($scope, $rootScope, $sails, $modalInstance, Widgets, storage, templates, dashboard) {
			$scope.data = {};
			$scope.templates = templates;
			$scope.storage = storage;

			$scope.ok = function() {
				var data = $scope.data;
				Widgets.save({
					title: data.title,
					description: data.description,
					template: data.template,
					weight: 0,
					storage: data.storage,
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