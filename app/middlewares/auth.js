const Flash = require('../../utilities/helper/flash');

module.exports.logged = function (req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        // let err = {message: 'You must be logged in to view this page.', status: false};
        // Flash.set(err);
        // return res.redirect('/auth/login', Flash.message);
        let err = new Error('You must be logged in to view this page.');
        err.status = 401;
        return next(err);
    }
}
