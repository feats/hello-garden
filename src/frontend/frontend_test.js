/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
'use strict'

const chai = require('chai')
const supertest = require('supertest')
const nock = require('nock')
const config = require('./config')
const Browser = require('zombie')
const app = require('./index')
const expect = chai.expect

const testPort = 19462
Browser.localhost('myfrontend.io', testPort)

describe('frontend API', () => {
  it('should handle access denied from backend', done => {
    nock(config.backend.url)
    .get('/random')
    .reply(401)
    supertest(app)
    // ------------------------------------------------------------------------
    .get('/answer')
    .set('accept', 'text/plain')
    // ------------------------------------------------------------------------
    .expect('content-type', /text\/plain/)
    .expect(500)
    .expect(res => {
      expect(res.text).to.have.string('backend status error: 401')
    })
    .end(done)
  })

  it('should handle connection problems with backend', done => {
    const error = {'error': 'connection timed out'}
    nock(config.backend.url)
    .get('/random')
    .replyWithError(error)
    supertest(app)
    // ------------------------------------------------------------------------
    .get('/answer')
    .set('accept', 'text/plain')
    // ------------------------------------------------------------------------
    .expect('content-type', /text\/plain/)
    .expect(500)
    .expect(res => {
      expect(res.text).to.have.string('connection timed out')
    })
    .end(done)
  })

  it('should retrieve an answer from the backend', done => {
    nock(config.backend.url)
    .get('/random')
    .reply(200, '1234')
    supertest(app)
    // ------------------------------------------------------------------------
    .get('/answer')
    .set('accept', 'text/plain')
    // ------------------------------------------------------------------------
    .expect('content-type', /text\/plain/)
    .expect(200)
    .expect(res => {
      expect(res.text).to.eql('1234')
    })
    .end(done)
  })
})

describe('frontend web page', () => {
  const browser = new Browser()
  let server

  before(done => {
    server = app.listen(testPort, done)
  })

  beforeEach(() => {
    return browser.visit('/')
  })

  it('should ask a question', () => {
    browser.assert.success()
    browser.assert.text('h1', 'The Oracle')
    browser.assert.text('p', 'Do you want to know the meaning of everything?')
  })

  describe('answer button clicked', () => {
    beforeEach(() => {
      nock(config.backend.url).get('/random').reply(200, '1234')
      return browser.pressButton('#get-answer')
    })

    it('should give an answer', () => {
      browser.assert.success()
      browser.assert.text('p', 'The answer is 1234')
    })

    it('should give an opportunity to have another go', () => {
      browser.assert.success()
      browser.assert.text('button', 'OK, I got it')
    })

    describe('retry button clicked', () => {
      beforeEach(() => {
        return browser.pressButton('#try-again')
      })

      it('should go back to main page', () => {
        browser.assert.success()
        browser.assert.text('p', 'Do you want to know the meaning of everything?')
      })
    })

    afterEach(() => {
      nock.cleanAll()
    })
  })

  after(() => {
    return server.close()
  })
})
