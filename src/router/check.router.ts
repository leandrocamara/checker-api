
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
    application.post(`${this.basePath}`, [authorize(), this.checkEmail])
    application.get(`${this.basePath}`, [authorize(), this.findChecksByUser])
    application.get(`${this.basePath}/total`, [authorize(), this.getTotalChecks])
    application.get(`${this.basePath}/progress`, [authorize(), this.getPercentValidsEmails])
  }

  /**
   * Retorna as validações de e-mail conforme o "usuário" informado.
   */
  private findChecksByUser: restify.RequestHandler = async (req, resp, next) => {
    try {
      const user = req.authenticated
      const checks = await checkBO.findChecksByUser(user)
      this.renderAll(checks, resp, next)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Valida o e-mail informado.
   */
  private checkEmail: restify.RequestHandler = async (req, resp, next) => {
    try {
      const { email } = req.body
      const user = req.authenticated
      const check = await checkBO.checkEmail(user, email)

      const message = check.valid ? 'E-mail válido!' : 'E-mail inválido!'
      this.render({ check, message }, resp, next)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Retorna a quantidade total de e-mails validados.
   */
  private getTotalChecks: restify.RequestHandler = async (req, resp, next) => {
    try {
      const user = req.authenticated
      const total = await checkBO.getTotalChecks(user)
      resp.json({ total })
      return next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Retorna a quantidade de e-mails válidos, em porcetagem (%).
   */
  private getPercentValidsEmails: restify.RequestHandler = async (req, resp, next) => {
    try {
      const user = req.authenticated
      const percent = await checkBO.getPercentValidsEmails(user)
      resp.json({ percentValidsEmails: percent })
      return next()
    } catch (error) {
      next(error)
    }
  }

}

export const checkRouter = new CheckRouter()
