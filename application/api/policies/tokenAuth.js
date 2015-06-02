var include = require("include");
var ApplicationRepository = include("api/repositories/ApplicationRepository");

// policies/canWrite.js
module.exports = function tokenAuth (req, res, next) {
  var access_token = req.query.access_token;

  ApplicationRepository.getByToken(access_token)
  .then(function(result) {
    if(result) return next();
    else {
      return res.forbidden("Invalid token");
    }
  })
  .fail(function(err) {
    return res.serverError(err);
  });
};
