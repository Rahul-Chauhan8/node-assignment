import bcrypt from "bcrypt";
import { saltRounds } from "../../config/keys";

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true, 
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true, 
      },
      password: {
        type: DataTypes.STRING(125),
        allowNull: true,
        defaultValue: null,
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
    },
    {
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
          /**  password encryption **/
          if (user && user.password) {
            user.password = await bcrypt.hash(user.password, saltRounds);
          }
        },
        beforeBulkUpdate: async (user) => {
          if (user && user.attributes && user.attributes.password) {
            // eslint-disable-next-line no-param-reassign
            user.attributes.password = await bcrypt.hash(
              user.attributes.password,
              saltRounds
            );
          }
          if (user && user.attributes && user.attributes.email) {
            // eslint-disable-next-line no-param-reassign
            user.attributes.email = user.attributes.email.toLowerCase();
          }
        },
      },
    }
  );
  return users;
};
