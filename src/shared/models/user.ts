import Knex from 'knex'

import Connection from '../database/connection'
import { IUser } from '../interfaces/user'

export default class User {
	private conn: Knex
	public table = 'users'

	constructor(){
		this.conn = Connection
	}

	listUsers() {
		const promise = new Promise((resolve, reject) => {
				this.conn.table(this.table)
				.select()
				.then((users: IUser[]) => {
					return resolve(users)
				})
				.catch(err => {
					reject(err)
				})
		})
		return promise
	}

	//método de busca
	async findUser(user: IUser): Promise<IUser | any>{
		try {
			const users: IUser[] = await this.conn.table(this.table)
				.select()
				.where({ ...user })
		return users[0]
		}
			catch (error) {
				return error
		}
	}

createUser(user: IUser) {
		const promise = new Promise((resolve, reject) => {
			this.conn.transaction(knex => {
				knex(this.table).transacting(knex).insert({ ...user })
					.returning(['id', 'name', 'username', 'email'])
					.then((users: IUser[]) => {
						resolve(users[0])
					})
					.then(knex.commit)
					.catch(knex.rollback)
			}).catch(error => {
			reject(error)
		})
		})
		return promise
	}

	updateUser(id: number, user: IUser) {
		const promise = new Promise((resolve, reject) => {
			this.conn.transaction(knex => {
				knex(this.table).transacting(knex).update({ ...user })
					.where('id', id)
					.returning(['id', 'name', 'username', 'email'])
					.then((users: IUser[]) => {
						resolve(users[0])
					})
					.then(knex.commit)
					.catch(knex.rollback)
			}).catch(error => {
				reject(error)
			})
		})

		return promise
	}

	deleteUser(id: number) {
		const promise = new Promise<void>((resolve, reject) => {
			this.conn.transaction(knex => {
				knex(this.table).transacting(knex).del()
					.where('id', id)
					.then(() => {
						resolve()
					})
					.then(knex.commit)
					.catch(knex.rollback)
			}).catch(error => {
				reject(error)
			})
		})

		return promise
	}
}



