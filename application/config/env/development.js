/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {
  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
  models: {
    connection: 'mongo',
    migrate: 'alter'
  },
  log: {
    level: "debug"
  },
  port: process.env.PORT,
  session: {
    secret: process.env.SECRET,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 * 30
    },
    adapter: 'redis',
    host: process.env.REDIS_PORT_6379_TCP_ADDR,
    port: process.env.REDIS_PORT_6379_TCP_PORT,
    ttl: 24 * 60 * 60 * 30,
    db: 0,
    // pass: <redis auth password>
    prefix: 'sess:'
  },
  sockets: {
    adapter: 'redis',
    host: process.env.REDIS_PORT_6379_TCP_ADDR,
    port: process.env.REDIS_PORT_6379_TCP_PORT,
  }
};
