/**
* Data.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
  	id: {
  		type: "integer",
  		autoIncrement: true,
  		primaryKey: true
  	},
  	source: {
  		model: "Sources"
  	},
  	valueText: {
  		type: "string",
  		required: false
  	},
  	valueNumber: {
  		type: "integer",
  		required: false,
  	},
  	valueFloat: {
  		type: "float",
  		required: false
  	}
  }
};

