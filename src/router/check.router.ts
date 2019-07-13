
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
    application.get(`${this.basePath}`, [authorize(), this.findChecksByUser])
    application.post(`${this.basePath}`, [authorize(), this.save])
  }

  /**
   * Retorna as validações de e-mail conforme o "usuário" informado.
   */
  private findChecksByUser: restify.RequestHandler = async (req, resp, next) => {
    try {
      const checks = await checkBO.findChecksByUser(req.authenticated);
      this.renderAll(checks, resp, next)
    } catch (error) {
      next(error)
    }
  }

}

export const checkRouter = new CheckRouter()
