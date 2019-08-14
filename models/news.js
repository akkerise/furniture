'use strict';
module.exports = (sequelize, DataTypes) => {
  const news = sequelize.define('news', {
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    author: DataTypes.STRING,
    crawlLink: DataTypes.TEXT,
    crawlAt: DataTypes.DATE
  }, {});
  news.associate = function(models) {
    // associations can be defined here
  };
  return news;
};