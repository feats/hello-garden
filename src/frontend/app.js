'use strict'

const frontend = require('frontend')
const config = require('frontend/config').server

const serverListener = frontend.listen(config.port, () => {
  console.log(JSON.stringify({
    status: 'Frontend running',
    pid: process.pid,
    port: serverListener.address().port
  }))
})
