'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    expiredAt: DataTypes.DATE
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
