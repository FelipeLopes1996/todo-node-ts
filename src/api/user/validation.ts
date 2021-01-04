import {Request as Req, Response as Res, NextFunction as Next} from 'express'
import Joi from 'joi'

const options = {
    abortEarly: false, // aborta a requisição
    allowUnknown: true, // qualqquer problema vou apontar um erro
    stripUnknown: true // objetos de erros
}

export const storeSchemaTwo = (req : Req, res : Res, next : Next) => {
	const regEx = /^[0-9]+$/

	const schema: Joi.ObjectSchema = Joi.object({
		name: Joi.string(),
		avata: Joi.string(),
		username: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().pattern(regEx, 'number').min(6).required(),
		confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
	})

	const { error, value} = schema.validate(req.body, options)
	if (error) {
		const message = error.details.map(v => v.message).join(', ')
		return res.status(401).json({ message })
		// next(`Validation error: ${error.details.map(v => v.message).join(',')}`)
	} else {
		delete value.confirmPassword
		req.body = value
		next()
	}
}

export const paramsSchemaTwo = (req : Req, res : Res, next : Next) => {
		const schema: Joi.ObjectSchema = Joi.object({
		id: Joi.number().required()
	})

	const { error, value} = schema.validate(req.params, options)

	if (error) {
		const message = error.details.map(v => v.message).join(', ')
		return res.status(401).json({ message })
	} else {
		req.params = value
		next()
	}
}



//----------------------PRATICANDO O CÓDIGO ---------------------

const storeSchema = (req : Req, res : Res, next : Next) => {
    const regEx = /^[0-9]+$/

    const schema: Joi.ObjectSchema = Joi.object({
        name: Joi.string(),
        avata: Joi.string(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(regEx, 'numbers').min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    })

		const { error, value } = schema.validate(req.body, options)

		if(error) {
			const message = error.details.map(v => v.message).join(', ')
			return res.status(401).json({ message })
		} else {
			delete value.confirmPassword
			req.body = value;
			next()
		}
}

const updateSchema = (req : Req, res : Res, next : Next) => {
    const regEx = /^[0-9]+$/

    const schema: Joi.ObjectSchema = Joi.object({
        name: Joi.string(),
        avata: Joi.string(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(regEx, 'numbers').min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    })

		const { error, value } = schema.validate(req.body, options)

		if(error) {
			const message = error.details.map(v => v.message).join(', ')
			return res.status(401).json({ message })
		} else {
			delete value.confirmPassword
			req.body = value;
			next()
		}
}

const paramsSchema = (req : Req, res : Res, next : Next) => {
	const schema: Joi.ObjectSchema = Joi.object({
			id: Joi.number().required()
			})

	const { error, value } = schema.validate(req.params, options)

	if(error) {
		const message = error.details.map(v => v.message).join(', ')
		return res.status(401).json({ message })
	} else {
		req.params = value;
		next()
	}

}

export { storeSchema, paramsSchema, updateSchema }
