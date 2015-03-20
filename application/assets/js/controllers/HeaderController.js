(function() {
	'use strict';

	angular.module("dashi3")
	.config([
		'$routeProvider',
		'$locationProvider',
	  function($routeProvider, $locationProvider) {
	    $routeProvider.
	      when('/marketplace', {
	        templateUrl: '/templates/marketplace',
	        controller: 'MarketplaceController'
	      });
	      // when('/phones/:phoneId', {
	      //   templateUrl: 'partials/phone-detail.html',
	      //   controller: 'PhoneDetailCtrl'
	      // }).

	  }
	])

	.controller("OpenMarketplaceController", [
		"$scope",
		"$rootScope",
		"$modalInstance",
		"$route",
		"$routeParams",
		"$location",
		function($scope, $rootScope, $modalInstance, $route, $routeParams, $location) {
			$rootScope.modalInstance = $modalInstance;
			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;

			// Al abrir el modal, redirigir hacia el path /marketplace
			$location.path("/marketplace");

			$scope.ok = function () {
		    $modalInstance.close();
		  };

		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  };

		  $rootScope.$on("closeModal", function() {
		  	$modalInstance.close();
		  })
		}
	])

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
				console.log("opening modal");
				$modal.open({
					templateUrl: "/templates/modal",
					controller: "OpenMarketplaceController"
				});
			}

			// This is temporary, until the Marketplace is ready
			// $scope.openNewWidgetFormModal = function() {
			// 	var templates = Widgets.query({widgetId: "available"});
			//
			// 	$modal.open({
			// 		templateUrl: "/templates/openNewWidgetFormModal",
			// 		controller: "OpenNewWidgetFormModal",
			// 		resolve: {
			// 			templates: function() {
			// 				return templates;
			// 			},
			// 			dashboard: function() {
			// 				return dashboard;
			// 			}
			// 		}
			// 	});
			// }

		}
	])

	.controller("MarketplaceController", [
		"$scope",
		"$rootScope",
		"$location",
		"$routeParams",
		"Marketplace",
		function($scope, $rootScope, $location, $routeParams, Marketplace) {
			$scope.params = $routeParams;
			console.log($rootScope.dashboard);
			$scope.widgets = Marketplace.index();
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
