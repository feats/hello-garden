'use strict'

const express = require('express')
const frontend = express()

frontend.get('/', (req, res) => {
  res.send('hello')
})

module.exports = frontend
