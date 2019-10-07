'use strict';
const bcrypt = require('bcrypt');
const SR = require('../utilities/helper/service-response');
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
                    .then(hash => user.password = hash)
                    .catch(e => {
                        throw new Error('Error hashing password!')
                    });
            }
        },
        instanceMethods: {
            validPassword: function (password) {
                return bcrypt.compareSync(password, this.password);
            }
        }
    });

    user.authenticate = async (email, password) => {
        if (!email && !password) return SR.failed(`Email or password is invalid!`);
        try {
            const info = await user.findOne({where: {email}});
            const match = await bcrypt.compare(password, info.password);
            if (!match) return SR.failed(`Error compare password!`);
            return SR.success(`Get user is logged!`, info);
        } catch (e) {
            return SR.failed(`Authenticate failed!`);
        }
    };

    user.associate = models => {
    };

    return user;
};


