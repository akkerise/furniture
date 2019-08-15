var models = require('../models');

module.exports = {
    async store(params){
        let {err, request} = this.findWhere(params);
        if(err){
          if(!request){
              try{
                  let result = models.request.create(params);
                  return {err: null, result};
              }catch (e) {
                  return {err: JSON.stringify(e)};
              }
          }
          return {err: {message:'Request an existing record!'}};
        }else{
            return {err: {message: 'Exception'}};
        }
    },
    findWhere(params){
        let {name, email, phone} = params;
        return models.request.findOne({where: {name,email,phone}})
            .then(function (request) {
                return {err: true, request};
            })
            .catch(function (e) {
                return {err: false};
            });
    }
}