'use strict'

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.json({
    siteversion: require('../../package').version,
    apiversion: '1',
    hostname: req.hostname,
    address: req.ip,
    protocol: req.protocol
  })
})

app.get('/random', (req, res) => {
  res.set('Content-Type', 'text/plain')
  const number = 1
  res.send(number.toString())
})

module.exports = app
