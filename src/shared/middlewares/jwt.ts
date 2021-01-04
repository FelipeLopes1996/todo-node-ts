import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'

import {config} from '../environments/environments'
import {IPayload} from '../interfaces/payload'

export const jwtMiddleware = (req : Request, res : Response, next : NextFunction) => {
    const { 'x-access-token': acessToken } = req.headers
    if (!acessToken) {
        return res.status(401).json({message: 'no token provider'})
    }
    const token = typeof acessToken === 'string' ? acessToken : acessToken[0]
    const jwtSecret = config.jwtSecret

    jwt.verify(token, jwtSecret, (err, dec) => {
        if (err) {
            return res.status(401).send({ message: 'Failed authenticate' })
        }

        let decoded: IPayload | undefined = {} 

        if (decoded?.user?.id) {
            req.headers['x-userid'] = String(decoded?.user?.id)
        }

        next()
    })
}

// ---------------------------------------- CODIGO ACIMA VELHO A BAIXO NOVO ------------------

const verifyMiddleware = (req : Request, res : Response, next : NextFunction) => {
    const {'x-access-token': accessToken} = req.headers;
    if (!accessToken) {
        return res.status(401).json({message: 'no token provided'})
    }

    const token = typeof accessToken === 'string' ? accessToken : accessToken[0]
    const jwtSecret = config.jwtSecret

    jwt.verify(token, jwtSecret, (err) => {
        if (err) {
            return res.status(401).json({message: 'Failed to authenticate token'})
        }

        let decoded: IPayload | undefined = {};

        if (decoded.user?.id) {
            req.headers['x-userid'] = String(decoded.user.id)
        }

        next();
    });
}

export { verifyMiddleware }
