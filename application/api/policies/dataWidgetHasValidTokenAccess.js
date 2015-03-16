var include = require("include");
var WidgetsRepository = include("api/repositories/WidgetsRepository");

// policies/canWrite.js
module.exports = function dataWidgetHasValidTokenAccess (req, res, next) {
  // var widgetId = req.param('widget');
  // var access_token = req.query.access_token;
  //
  // if(!access_token) {
  //   return res.forbidden("An access token is required");
  // }
  //
  // new WidgetsRepository().get(widgetId, function(err, widget) {
  //   if(err) return res.serverError(err);
  //
  //   // check if the storage.access_token and the access_token sent are the same
  //   // if not, send an access denied
  //   if(widget.access_token === access_token) {
  //     return next();
  //   }
  //   else {
  //     return res.forbidden("The access token is invalid");
  //   }
  // });

  return next()
};
