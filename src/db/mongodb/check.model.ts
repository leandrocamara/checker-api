
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
 * Schema: Define as propriedades (metadados) dos documentos.
 */
const checkSchema = new mongoose.Schema({
  email: {
    type: String,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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

/**
 * Exporta o Model "Check", que faz uso do Schema "checkSchema".
 * O Model serve para manipular os Documentos da Collection.
 * O Mongoose utilizará o nome do Model para definir o nome (no plural) da Collection.
 */
export const Check = mongoose.model<Check>('Check', checkSchema)
