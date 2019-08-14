'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {});
  category.associate = function(models) {
    // associations can be defined here
  };
  return category;
};