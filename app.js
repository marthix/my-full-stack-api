// SETUP
var knexConfig = require('./knex-config.js')
var knex = require('knex')(knexConfig)
var express = require('express')
var app = express()
var port = process.env.PORT || 8000

// ROUTES
app.get('/api/v1', function (req, res) {
  var knexQuery = knex.select().from('w5d2')

  if (req.query.sort) {
    knexQuery = knexQuery.orderBy(req.query.sort, req.query.direction)
  } else {
    knexQuery = knexQuery.orderBy('id')
  }

  knexQuery.then(function(data) {
    res.json(data)
  })
})

// Start the server
app.use(express.static('public'))
app.listen(port)
console.log('Public server: http://localhost:' + port)
console.log('API server: http://localhost:' + port + '/api/v1')
console.log('Press CTRL+C to exit.')
