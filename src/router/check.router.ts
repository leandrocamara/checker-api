
import * as restify from 'restify'

import { ModelRouter } from './model.router'
import { Check } from '../db/mongodb/check.model'
import { checkBO } from '../business/check.business'
import { authorize } from '../service/security/authz.handler'

/**
 * Rotas do recurso "Check".
 *
 * @author Leandro Câmara
 */
class CheckRouter extends ModelRouter<Check> {

  /**
   * Método construtor.
   */
  constructor () {
    super(Check, checkBO)
  }

  /**
   * Aplica as rotas do recurso "Check" ao Servidor.
   *
   * @param application
   */
  public applyRoutes(application: restify.Server) {
    application.get(`${this.basePath}`, [authorize(), this.findAll])
    application.post(`${this.basePath}`, [authorize(), this.save])
  }

}

export const checkRouter = new CheckRouter()
