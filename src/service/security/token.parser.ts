
import * as restify from 'restify'
import * as jwt from 'jsonwebtoken'

import { userBO } from '../../business/user.business'
import { environment } from '../../config/environment'

/**
 * Verifica o Token presente na requisição.
 *
 * @param req
 * @param resp
 * @param next
 */
export const tokenParser: restify.RequestHandler = (req, resp, next) => {
  const token = extractToken(req)
  if (token) {
    jwt.verify(token, environment.security.apiSecret, applyBearer(req, next))
  } else {
    next()
  }
}

/**
 * Retorna o Token presente na requisição.
 *
 * @param req
 */
function extractToken(req: restify.Request): string {
  // Authorization: Bearer TOKEN
  let token = undefined
  const authorization = req.header('authorization')

  if (authorization) {
    const parts: string[] = authorization.split(' ')

    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1]
    }
  }
  return token
}

/**
 * Associa o usuário presente no Token (quando houver) à requisição.
 *
 * @param req
 */
function applyBearer(req: restify.Request, next): (error, decoded) => void {
  return async (error, decoded) => {
    if (decoded) {
      userBO.findByEmail(decoded.sub).then(user => {
        if (user) {
          // Associar o usuário no request
          req.authenticated = user
        }
        next()
      }).catch(next)
    } else {
      next()
    }
  }
}
