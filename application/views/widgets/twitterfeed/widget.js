(function() {
	'use strict';


	angular.module("dashi3")
	.controller("WidgetTwitterfeedController", [
		"$scope",
		"$rootScope",
		"$modal",
		"$sails",
		"$interval",
		function($scope, $rootScope, $modal, $sails, $interval) {
			var widget = $scope.widget;

			$scope.data = {
				tweets: [],
				counter: 0
			}

			var term = $scope.widget.settings.term ? $scope.widget.settings.term : "angular";
			var language = $scope.widget.settings.language ? $scope.widget.settings.language : "en";

			io.socket.get('/api/v1/providers/twitter/stream/' + term + "/" + language);

			console.log("Listening for events with the term: " + term);
			console.log("Getting streams from twitter:stream:"+term.replace(" ", "_"));
			io.socket.on("twitter:stream:"+term.replace(" ", "_"), function(data) {
				$scope.data.counter++;

				if($scope.data.tweets.length > $scope.widget.settings.maxTweets-1) {
					$scope.data.tweets.pop();
					$scope.data.tweets.unshift(data.tweet);
				}
				else {
					$scope.data.tweets.push(data.tweet);
				}

			});

			/**
			 * React to event "openWidgetSettings"
			 * @type {[type]}
			 */
			$scope.openSettings = function(widget) {
				console.log("Opening settings");
				$modal.open({
					templateUrl: "/widgets/twitterfeed/settings",
					controller: "WidgetTwitterfeedSettingsController",
					resolve: {
						widget: function() {
							return $scope.widget;
						}
					}
				});
			}
		}
	])

	.controller("WidgetTwitterfeedSettingsController", [
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

			if(!$scope.data.settings.term) {
				$scope.data.settings.term = "twitter";
			}

			if(!$scope.data.settings.language) {
				$scope.data.settings.language = "en";
			}

			$scope.update = function () {
				Widgets.update({widgetId: widget.id}, {
					title: $scope.data.title,
					description: $scope.data.description,
					settings: {
						term: $scope.data.settings.term,
						language: $scope.data.settings.language,
						maxTweets: $scope.data.settings.maxTweets
					}
				}, function(result) {
					console.log(result);
				});

		    $modalInstance.close();
		  };

		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  }
		}
	]);
})();
