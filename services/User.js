var models = require('../models');

module.exports = () => {
    const User = {};
    User.findId = function(id) {
        return models.user.findByPk(id);
    }
    User.associate = function(Services){
        // need define
    }
    return User;
};
