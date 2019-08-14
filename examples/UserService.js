const models = require('../models');

module.exports.findId = id => {
    return models.user.findByPk(id);
}