
import * as mongoose from 'mongoose'

import { User } from './user.model'

/**
 * Interface que representa o Documento "Check".
 */
export interface Check extends mongoose.Document {
  email: string
  valid: boolean
  checkDate: Date
  user: mongoose.Types.ObjectId | User
}

/**
 * Adiciona novos métodos ao modelo "Check".
 */
export interface CheckModel extends mongoose.Model<Check> {
  findChecksByUser(id: mongoose.Types.ObjectId): Promise<Check[]>
}

/**
 * Schema: Define as propriedades (metadados) dos documentos.
 */
const checkSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  valid: {
    type: Boolean,
    required: true
  },
  checkDate: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

checkSchema.statics.findChecksByUser = function (id: mongoose.Types.ObjectId) {
  return this.find({ user: id })
}

/**
 * Exporta o Model "Check", que faz uso do Schema "checkSchema".
 * O Model serve para manipular os Documentos da Collection.
 * O Mongoose utilizará o nome do Model para definir o nome (no plural) da Collection.
 */
export const Check = mongoose.model<Check, CheckModel>('Check', checkSchema)
