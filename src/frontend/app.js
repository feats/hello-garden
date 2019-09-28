'use strict'

const frontend = require('frontend')
const tcp = require('__/tcp')
const port = tcp.normalizePort(process.env.PORT) || 5000

const serverListener = frontend.listen(port, () => {
  console.log(JSON.stringify({
    status: 'Frontend up',
    pid: process.pid,
    port: serverListener.address().port
  }))
})
