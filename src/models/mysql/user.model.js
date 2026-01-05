// models/mysql/user.model.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    name: DataTypes.STRING
  });
};
