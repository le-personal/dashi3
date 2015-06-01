/**
* Data.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    dataset: {
      type: "string",
      required: true,
    },
    application: {
      model: "application",
      required: false,
    },
  	content: {
  		type: "json",
  		required: true
  	}
  }
};