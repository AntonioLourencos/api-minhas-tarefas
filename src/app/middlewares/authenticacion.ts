import { config } from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { TokenNotProvided, TokenMalformed, TokenInvalid } from '@/utils/messages/errors/Authentication';

const MiddleAuth = (req: Request, res: Response, next: NextFunction) => {
    config();

    const JWT_REQUEST = req.headers.authorization;
    const { SECRET_KEY } = process.env;

    if (!JWT_REQUEST) {
        return res.status(401).send({ message: TokenNotProvided });
    }
    const token = JWT_REQUEST!.split(' ');

    if (!(token[0].toLowerCase() === 'bearer')) {
        return res.status(401).send({ message: TokenMalformed });
    }

    JWT.verify(token[1], SECRET_KEY!, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: TokenInvalid });
        }

        return next();
    });
};

export default MiddleAuth;
