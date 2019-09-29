'use strict'

const tcp = require('__/tcp')

// This is the only place to read process.env settings.  The point is that the
// service should use the configuration like
//
//     const config = require('backend/config')
//
// and just extract needed configuration parts and pass them on to modules that
// need them, like
//
//     mymodule(config.logger)
//
// or alternatively
//
//     const port = require('backend/config').server.port
//     mymodule(port)

exports.server = {
  port: tcp.normalizePort(process.env.PORT) || 3000
}
