import {Request, Response, NextFunction} from 'express'
import { IUser } from '../../shared/interfaces/user'
import Model from './model'



const login = async (req : Request, res : Response, next : NextFunction): Promise<any> => {
    try {
        const user: any = await Model.findUserTwo(req.body)  
            if(user){
            const token = Model.generateTokenTwo(user)
            return res.status(200).json({token})
            }
        } catch (error) {
         return res.status(401).json({login: "user it's not provider!"})
        }
       return res.status(401).json({login: "user it's not provider!"})
    }
    

const logout = (req : Request, res : Response, next : NextFunction) => {
    res.status(200).json( "Logout it's ok" )
    // const { 'x-access-token': acessToken } = req.headers
    // const token = model.getToken(acessToken)

    // const isLogout = model.authLogout(token)
    // if (isLogout) {
    //     res.status(200).json( "login it's ok" )
    // } else {
    //     res.status(401).json({ login: "login it's fail "})
    // }
}

const create = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const user: any = await Model.createUSerTwo(req.body)
        const token = Model.generateTokenTwo(user)
        res.status(200).json({token})
    } catch (error) {
        res.status(401).json({create: "Server Error!"})
    }

}

export {
    login,
    logout,
    create
}
