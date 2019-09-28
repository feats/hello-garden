/* eslint-env mocha */
'use strict'

const chai = require('chai')
const request = require('supertest')
const expect = chai.expect

describe('Frontend', () => {
  const app = require('frontend')
  describe('root', () => {
    it('should greet user', done => {
      request(app)
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .expect(res => {
        expect(res.text).to.match(/The answer is [0-9]*/)
      })
      .end(done)
    })
  })
})
