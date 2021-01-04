import { Router } from 'express'

import * as controller from './controller'

const routes = Router()

routes.get('/', controller.currency);

export default routes


