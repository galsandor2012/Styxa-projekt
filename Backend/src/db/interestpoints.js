import client from './db.js'

export function createPointOfInterests() {
  client.query(`
        CREATE TABLE IF NOT EXISTS pointofinterests (
            id INT GENERATED ALWAYS AS IDENTITY,
            name VARCHAR(100) NOT NULL,
            description VARCHAR(100),
            city_id INT,
            PRIMARY KEY (id),
            CONSTRAINT fk_city FOREIGN KEY (city_id) REFERENCES city(id)
        )`)
}

export function addColumnsToPointOfInterests() {
  client.query(`
    ALTER TABLE pointofinterests
    ADD COLUMN IF NOT EXISTS googlemapsurl TEXT,
    ADD COLUMN IF NOT EXISTS image TEXT;
`)
}

export async function getPointOfInterests() {
  const pointofinterests = await client.query(`SELECT * FROM pointofinterests`)
  return pointofinterests.rows
}

export async function getPointOfInterestsById(id) {
  try {
    const result = await client.query(
      'SELECT * FROM pointofinterests WHERE id = $1',
      [id]
    )
    if (result.rows.length === 0) {
      throw new Error('PointOfInterest not found')
    }
    return result.rows[0]
  } catch (error) {
    console.error('Error fetching point of interest by ID:', error)
    throw error
  }
}

export async function addPointOfInterests(
  name,
  description,
  city_id,
  googlemapsurl,
  image
) {
  await client.query(`
      INSERT INTO pointofinterests (id, name, description, city_id, googlemapsurl, image)
      VALUES (default, '${name}', '${description}','${city_id}','${googlemapsurl}','${image}'())
  `)
}

export async function updatePointOfInterests(
  name,
  description,
  city_id,
  googlemapsurl,
  image
) {
  const pointofinterests = await client.query(`
        UPDATE pointofinterests
        SET name = '${name}', description = '${description}', city_id = '${city_id}', googlemapsurl = '${googlemapsurl}', image = '${image}'
        WHERE id = ${id}
        `)
  return pointofinterests.rows
}

export async function deletePointOfInterests(id) {
  const pointofinterests = await client.query(`
        DELETE FROM pointofinterests
        WHERE id = ${id}
        `)
  return pointofinterests.rows
}
