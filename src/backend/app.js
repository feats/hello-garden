'use strict'

const backend = require('./index')
const config = require('./config').server

const serverListener = backend.listen(config.port, () => {
  console.log(JSON.stringify({
    status: 'Backend running',
    pid: process.pid,
    port: serverListener.address().port
  }))
})
