import { Sequelize, DataTypes } from "sequelize";

export const db = {
  sqlClient: null,
  sequelize: null,
  isDbRunning: true,
  models: {}
};

export const connectMySQLClient = async () => {
  try {
    db.sqlClient = new Sequelize(
      process.env.DATABASE_URL,
      {
        dialect: process.env.DB_DIALECT,
        operatorsAliases: 0,
        logging: true,
        define: {
          underscored: false,
        },
        logging: false,
      }
    );
    await db.sqlClient
      .authenticate()
      .then(() => {
        console.log(
          "Connection to Client DB has been established successfully."
        );
      })
      .catch((err) => {
        console.error("Unable to connect to the Client database:", err);
      });
  } catch (err) {
    throw err;
  }
}

export const setupModels = async () => {
  db.sequelize = db.sqlClient;

  db.models.Users = require("../../models/users.js")(
    db.sqlClient,
    DataTypes
  );

  /**Associations */

  db.sqlClient.sync({ alter: true });
}

