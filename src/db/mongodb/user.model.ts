
import * as mongoose from 'mongoose'
import { saveMiddleware, updateMiddleware } from './middleware/user.middleware'

/**
 * Interface que representa o Documento "User".
 */
export interface User extends mongoose.Document {
  name: string,
  email: string,
  password: string,
}

/**
 * Schema: Define as propriedades (metadados) dos documentos.
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  email: {
    type: String,
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    required: true
  },
  password: {
    type: String,
    select: false,
    required: true
  },
})

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
export const User = mongoose.model<User>('User', userSchema)
