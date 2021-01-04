import { Router } from 'express'

import { storeSchemaTwo, paramsSchemaTwo, updateSchema } from './validation'
import * as controller from './controller'

const routes = Router()

routes.get('/', controller.indexTwo)
routes.get('/show/:id', paramsSchemaTwo, controller.showTwo)
routes.post('/', storeSchemaTwo, controller.storeTwo)
routes.put('/:id', updateSchema, controller.updateTwo)
routes.delete('/:id', paramsSchemaTwo, controller.destroyTwo)

// routes.get('/', controller.list)

// routes.get('/', controller.index);
// routes.get('/show/:id', paramsSchema, controller.show);
// routes.post('/', storeSchema, controller.store);
// routes.put('/:id', updateSchema, controller.update);
// routes.delete('/:id', paramsSchema, controller.destroy);

export default routes
