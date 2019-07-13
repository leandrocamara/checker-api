
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

  /**
   * Verifica se o 'e-mail' informado é válido.
   *
   * @param email
   */
  public async checkEmail(user: User, email: string): Promise<Check> {
    try {
      const check: any = {
        email,
        user: user.id,
        checkDate: new Date(),
        valid: this.verifyFormatEmail(email),
      }
      return await this.save(check)
    } catch (error) {
      throw new NotFoundError('Falha ao validar o e-mail informado.')
    }
  }

  private verifyFormatEmail(email: string): boolean {
    const regex: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gm
    return regex.test(email)
  }

}

export const checkBO = new CheckBO()
