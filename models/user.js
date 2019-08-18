'use strict';
var bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        password: DataTypes.STRING,
        accessToken: DataTypes.STRING,
        expiredAt: DataTypes.DATE
    }, {
        // freezeTableName: true,
        hooks: {
            beforeCreate(user, options) {
                return bcrypt.hash(user.password, 10)
                    .then(hash =>{
                        user.password = hash;
                    })
                    .catch(e => {
                        throw new Error('Error hash password');
                    });
            }
        },
        instanceMethods: {
            validPassword: function (password) {
                return bcrypt.compareSync(password, this.password);
            }
        }
    });

    // sequelize.sync()
    //     .then(() => console.log('User successfully created'))
    //     .catch(err => console.log('This error occured', err));

    user.associate = function (models) {
        // associations can be defined here

    };

    return user;


};


