const axios = require('axios')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello from Express!')
})

router.get('/conversations', async function(req, res) {
  const email = req.query.email
  if (!email) res.send({})
  try {
    const resp = await axios({
      method: 'get',
      url: 'https://api.intercom.io/conversations', 
      params: { email, type: 'user' },
      headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        Accept: 'application/json',
      },
    })
    res.send(resp.data)
  } catch(e) {
    res.send({})
  }
})

module.exports = router
