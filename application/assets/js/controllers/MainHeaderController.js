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
		'Storage',
		function($scope, $modal, Dashboard, Storage) {

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

			$scope.openNewStorageFormModal = function() {
				$modal.open({
					templateUrl: "/templates/createStorageFormModal",
					controller: "CreateStorageFormModal"
				})
			}

			$scope.openStorageList = function() {
				var storage = Storage.all();
				$modal.open({
					templateUrl: "/templates/openStorageList",
					controller: "OpenStorageList",
					resolve: {
						storage: function() {
							return storage;
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

	.controller("CreateStorageFormModal", [
		"$scope",
		"$modalInstance",
		"$filter",
		"Storage",
		"storage",
		function($scope, $modalInstance, $filter, Storage, storage) {

			$scope.data = {};
			$scope.name = "";
			$scope.id = "";
			$scope.idInputIsVisible = false;
			$scope.idButtonLabel = "Edit";

			$scope.$watch("name", function() {
				$scope.id = $scope.name.toLowerCase().replace(/ /g, '');
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
				Storage.save({
					id: $scope.id,
					name: $scope.name,
					type: $scope.type,
					description: $scope.description
				}, function(err, result) {
					console.log(result);

					// storage.setToken(result.id, result.access_token);
				});

				$modalInstance.close();
			}

			$scope.cancel = function() {
				$modalInstance.dismiss("cancel");
			}
		}
	])

	.controller("OpenStorageList", [
		"$scope",
		"$modalInstance",
		"storage",
		function($scope, $modalInstance, storage) {

			$scope.storage = storage;

			$scope.ok = function() {
				$modalInstance.close();
			}

			$scope.cancel = function() {
				$modalInstance.dismiss("cancel");
			}
		}
	]);

})();
