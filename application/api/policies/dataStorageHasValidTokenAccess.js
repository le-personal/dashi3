var include = require("include");
var StorageRepository = include("api/repositories/StorageRepository");

// policies/canWrite.js
module.exports = function dataStorageHasValidTokenAccess (req, res, next) {
  var storageId = req.param('storage');
  var access_token = req.query.access_token;

  if(!access_token) {
    return res.forbidden("An access token is required");
  }

  new StorageRepository().get(storageId, function(err, storage) {
    if(err) return res.serverError(err);

    // check if the storage.access_token and the access_token sent are the same
    // if not, send an access denied
    if(storage.access_token === access_token) {
      return next();
    }
    else {
      return res.forbidden("The access token is invalid");
    }
  });
};
