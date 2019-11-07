/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
'use strict'

const chai = require('chai')
const request = require('supertest')

chai.use(require('chai-integer'))
const expect = chai.expect

describe('backend API', () => {
  const app = require('./')
  describe('endpoint /', () => {
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
        expect(res.body.siteversion).to.equal('0.3.0')
      })
      .end(done)
    })
  })
  describe('endpoint /random', () => {
    it('should return Access Denied given invalid token')
    it('should return a random number given valid token')
    it('should return a random number', done => {
      let firstNumber
      request(app)
      .get('/random')
      .set('Accept', 'text/plain')
      .expect('Content-Type', /text\/plain/)
      .expect(200)
      .expect(res => {
        firstNumber = res.text
        expect(firstNumber).to.be.an.integer()
      })
      .then(() => {
        request(app)
        .get('/random')
        .set('Accept', 'text/plain')
        .expect('Content-Type', /text\/plain/)
        .expect(200)
        .expect(res => {
          const secondNumber = res.text
          expect(secondNumber).to.be.an.integer()
          expect(secondNumber).to.not.equal(firstNumber)
        })
        .end(done)
      })
    })
  })
})
