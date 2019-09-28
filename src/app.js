'use strict'

const server = require('./server')
const tcp = require('__/tcp')
const port = tcp.normalizePort(process.env.PORT) || 3000

const serverListener = server.listen(port, () => {
  console.log(JSON.stringify({
    status: 'Service up',
    pid: process.pid,
    port: serverListener.address().port
  }))
})
