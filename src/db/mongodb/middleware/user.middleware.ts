
import * as bcrypt from 'bcrypt'
import { User } from '../user.model'
import { environment } from '../../../config/environment'

/**
 * Criptografa a senha do usuário.
 *
 * @param obj
 * @param next
 */
const hashPassword = (obj, next) => {
  bcrypt.hash(obj.password, environment.security.saltRounds)
    .then(hash => {
      obj.password = hash
      next()
    }).catch(next)
}

/**
 * Middleware responsável por criptografar a senha na operação "Save".
 *
 * @param next
 */
const saveMiddleware = function (next) {
  const user: User = this
  if (!user.isModified('password')) {
    next()
  } else {
    hashPassword(user, next)
  }
}

/**
 * Middleware responsável por criptografar a senha na operação "Update".
 *
 * @param next
 */
const updateMiddleware = function (next) {
  if (!this.getUpdate().password) {
    next()
  } else {
    hashPassword(this.getUpdate(), next)
  }
}

export {
  saveMiddleware,
  updateMiddleware
}