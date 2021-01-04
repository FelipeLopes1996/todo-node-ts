import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import routes from './routes'

class Server {

    public express: express.Application

    constructor() {

        this.express = express()
        this.initialize()
		}

    private middlewares() {
        //this.express.use(express.json({limit: '50mb'}));
				// faz requisição de extensão de hash
        this.express.use(bodyParser.urlencoded({ extended: true }))
				//se for estrutura json pega as info em uma velo de 5mp
	    	this.express.use(bodyParser.json({ limit: '5mb'}))
				//faz requisição pro localhost (avisando q é seguro.)
        this.express.use(cors())
    }

    private routes() {
        this.express.use(routes)
    }

    private initialize() {
        this.middlewares()
        this.routes()
    }
}

export default new Server().express
