module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  // connection: 'postgres://localhost/portfolio',
  searchPath: 'knex,public'
}
