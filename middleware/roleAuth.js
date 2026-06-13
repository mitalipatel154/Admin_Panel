module.exports.checkRole = (...roles) => {
    return (req, res, next) => {

        if (!req.isAuthenticated() || !req.user) {
            req.flash('error', 'Please login first');
            return res.redirect('/');
        }

        if (!roles.includes(req.user.role)) {
            req.flash('error', 'Access Denied');
            return res.redirect('/dashboard');
        }

        next();
    };
};