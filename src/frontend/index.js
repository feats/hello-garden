'use strict'

const express = require('express')

const frontend = express()

frontend.get('/', (req, res) => {
  const number = 42
  res.send(`The answer is ${number}`)
})

module.exports = frontend
