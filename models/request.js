'use strict';
module.exports = (sequelize, DataTypes) => {
  const request = sequelize.define('request', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    content: DataTypes.STRING,
    jobId: DataTypes.INTEGER,
    jobOther: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {});
  request.associate = function(models) {
    // associations can be defined here
  };
  return request;
};