const appMiddleware = (req, res, next) => {
    console.log('inside app Middleware');
    next();
}
module.exports = appMiddleware;