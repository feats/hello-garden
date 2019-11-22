/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
'use strict'

const chai = require('chai')
const request = require('supertest')
const config = require('./config')

chai.use(require('chai-integer'))
const expect = chai.expect

describe('Backend service', () => {
  it('should return a random number given valid token', done => {
    const auth = `${config.user}:${config.password}`
    const authHeader = 'Basic ' + Buffer.from(auth).toString('base64')
    request(config.backendUrl)
    .get('/random')
    .set('Authorization', authHeader)
    .set('Accept', 'text/plain')
    .expect('Content-Type', /text\/plain/)
    .expect(200)
    .expect(res => {
      expect(res.text).to.be.an.integer()
    })
    .end(done)
  })
})
