
import * as restify from 'restify'

import { ModelRouter } from './model.router'
import { User } from '../db/mongodb/user.model'
import { userBO } from '../business/user.business'

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
    application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
    application.post(`${this.basePath}`, this.save)
  }

}

export const userRouter = new UserRouter()
