(function() {
	'use strict';


	angular.module("dashi3")
	.controller("WidgetTwitteruserController", [
		"$scope",
		"$rootScope",
		"$modal",
		"$sails",
		"$interval",
		function($scope, $rootScope, $modal, $sails, $interval) {
			var widget = $scope.widget;
			$scope.limit = $scope.widget.settings.maxTweets;

			$scope.data = {
				tweets: [],
				start: moment().format("h:mm a"),
				counter: 0
			}

			io.socket.get('/api/v1/providers/twitter/statuses');
			io.socket.on("twitter:user", function(data) {
				$scope.data.counter++;
				if(data.tweet.entities.media) {
					console.log("Tweet has image");
					console.log(data.tweet.entities.media[0].media_url);
					data.tweet.hasImage = true;
				}
				$scope.data.tweets.unshift(data.tweet);
			});

			/**
			 * React to event "openWidgetSettings"
			 * @type {[type]}
			 */
			$scope.openSettings = function(widget) {
				$modal.open({
					templateUrl: "/widgets/twitteruser/settings",
					controller: "WidgetTwitteruserSettingsController",
					resolve: {
						widget: function() {
							return $scope.widget;
						}
					}
				});
			}
		}
	])

	.controller("WidgetTwitteruserSettingsController", [
		"$scope",
		"$rootScope",
		"$modalInstance",
		"widget",
		"Widgets",
		function($scope, $rootScope, $modalInstance, widget, Widgets) {
			$scope.data = widget;
			$scope.remove = function() {
				Widgets.remove({widgetId: widget.id});
				$rootScope.$broadcast("dashboard:widget:remove", widget);
				$modalInstance.close();
			}

			if(!$scope.data.settings.user) {
				$scope.data.settings.user = "twitter";
			}

			$scope.update = function () {
				Widgets.update({widgetId: widget.id}, {
					title: $scope.data.title,
					description: $scope.data.description,
					dataset: $scope.dataset,
					settings: {
						maxTweets: $scope.data.settings.maxTweets
					}
				}, function(result) {
					
				});

		    $modalInstance.close();
		  };

		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  }
		}
	]);
})();
