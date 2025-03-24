import { QueryTypes } from 'sequelize';


class Users {
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

}

module.exports = Users;

