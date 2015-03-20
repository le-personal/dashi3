/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'get /': 'DashboardController.main',

  'get /dashboard/:path': 'DashboardController.getDashboard',
  'get /api/v1/dashboard/:id': 'DashboardController.getDashboardAPI',

  'get /api/v1/dashboard/:id/widgets': 'WidgetsController.getWidgets',

  'get /api/v1/widgets/:widget/data': 'DataController.index',
  'get /api/v1/widgets/:widget/data/:dataid': 'DataController.get',
  'post /api/v1/widgets/:widget/data': 'DataController.post',

  'get /api/v1/marketplace': 'MarketPlaceController.index',

  // allows us to get templates with a request.
  // the layout will be defined to an empty string so it doesn't
  // return the default layout.ejs
  // all files must end with .ejs extension
  // Legacy
  "/templates/:name": function(req, res) {
    res.locals.layout = "";

    var name = req.param("name");
    return res.view("templates/" + name);
  },

  "/widgets/:name": function(req, res) {
    res.locals.layout = "";

    var name = req.param("name");
    return res.view("widgets/" + name + "/widget");
  },

  "/widgets/:name/settings": function(req, res) {
    res.locals.layout = "";

    var name = req.param("name");
    return res.view("widgets/" + name + "/settings");
  },

  "/widgets/:name/form": function(req, res) {
    res.locals.layout = "";

    var name = req.param("name");
    return res.view("widgets/" + name + "/form");
  },

  'get /login': 'AuthController.login',
  'get /logout': 'AuthController.logout',
  'get /register': 'AuthController.register',

  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',

  'get /auth/:provider': 'AuthController.provider',
  'get /auth/:provider/callback': 'AuthController.callback',
  'get /auth/:provider/:action': 'AuthController.callback'

};
