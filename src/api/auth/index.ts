import { Router } from 'express'

import { jwtMiddleware, verifyMiddleware } from '../../shared/middlewares/jwt'
import {loginSchemaTwo, loginSchema, createSchema } from './validation'
import * as controller from './controller'

const routes = Router()  
routes.post('/login', loginSchema, controller.login);
// routes.post('/login', loginSchema, controller.login);

// routes.post('/logout', verifyMiddleware, controller.logout);
routes.post('/logout', jwtMiddleware, controller.logout)

// routes.post('/create', createSchema, controller.create);
routes.post('/create', createSchema, controller.create);

export default routes
