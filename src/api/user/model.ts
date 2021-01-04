import User from '../../shared/models/user'
import UserT from '../../shared/models/user2'
import { IUser } from '../../shared/interfaces/user'

class UserModel {
	private user: any
	private userT: any

	constructor() {
		this.user = new User()
		this.userT = new UserT()
	}
	// lógica de négocio do projeto
	// os que tem o T são para recriação do códiog e revisão

	async indexTwo() {
		const users: IUser[] = await this.userT.listUserT()
		return users
	}

	async findTwo(body: any) {
		try {
			const user: IUser = await this.userT.findUserT(body)
			return user
		} catch (error) {
			return error
		}
	}

	async createTwo(body: any) {
		const user: IUser = await this.userT.createUserTow(body)
		return user
	}

	async updateTwo(id: number, body: any) {
		const user: IUser = await this.userT.updateUserTwo(id, body)
		return user
	}

	// const user: IUser = await this.user.updateUser(id, body)
	// 	return user

	async destroyTwo(id: number) {
		await this.userT.DestroyUserTwo(id)
	}

// ----------------------- METÓDOS DE REVISÃO CIMA ------------------

	async index() {
		const users: IUser[] = await this.user.listUsers()
		return users
	}

	

	async find(body: any) {
		try {
			const user: IUser = await this.user.findUser(body)
			return user
		}
		catch (error){
			return error
		}
	}

	async create(body: any) {
		const user: IUser = await this.user.createUser(body)
		return user
	}

	async update(id: number, body: any) {
		const user: IUser = await this.user.updateUser(id, body)
		return user
	}

	async destroy(id: number) {
		await this.user.deleteUser(id)
	}
}

export default new UserModel()
// auto instânciável.
