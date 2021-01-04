import { Router, Request, Response, NextFunction } from 'express'

import api from './api'

const routes = Router();

//para saber se a aplicação está viva e direcionando para a rota.
routes.get('/health', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ server: "server it's works" })
})

// Routes Api
// routes.use('/api', api)
 routes.use(api)

export default routes;
