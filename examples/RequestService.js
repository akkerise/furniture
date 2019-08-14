'use strict'

var models = require('../models');

module.exports.findId = function(id){
    return models.request.findByPk(id);
}