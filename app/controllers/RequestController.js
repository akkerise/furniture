'use strict'

var Services = require('../../services');

const RequestController = {

    async store(req, res) {
        let {err, result} = await Services.Request.store(req.body);
        console.log(err,result);
        if(!err) res.json({message: 'success', result});
        return res.json({message: 'failed', result});
    },

};

module.exports = RequestController;
