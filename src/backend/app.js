'use strict'

const backend = require('backend')
const tcp = require('__/tcp')
const port = tcp.normalizePort(process.env.PORT) || 3000

const serverListener = backend.listen(port, () => {
  console.log(JSON.stringify({
    status: 'Backend up',
    pid: process.pid,
    port: serverListener.address().port
  }))
})
