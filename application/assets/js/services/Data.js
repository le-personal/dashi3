(function() {
  'use strict';

  angular.module("dashi3")
  .service("Data", [
    "$resource",
    function($resource) {
      return $resource("/api/v1/storage/:storageId/data/:dataId", {
        storageId: "@storageId",
        dataId: "@dataId"
      }, {
        get: {
          method: "GET",
          isArray: true,
          params: {
            access_token: "@access_token"
          }
        },
        save: {
          method: "POST",
          isArray: false,
          params: {
            access_token: "@access_token"
          }
        }
      })
    }
  ]);

})();
