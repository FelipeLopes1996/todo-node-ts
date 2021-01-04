import {Request as Req, Response as Res, NextFunction as Next} from 'express'
import Joi from 'joi'

const options = {
    abortEarly: false, // aborta a requisição
    allowUnknown: true, // qualqquer problema vou apontar um erro
    stripUnknown: true // objetos de erros
}

const  loginSchemaTwo = (req : Req, res : Res, next : Next) => {
	const regEx = /^[0-9]+$/

	const schema: Joi.ObjectSchema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().pattern(regEx, 'numbers').min(6).required(),
	})

	const { error, value } = schema.validate(req.body, options)

	if(error) {
		const message = error.details.map(v => v.message).join(', ')
		return res.status(401).json({ message })
	} else {
		req.body = value;
		next()
	}

}

// const createSchemaTwo = (req : Req, res : Res, next : Next) => {
// 	const regEx = /^[0-9]+$/

// 	const schema: Joi.ObjectSchema = Joi.object({
// 		name: Joi.string(),
// 		avata: Joi.string(),
// 		username: Joi.string().required(),
// 		email: Joi.string().email().required(),
// 		password: Joi.string().pattern(regEx, 'number').min(6).required(),
// 		confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
// 	})

// 	const { error, value} = schema.validate(req.body, options)
// 	if (error) {
// 		const message = error.details.map(v => v.message).join(', ')
// 		return res.status(401).json({ message })
// 		// next(`Validation error: ${error.details.map(v => v.message).join(',')}`)
// 	} else {
// 		delete value.confirmPassword
// 		req.body = value
// 		next()
// 	}

// }



//----------------------REVISANDO E REFAZENDO CÓDIGO ----------------

const loginSchema = (req : Req, res : Res, next : Next) => {
	const regEx = /^[0-9]+$/

	const schema: Joi.ObjectSchema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().pattern(regEx, 'numbers').min(6).required()
	})

	const { error, value } = schema.validate(req.body, options)

	if(error) {
		const message = error.details.map(v => v.message).join(', ')
		return res.status(401).json({ message })
	} else {
		req.body = value;
		next()
	}
}

const createSchema = (req : Req, res : Res, next : Next) => {
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
		//next(`Validation error: ${error.details.map(v => v.message).join(', ')}`)
	} else {
		delete value.confirmPassword
		req.body = value;
		next()
	}
}

export { loginSchema, createSchema, loginSchemaTwo,  } 

// createSchemaTwo
