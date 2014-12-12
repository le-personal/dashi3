(function() {
  'use strict';

  angular.module("dashi3")
  .service("Data", [
    "$resource",
    function($resource) {
      return $resource("/api/v1/data", {}, {
        get: {method: "GET", isArray: false},
        save: {method: "POST", isArray: false}
      })
    }
  ]);

})();