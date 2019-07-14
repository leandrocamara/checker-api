
import * as bcrypt from 'bcrypt'
import * as mongoose from 'mongoose'

import { saveMiddleware, updateMiddleware } from './middleware/user.middleware'

/**
 * Interface que representa o Documento "User".
 */
export interface User extends mongoose.Document {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  matches(password: string): boolean
}

/**
 * Adiciona novos métodos ao modelo "User".
 */
export interface UserModel extends mongoose.Model<User> {
  findByEmail(email: string, projection?: string): Promise<User>
}

/**
 * Schema: Define as propriedades (metadados) dos documentos.
 */
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 100
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 100
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    select: false,
    required: true
  },
})

userSchema.statics.findByEmail = function (email: string, projection: string) {
  return this.findOne({ email }, projection) // { email: email }
}

userSchema.methods.matches = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password)
}

/**
 * Registra os Middlewares a serem executados antes das operações "Save" e "Update".
 */
userSchema.pre('save', saveMiddleware)
userSchema.pre('update', updateMiddleware)
userSchema.pre('findOneAndUpdate', updateMiddleware)

/**
 * Exporta o Model "User", que faz uso do Schema "userSchema".
 * O Model serve para manipular os Documentos da Collection.
 * O Mongoose utilizará o nome do Model para definir o nome (no plural) da Collection.
 */
export const User = mongoose.model<User, UserModel>('User', userSchema)
