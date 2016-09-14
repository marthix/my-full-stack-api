module.exports = {
    client: 'pg',
    // connection: 'postgres://localhost/w5d2',
    connection: process.env.DATABASE_URL
}
