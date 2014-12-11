(function() {
	'use strict';

	angular.module("dashi3")

	/**
	 * Header controller. Controls the header and all its links
	 * @type {void}
	 */
	.controller("MainHeaderController", [
		'$scope',
		'$modal',
		'Dashboard',
		'Sources',
		function($scope, $modal, Dashboard, Sources) {

			// Get all dashboards so we can build the menu
			$scope.dashboards = Dashboard.all();

			// React to the click of openNewDashboardFormModal
			// by opening a modal
			$scope.openNewDashboardFormModal = function() {
				$modal.open({
					templateUrl: "/templates/createDashboardFormModal",
					controller: "CreateDashboardFormModal",
					resolve: {
						dashboards: function() {
							return $scope.dashboards;
						}
					}
				});
			}

			$scope.openNewSourceFormModal = function() {
				$modal.open({
					templateUrl: "/templates/createSourceFormModal",
					controller: "CreateSourceFormModal"
				})
			}

			$scope.openSourcesList = function() {
				var sources = Sources.all();
				$modal.open({
					templateUrl: "/templates/openSourcesList",
					controller: "OpenSourcesList",
					resolve: {
						sources: function() {
							return sources;
						}
					}
				});
			}
		}
	])

	/**
	 * Instance of the modal, this is the controller that will control the
	 * modal CreateDashbaordFormModal	 
	 * @return {void}   
	 */
	.controller("CreateDashboardFormModal", [
		'$scope',
		'$modalInstance',
		"Dashboard",
		"dashboards",
		function($scope, $modalInstance, Dashboard, dashboards) {
			$scope.data = {};
			$scope.ok = function () {
				// On OK save the Dashboard and append the result to the
				// dashboards array
				var dashboard = Dashboard.save($scope.data);
				dashboards.push(dashboard);

		    $modalInstance.close();
		  };

		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  }
		}
	])

	.controller("CreateSourceFormModal", [
		"$scope",
		"$modalInstance",
		"Sources",
		function($scope, $modalInstance, Sources) {
			$scope.data = {};

			$scope.ok = function() {
				var source = Sources.save($scope.data);
				$modalInstance.close();
			}

			$scope.cancel = function() {
				$modalInstance.dismiss("cancel");
			}
		}
	])

	.controller("OpenSourcesList", [
		"$scope",
		"$modalInstance",
		"sources",
		function($scope, $modalInstance, sources) {

			$scope.sources = sources;
			
			$scope.ok = function() {
				$modalInstance.close();
			}

			$scope.cancel = function() {
				$modalInstance.dismiss("cancel");
			}
		}
	]);

})();
