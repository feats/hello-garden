'use strict'

const backend = require('backend')
const config = require('backend/config').server

const serverListener = backend.listen(config.port, () => {
  console.log(JSON.stringify({
    status: 'Backend running',
    pid: process.pid,
    port: serverListener.address().port
  }))
})
