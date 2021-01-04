import jwt from 'jsonwebtoken'

import { IAuth } from '../../shared/interfaces/auth'
import { config } from '../../shared/environments/environments'
import { IUser } from '../../shared/interfaces/user'
import User from '../../shared/models/user'
import { createHash, compareHash } from '../../shared/utils/hash'

import UserT from '../../shared/models/user2'


class AuthModel {
	private user: any
	private role: any
	private userT: any
	

	constructor() {
		this.role = { name: 'admin'}
		this.user = new User()
		this.userT = new UserT()
	}
	
	// async findUserTwo(body: IUser) {
		// const user: IUser = await this.userT.findUserT(body)
		// return user }
	
		async findUserTwo({ email, password }: IAuth) {
		const user: IUser = await this.userT.findUserT({email})
		
		if (user && user.password) {
		if (compareHash(password, user.password)) {
			delete user.password
			return user
			}
		}
	}

	generateTokenTwo(user: IUser) {
		const jwtSecret = config.jwtSecret
		const payload = { user, role: this.role }
		const token = jwt.sign(payload, jwtSecret, { expiresIn: '8h' })
		return token
	}

	// async createUSerTwo(body: any) {
	// 	const user: IUser = await this.userT.createUserTow(body)
	// 	return user
	// }

	async createUSerTwo(data: IUser) {
		if(data.password && data.password) {
			const _user = { ...data, password: createHash(data.password) }
			const user: IUser = await this.userT.createUserTow(_user)
			return user
		}
	}


	//-----------------------------------REFAZENDO EM CIMA---------

	

	 async findUser  ({ email, password }: IAuth) {
		const user: IUser = await this.user.findUser({email})
		
		if (user && user.password) {
		if (compareHash(password, user.password)) {
			delete user.password
			return user
			}
		}
	}

	async createUSer(data: IUser) {
	if (data.password && data.password) {
	const _user = { ...data, password: createHash(data.password) }
	const user: IUser = await this.user.createUSer(_user)
	 return user
		}
	}
	//generateToken(user: IUser | undefined) {
	generateToken(user: IUser ) {
		const jwtSecret = config.jwtSecret
		const payload = { user, role: this.role }
		const token = jwt.sign(payload, jwtSecret, { expiresIn: '8h' })
		return token
	}
}

export default new AuthModel()

// async login(body: any) {
	// 	const user: IUser = await this.user.createUser(body)
	// 	return user
	// }

// ------------------------------MANUTENÇÃO DO BACK------------------------------------------

// export function authLogout(token: string): boolean {
// 	return !!token
// }

// export function getToken(strToken: any): string {
// 	if (strToken && typeof strToken === 'string'){
// 	const token = strToken.split('Bearer ')[1]
// 	return token
// 	}
// 	return ''
// }

// export function createUSer(user: IUser): any {
// 	if(email && email != "" && password && password != "") {
// 		const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiMTIzNDU2Nzg5MCIsIm5hbWUiOiJmZWxpcGUiLCJpYXQiOjE1MTYyMzkwMjJ9.XdWccZbA2OLmeqy_sixf50ffltRI3thsdcP2_UM1C08'
// 		return token
// 	}
// 	return false
// }

// // mock para depois pegar do banco

// const user = {
// 	name: 'felipe lopes',
// 	email: 'felipe@mail.com',
// 	id: 1
// }

// export function authLogin(email: string, password: string): boolean | string {
// 	if(email && email != "" && password && password != "") {
// 		const payload = {user,role,}
// 		const jwtSecret = config.jwtSecret

// 		const token = jwt.sign(payload, jwtSecret, {expiresIn: '4h'})
		
// 		return token
// 	}
// 	return false
// }


