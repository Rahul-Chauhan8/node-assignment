
import { QueryTypes } from 'sequelize';


import { db } from '../helpers/db'

// export let db = null;
// let sql = null;

// export const initializeDB = async () => {
//   if (!db) {
//     db = await getDB();
//     sql = db.sequelize
//     return db
//   }
// };

export const getByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = :email LIMIT 1`;
  const [results] = await db.sequelize.query(query, {
    replacements: { email },  // ✅ Secure way to pass variables
    type: QueryTypes.SELECT,
  });
  return results || null;
}

export const getByUsername = async (username) => {
  const query = `SELECT * FROM users WHERE username = :username LIMIT 1`;
  const [results] = await db.sequelize.query(query, {
    replacements: { username },
    type: QueryTypes.SELECT,
  });
  return results || null;
}

export const createUser = async (data) => {
  const query = `
        INSERT INTO users (username, email, password)
        VALUES (:username, :email, :password)
        RETURNING *`;
  const [results] = await db.sequelize.query(query, {
    replacements: {
      username: data.username,
      email: data.email,
      password: data.password
    },
    type: QueryTypes.INSERT,
  });
  return results || null;
}

// export const getByEmail = async (email) => {
  
//   return await db.models.Users.findOne({where:{email},raw:true})
// }