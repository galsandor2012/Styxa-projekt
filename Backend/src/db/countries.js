import client from './db.js'

export function createCountry() {
  client.query(`
        CREATE TABLE IF NOT EXISTS country (
            id INT GENERATED ALWAYS AS IDENTITY,
            name VARCHAR(100) NOT NULL,
            description VARCHAR(100),
            latitude REAL,
            longitude REAL,
            PRIMARY KEY (id)
        )`)
}

export async function getCounties() {
  const counties = await client.query(`SELECT * FROM country`)
  return counties.rows
}

export async function getCountryById(id) {
  try {
    const result = await client.query('SELECT * FROM country WHERE id = $1', [
      id
    ])
    if (result.rows.length === 0) {
      throw new Error('Country not found')
    }
    return result.rows[0]
  } catch (error) {
    console.error('Error fetching country by ID:', error)
    throw error
  }
}

export async function addCountry(name, description, latitude, longitude) {
  await client.query(`
      INSERT INTO country (id, name, description, latitude, longitude)
      VALUES (default, '${name}', '${description}','${latitude}','${longitude}'())
  `)
}

export async function updateCountry(name, description, latitude, longitude) {
  const country = await client.query(`
        UPDATE country
        SET name = '${name}', description = '${description}',  latitude = '${latitude}', longitude = '${longitude}'
        WHERE id = ${id}
        `)
  return country.rows
}

export async function deleteCountry(id) {
  const country = await client.query(`
        DELETE FROM country
        WHERE id = ${id}
        `)
  return country.rows
}
