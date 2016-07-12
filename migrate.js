// Configuration
var dbTableName = 'w5d2'

// Setup
var fs = require('fs')
var parse = require('csv-parse/lib/sync')
var moment = require('moment')
var knexConfig = require('./knex-config.js')
var knex = require('knex')(knexConfig)

// Create table
knex.schema.createTable(dbTableName, function (table) {
  table.increments()
  table.string('film')
  table.string('stars')
  table.string('rating')
  table.string('votes')
  table.timestamps()
})
  .then(function() {
    console.log('Created ' + dbTableName)

    // Load and parse CSV file
    fs.readFile('./fandango.csv', 'utf8', function(error, csv) {
      var rows = parse(csv)
      var insertCount = 0

      // Loop through CSV file rows
      rows.forEach(function(row, i) {

        // If not header row, insert into table
        if (i > 0) {
          knex(dbTableName).insert({
            film: row[0],
            stars: row[1],
            rating: row[2],
            votes: row[3],
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
          })
            .then(function(){
              insertCount++
              console.log('Inserted ' + row[0])

              // Migration complete
              if (insertCount === rows.length - 1) {
                console.log('Migration complete')
                process.exit()
              }
            })
        }
      })
    })
  })
  .catch(function(err) {
    console.error(err)
  })
