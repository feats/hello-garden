'use strict'

const express = require('express')
const backend = express()

backend.get('/', (req, res) => {
  res.json({
    siteversion: require('../package').version,
    apiversion: '1',
    hostname: req.hostname,
    address: req.ip,
    protocol: req.protocol
  })
})

backend.get('/random', (req, res) => {
  res.set('Content-Type', 'text/plain')
  res.set('Access-Control-Allow-Origin', '*')
  const number = Math.floor(Math.random() * 65536)
  res.send(number.toString())
})

module.exports = backend
