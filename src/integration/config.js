'use strict'

// This is the only place to read process.env settings.  The point is that the
// service should use the configuration like
//
//     const config = require('./config')
//
// and just extract needed configuration parts and pass them on to modules that
// need them, like
//
//     mymodule(config.logger)
//
// or alternatively
//
//     const port = require('./config').server.port
//     mymodule(port)

module.exports = {
  backendUrl: process.env.BACKEND_URL || 'http://backend',
  frontendUrl: process.env.FRONTEND_URL || 'http://frontend',
  user: process.env.BACKEND_USER || 'noone',
  password: process.env.BACKEND_PASSWORD || 'abc1234'
}
