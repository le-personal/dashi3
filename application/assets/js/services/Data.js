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


// module.exports = {
//   attributes: {
//   	id: {
//   		type: "integer",
//   		autoIncrement: true,
//   		primaryKey: true
//   	},
//   	source: {
//   		model: "Sources"
//   	},
//   	valueText: {
//   		type: "string",
//   		required: false
//   	},
//   	valueNumber: {
//   		type: "integer",
//   		required: false,
//   	},
//   	valueFloat: {
//   		type: "float",
//   		required: false
//   	}
//   }
// };