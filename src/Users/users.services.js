
class Users {
  async init(db) {
    this.Models = db.models;
    this.sql = db.sqlClient
  }
  getByEmail = async (email) => {
    return await this.Models.Users.findOne({ where: { email }, raw: true })
  }

  getByUsername = async (username) => {
    return await this.Models.Users.findOne({ where: { username }, raw: true })
  }

  createUser = async (data) => {
    return await this.Models.Users.create(data)
  }

}

module.exports = Users;

