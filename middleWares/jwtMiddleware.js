const jwt = require('jsonwebtoken')
const jwtMiddleware = (req, res, next) => {
    console.log('Inside jwt middleware');
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);
    try {
        const jwtResponse = jwt.verify(token,'supersecretkey1234')
        console.log('jwt response----', jwtResponse);
        req.payload = jwtResponse.userId 
        next()
    } catch (err) {
        res.status(401).json('Authorization failed,Please login!?')
    }
}

module.exports = jwtMiddleware;