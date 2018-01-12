require('dotenv').config()
const express = require('express')
const app = express()
const port = 3033

app.use('/', express.static('static'))

app.use('/api', require('./api'))

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
