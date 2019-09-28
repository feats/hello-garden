'use strict'

const express = require('express')

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
            $("#contents").replaceWith("<p>The answer is 42<p>")
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

module.exports = frontend
