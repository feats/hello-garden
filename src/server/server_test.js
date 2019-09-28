/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
'use strict'

const chai = require('chai')
const request = require('supertest')

chai.use(require('chai-integer'))
const expect = chai.expect

describe('server API', () => {
  const app = require('server')
  describe('root', () => {
    it('should return a JSON structure with version and address', done => {
      request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(res => {
        expect(res.body).to.have.property('address')
        expect(res.body).to.have.property('apiversion')
        expect(res.body.apiversion).to.equal('1')
        expect(res.body).to.have.property('siteversion')
        expect(res.body.siteversion).to.equal('0.1.0')
      })
      .end(done)
    })
  })
  describe('random', () => {
    it('should return a random number', done => {
      request(app)
      .get('/random')
      .set('Accept', 'text/plain')
      .expect('Content-Type', /text\/plain/)
      .expect(200)
      .expect(res => {
        const numberX = res.text
        expect(numberX).to.be.an.integer()
      })
      .end(done)
    })
  })
})
