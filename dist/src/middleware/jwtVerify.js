"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token)
        return res.status(401).json({ auth: false, message: 'No token provided.' });
    jwt.verify(token, 'process.env.SECRET', function (err, decoded) {
        if (err)
            return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
        // se tudo estiver ok, salva no request para uso posterior
        req.body.user = decoded;
        next();
    });
}
exports.default = verifyJWT;
