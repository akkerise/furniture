module.exports.logged = function (req, res, next) {
    if (req.session && req.session.user) {
        res.locals.site = {
            title: 'Furniture Backend',
            slogan: 'Your space is my glory!',
            description: 'Furniture Operation',
        };
        return next();
    } else {
        let err = new Error(`You must be logged in to view this page.`);
        err.status = 401;
        return next(err);
    }
};
