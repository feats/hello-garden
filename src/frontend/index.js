'use strict'

const express = require('express')
const request = require('request')
const backend = require('./config').backend

const frontend = express()

frontend.get('/', (req, res) => {
  res.send(`<!DOCTYPE html><html>
    <head>
      <script type="text/javascript"
        src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js">
      </script>
      <script type="text/javascript">
        $(document).ready(() => {
          $("#get-answer").click(() => {
            $.ajax({
              method: "GET",
              url: "/answer",
              success: (data) => {
                $("#contents").replaceWith(
                  "<p>The answer is "+data+"</p><button id=\\"try-again\\">OK, I got it</button>"
                )
                $("#try-again").click(() => {
                  location.reload(true)
                })
              },
              error: (err) => {
                console.log('got error:' + JSON.stringify(err))
                $("#contents").replaceWith("<p>The answer is unknown<p>")
              }
            })
          })
        })
      </script>
    </head>
    <body>
      <h1>The Oracle</h1>
      <div id="contents">
        <p>Do you want to know the meaning of everything?</p>
        <button id="get-answer">Please tell me</button>
      </div>
    </body></html>`)
})

frontend.get('/answer', (req, res) => {
  const options = {
    url: `http://${backend.url}/random`,
    headers: {
      'Authorization': `Basic ${Buffer.from(backend.auth).toString('base64')}`
    }
  }
  request(options, (err, backendRes, body) => {
    res.set('Content-Type', 'text/plain')
    if (err) {
      const msg = `backend error: ${JSON.stringify(err)}`
      return res.status(500).send(msg)
    }
    if (backendRes.statusCode !== 200) {
      const msg = `backend status error: ${backendRes.statusCode}`
      return res.status(500).send(msg)
    }
    res.send(body.toString())
  })
})

module.exports = frontend
