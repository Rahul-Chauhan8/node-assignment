import { QueryTypes } from 'sequelize';
import { db } from '../helpers/db'


export const getByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = :email LIMIT 1`;
  const [results] = await db.sequelize.query(query, {
    replacements: { email },
    type: QueryTypes.SELECT,
  });
  return results || null;
}