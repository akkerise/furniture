'use strict';
module.exports = (sequelize, DataTypes) => {
  const news_tag = sequelize.define('news_tag', {
    news_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  }, {});
  news_tag.associate = function(models) {
    // associations can be defined here
  };
  return news_tag;
};