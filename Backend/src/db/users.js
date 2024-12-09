import client from './db.js'

export function createUsers() {
  client.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT GENERATED ALWAYS AS IDENTITY,
            firstname VARCHAR(100) NOT NULL,
            lastname VARCHAR(100) NOT NULL,
            username VARCHAR(100) NOT NULL,
            password VARCHAR(100),
            PRIMARY KEY (id)
        )`)
}

export async function getUsers() {
  const users = await client.query(`SELECT * FROM users`)
  return users.rows
}

export async function addUser(firstname, lastname, username, password) {
  await client.query(`
    INSERT INTO users (id, firstname, lastname, username, password)
    VALUES (default, '${firstname}', '${lastname}','${username}', '${password}')
`)
}

export async function updateUser(id, firstname, lastname, username, password) {
  const user = await client.query(`
    UPDATE users
    SET firstname = '${firstname}', lastname = '${lastname}', username = '${username}', password = '${password}'
    WHERE id = ${id}
    `)
  return user.rows
}

export async function deleteUser(id) {
  const user = await client.query(`
        DELETE FROM users
        WHERE id = ${id}
        `)
  return user.rows
}

export async function userLogin(id) {
  await client.query(`
      SELECT * FROM users
      WHERE id = '${id}'
  `)
}
