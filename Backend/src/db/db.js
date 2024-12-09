import pg from 'pg'

const { Client } = pg

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'styxa_projekt',
  password: '1234',
  port: 5432
})

await client.connect()

export default client
