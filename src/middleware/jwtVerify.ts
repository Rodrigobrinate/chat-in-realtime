const jwt = require('jsonwebtoken');
import {Request, Response, NextFunction } from "express";
import User from "../interfaces/User.interface";





 export default function verifyJWT(req: Request, res: Response, next: NextFunction){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, 'process.env.SECRET', function(err: Error, decoded: User) {
      if (err) return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
      
      
      // se tudo estiver ok, salva no request para uso posterior
      req.body.user = decoded;
      next();
    });
}

