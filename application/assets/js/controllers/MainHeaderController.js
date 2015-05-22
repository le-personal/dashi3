(function() {
	'use strict';

	angular.module("dashi3")

	/**
	 * Header controller. Controls the header and all its links
	 * @type {void}
	 */
	.controller("MainHeaderController", [
		'$scope',
		'$rootScope',
		'$modal',
		'Dashboard',
		function($scope, $rootScope, $modal, Dashboard) {

			// Get all dashboards so we can build the menu
			$rootScope.dashboards = Dashboard.all();

			// React to the click of openNewDashboardFormModal
			// by opening a modal
			$scope.openNewDashboardFormModal = function() {
				$modal.open({
					templateUrl: "/templates/createDashboardFormModal",
					controller: "CreateDashboardFormModal",
					resolve: {
						dashboards: function() {
							return $rootScope.dashboards;
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
		'$rootScope',
		'$modalInstance',
		"Dashboard",
		"dashboards",
		function($scope, $rootScope, $modalInstance, Dashboard, dashboards) {
			$scope.data = {};
			$scope.ok = function () {
				// On OK save the Dashboard and append the result to the
				// dashboards array
				Dashboard.save($scope.data, function(result) {
					if(result) {
						$rootScope.dashboards.push(result);
			    	$modalInstance.close();
					}
					else {
						console.log("There was an error");
					}
				});

		  };

		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  }
		}
	]);




})();
