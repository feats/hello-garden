/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
'use strict'

const chai = require('chai')
const request = require('supertest')
const backend = require('./config').backendUrl

chai.use(require('chai-integer'))
const expect = chai.expect

describe('Backend service', () => {
  it('should return a random number given valid token', done => {
    const authHeader = 'Basic ' + Buffer.from('frontend:s3cr3t').toString('base64')
    request(backend)
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
