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
          expect(res.body.siteversion).to.equal('0.4.0')
        })
        .end(done)
    })
  })
  describe('endpoint /random', () => {
    it('should return Unauthorized given no token', done => {
      request(app)
        .get('/random')
        .expect(401)
        .end(done)
    })
    it('should return Unauthorized given invalid token', done => {
      const authHeader = 'Basic ' + Buffer.from('h4ck3r:s3cr3t').toString('base64')
      request(app)
        .get('/random')
        .set('Authorization', authHeader)
        .expect(401)
        .end(done)
    })
    it('should return a random number given valid token', done => {
      const authHeader = 'Basic ' + Buffer.from('frontend:s3cr3t').toString('base64')
      let firstNumber
      request(app)
        .get('/random')
        .set('Authorization', authHeader)
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
            .set('Authorization', authHeader)
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
        .catch(done)
    })
  })
})
