
import * as restify from 'restify'

import { ModelRouter } from './model.router'
import { User } from '../db/mongodb/user.model'
import { userBO } from '../business/user.business'
import { authorize } from '../service/security/authz.handler'
import { authenticate } from '../service/security/auth.handler'

/**
 * Rotas do recurso "User".
 *
 * @author Leandro Câmara
 */
class UserRouter extends ModelRouter<User> {

  /**
   * Método construtor.
   */
  constructor () {
    super(User, userBO)
    this.on('beforeRender', document => {
      document.password = undefined
    })
  }

  /**
   * Aplica as rotas do recurso "User" ao Servidor.
   *
   * @param application
   */
  public applyRoutes(application: restify.Server) {
    application.post(`${this.basePath}`, this.save)
    application.post(`${this.basePath}/auth`, authenticate)
    application.get(`${this.basePath}`, [authorize(), this.getUserAuthenticated])
  }

  /**
   * Retorna o usuário autenticado.
   */
  private getUserAuthenticated: restify.RequestHandler = async (req, resp, next) => {
    try {
      const user = req.authenticated
      this.render(user, resp, next)
    } catch (error) {
      next(error)
    }
  }

}

export const userRouter = new UserRouter()
