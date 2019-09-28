'use strict'

const express = require('express')

const frontend = express()

frontend.get('/', (req, res) => {
  const number = 42
  res.send(`<html><body><h1>The Oracle</h1><p>The answer is ${number}</p></body></html>`)
})

module.exports = frontend
