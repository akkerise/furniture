'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('news', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      categoryId: {
        type: Sequelize.INTEGER(11)
      },
      name: {
        type: Sequelize.STRING(255)
      },
      content: {
        type: Sequelize.STRING(10000)
      },
      author: {
        type: Sequelize.STRING(255)
      },
      crawlLink: {
        type: Sequelize.STRING(2000)
      },
      crawlAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('news');
  }
};
