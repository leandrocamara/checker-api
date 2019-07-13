
import * as restify from 'restify'
import * as jwt from 'jsonwebtoken'
import { NotAuthorizedError } from 'restify-errors'

import { User } from '../../db/mongodb/user.model'
import { userBO } from '../../business/user.business'
import { environment } from '../../config/environment'

/**
 * Realiza a autenticação do usuário, de acordo com o 'e-mail' e a 'senha' informados.
 */
export const authenticate: restify.RequestHandler = async (req, resp, next) => {

  const { email, password } = req.body

  try {
    const user = await userBO.findByEmail(email, '+password');

    if (!user || !userBO.isValidPassword(user, password)) {
      return next(new NotAuthorizedError('Credenciais inválidas!'))
    }

    resp.json(getToken(user))
    next(false)
  } catch (error) {
    next(error)
  }
}

/**
 * Retorna o Token do usuário autenticado.
 *
 * @param user
 */
function getToken (user: User) {
  const accessToken = jwt.sign({
    sub: user.email as any,
    iss: 'checker-api'
  }, environment.security.apiSecret)

  return {
    name: user.name,
    email: user.email,
    accessToken: accessToken
  }
}
