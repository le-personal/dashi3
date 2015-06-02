/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

var include = require("include");
var UserRepository = include("api/repositories/UserRepository");

module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.session.authenticated) {
  	UserRepository.isAdmin(req.user.id)
  	.then(function(isAdmin) {
  		if(isAdmin) return next();
  		else {
  			return res.forbidden('You are not permitted to perform this action.');
  		}
  	})
  	.fail(function(err) {
  		return res.forbidden('You are not permitted to perform this action.');
  	});
  }
  else {
	  console.log(req.session.authenticated);

	  // User is not allowed
	  // (default res.forbidden() behavior can be overridden in `config/403.js`)
	  return res.redirect('/login');
  }

};