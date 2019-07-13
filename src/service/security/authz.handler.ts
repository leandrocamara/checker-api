
import * as restify from 'restify'
import { ForbiddenError } from 'restify-errors'

/**
 * Verifica se o usuário possui autorização para realizar requisições.
 */
export const authorize: () => restify.RequestHandler = () => {
  return (req, resp, next) => {
    if (req.authenticated !== undefined) {
      next()
    } else {
      next(new ForbiddenError('Permissão Negada!'))
    }
  }
}
