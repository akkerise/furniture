'use strict';
module.exports = (sequelize, DataTypes) => {
  const job = sequelize.define('job', {
    name: DataTypes.STRING
  }, {});
  job.associate = function(models) {
    // associations can be defined here
  };
  return job;
};