import client from './db.js'

export function createCities() {
  client.query(`
        CREATE TABLE IF NOT EXISTS city (
            id INT GENERATED ALWAYS AS IDENTITY,
            name VARCHAR(100) NOT NULL,
            description VARCHAR(100),
            population INT,
            country_id INT,
            PRIMARY KEY (id),
            CONSTRAINT fk_country FOREIGN KEY (country_id) REFERENCES country(id)
        )`)
}

export async function getCities() {
  const counties = await client.query(`SELECT * FROM city`)
  return counties.rows
}

export async function getCityById(id) {
  try {
    const result = await client.query('SELECT * FROM city WHERE id = $1', [id])
    if (result.rows.length === 0) {
      throw new Error('City not found')
    }
    return result.rows[0]
  } catch (error) {
    console.error('Error fetching city by ID:', error)
    throw error
  }
}

export async function addCity(name, description, population, country_id) {
  await client.query(`
      INSERT INTO city (id, name, description, population, country_id)
      VALUES (default, '${name}', '${description}','${population}','${country_id}')
  `)
}

export async function updateCity(name, description, population, country_id) {
  const city = await client.query(`
        UPDATE city
        SET name = '${name}', description = '${description}',  population = '${population}', country_id = '${country_id}'
        WHERE id = ${id}
        `)
  return city.rows
}

export async function deleteCity(id) {
  const city = await client.query(`
        DELETE FROM city
        WHERE id = ${id}
        `)
  return city.rows
}
