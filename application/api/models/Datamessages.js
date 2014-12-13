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
  	message: {
  		type: "string",
  		required: true
  	},
  	type: {
  		type: "string",
  		required: true,
  	}
  }
};

