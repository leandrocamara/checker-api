
import { NotFoundError } from 'restify-errors'

import { User } from '../db/mongodb/user.model'
import { AbstractBO } from './abstract.business'

/**
 * Classe responsável pela implementação das regras de negócio da entidade 'User'.
 *
 * @author Leandro Câmara
 */
class UserBO extends AbstractBO<User> {

  /**
   * Método construtor.
   */
  constructor () {
    super(User)
  }

  /**
   * Retorna o documento conforme o "email" informado.
   *
   * @param email
   * @param projection
   */
  public async findByEmail(email: string, projection?: string) {
    try {
      return await User.findByEmail(email, projection)
    } catch (error) {
      throw new NotFoundError('Falha ao buscar o usuário.')
    }
  }

  /**
   * Verifica se a senha informada está correta.
   *
   * @param user
   * @param password
   */
  public isValidPassword(user: User, password: string): boolean {
    return user.matches(password)
  }

}

export const userBO = new UserBO()
