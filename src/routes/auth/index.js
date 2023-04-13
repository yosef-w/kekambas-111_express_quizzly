const jwt = require('jsonwebtoken');

const unprotectedRoutes = [
    "/auth/register",
    "/auth/login",
    "/graphql"
];

const authenticate = (req, res, next) => {
    try{
        const token = req.cookies?.jwtoken || ""
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.verifiedUser = verified.user;
        next()
    } catch (err){
        if (unprotectedRoutes.includes(req.path)){
            next();
        } else {
            res.redirect('/auth/login');
        }
    }
}

module.exports = { authenticate }