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
		function($scope, $modal, Dashboard) {

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
	]);




})();
