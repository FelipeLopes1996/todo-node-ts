import {Request, Response, NextFunction} from 'express'

import { crawling } from './model'

export const currency = async (req : Request, res : Response, next : NextFunction) => {
    const response = await crawling()
    return res.status(200).json( response )
}


