'use strict'

const frontend = require('./')
const config = require('./config').server

const serverListener = frontend.listen(config.port, () => {
  console.log(JSON.stringify({
    status: 'Frontend running',
    pid: process.pid,
    port: serverListener.address().port
  }))
})

