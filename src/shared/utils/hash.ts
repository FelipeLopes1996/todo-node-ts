import bcrypt from 'bcrypt'

import { config } from '../environments/environments'

export const createHash = (password: string): string => {
    const hash = bcrypt.hashSync(password, config.salt)
    return hash
}

export const compareHash = (password: string, hash: string): boolean => {
    const isCompare = bcrypt.compareSync(password, hash)
    return isCompare
}