/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
'use strict'

const chai = require('chai')
const request = require('supertest')
const config = require('./config')

const expect = chai.expect

describe('Frontend service', () => {
  it('should present front page with oracle button', done => {
    request(config.frontendUrl)
    .get('/')
    .set('Accept', 'text/html')
    .expect('Content-Type', /text\/html/)
    .expect(200)
    .expect(res => {
      expect(res.text).to.have.string('Do you want to know the meaning of everything?')
      expect(res.text).to.have.string('<button id="get-answer">Please tell me</button>')
    })
    .end(done)
  })
  it('should return a random number when button is pressed')
})
