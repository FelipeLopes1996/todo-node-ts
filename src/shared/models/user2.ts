import Knex from 'knex'

import { IUser } from '../interfaces/user'
import Connection from '../database/connection'

export default class UserT {
    private conn: Knex
    public table = 'users'

    constructor() {
        this.conn = Connection

    }

    listUserT() {
        const promise = new Promise((resolve, reject) => {
            this.conn.table(this.table)
            .select()
            .then((users: IUser[]) => {
                resolve(users)
            }) 
            .catch(err => {
                reject(err)
            })
        })
        return promise
    }

    async findUserT(user: IUser): Promise<IUser | any> {
        try {
        const users: IUser[] = await this.conn.table(this.table)
            .select()
            .where({ ...user })
            return users[0]
        } catch (error) {
            return error
        }
    }

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

    createUserTow(user: IUser) {
        const promise = new Promise((resolve, reject) => {
            this.conn.transaction(knex => {
                knex(this.table).transacting(knex).insert({ ...user })
                .returning(['id', 'name', 'username', 'email'])
                .then((users: IUser[]) => {
                  resolve(users[0])
                })
                .then(knex.commit) 
                .catch(knex.rollback)   
            }).catch(err => {
                reject(err)
            })
        })
        return promise
    }

    updateUserTwo(id: number, user: IUser) {
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

    DestroyUserTwo(id: number) {
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
