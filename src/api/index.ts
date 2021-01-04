import { Router } from 'express'

import { verifyMiddleware , jwtMiddleware} from '../shared/middlewares/jwt'
import auth from './auth'
import user from './user'
import currency from './currency'

const routes = Router()

routes.use('/auth', auth)
routes.use('/user', jwtMiddleware, user)
routes.use('/currency', jwtMiddleware, currency)

export default routes


// try {
//     const user = await Model.findUserTwo(req.body)
//     if (user) {
//     const token = Model.generateTokenTwo(user)
//     return res.status(200).json({token})
//     } 
//     res.status(401).json({login: "user it's not provider!"})
// } catch (error) {
//     res.status(401).json({login: "user it's not provider!"})
// }
// }