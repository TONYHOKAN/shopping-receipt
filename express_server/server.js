const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react_client/build')))

// Answer API requests.
app.get('/api', function (req, res) {
  console.log(`request to ${req.originalUrl}`)
  res.set('Content-Type', 'application/json')
  res.send('{"message":"Hello from the custom server!"}')
})

// All remaining requests return the React app, so it can handle routing.
app.get('*', function (req, res) {
  console.log(`request to ${req.originalUrl}`)
  res.sendFile(path.resolve(__dirname, '../react_client/build', 'index.html'))
})

app.listen(PORT, function () {
  console.log(`${new Date()} Listening on port ${PORT}`)
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
})
