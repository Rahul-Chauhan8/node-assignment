
import { QueryTypes } from 'sequelize';


class Auth {
  async init(db) {
    this.Models = db.models;
    this.sql = db.sqlClient
  }

  async getByEmail(email) {
    const query = `SELECT * FROM users WHERE email = :email LIMIT 1`;
    const [results] = await this.sql.query(query, {
      replacements: { email },  // ✅ Secure way to pass variables
      type: QueryTypes.SELECT,
    });
    return results || null;
  }

  async getByUsername(username) {
    const query = `SELECT * FROM users WHERE username = :username LIMIT 1`;
    const [results] = await this.sql.query(query, {
      replacements: { username },
      type: QueryTypes.SELECT,
    });
    return results || null;
  }

  async createUser(data) {
    const query = `
        INSERT INTO users (username, email, password)
        VALUES (:username, :email, :password)
        RETURNING *`;
    const [results] = await this.sql.query(query, {
      replacements: {
        username: data.username,
        email: data.email,
        password: data.password
      },
      type: QueryTypes.INSERT,
    });
    return results || null;
  }
}

module.exports = Auth;

