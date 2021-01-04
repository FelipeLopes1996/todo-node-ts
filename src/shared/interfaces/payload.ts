import { IUser } from './user'
import { IRole } from './role'

export interface IPayload {
	user?: IUser
	role?: IRole
	iat?: number
	exp?: number
}
