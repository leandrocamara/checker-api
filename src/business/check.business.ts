
import { NotFoundError } from 'restify-errors'

import { User } from '../db/mongodb/user.model'
import { AbstractBO } from './abstract.business'
import { Check } from '../db/mongodb/check.model'

/**
 * Classe responsável pela implementação das regras de negócio da entidade 'Check'.
 *
 * @author Leandro Câmara
 */
class CheckBO extends AbstractBO<Check> {

  /**
   * Método construtor.
   */
  constructor () {
    super(Check)
  }

  /**
   * Retorna as validações de e-mail conforme o "usuário" informado.
   *
   * @param user
   */
  public async findChecksByUser(user: User) {
    try {
      return await Check.findChecksByUser(user.id)
    } catch (error) {
      throw new NotFoundError('Falha ao buscar as validações de e-mails.')
    }
  }

}

export const checkBO = new CheckBO()
