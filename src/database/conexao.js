const {Pool} = require('pg');

const pool = new Pool({
  host: 'isabelle.db.elephantsql.com',
  port: 5432,
  user: 'uexslnsw',
  password: 'ELtVEHRVZFYjTlva688jJ6bCU7hHKSk0',
  database: 'uexslnsw'
})

module.exports = pool;