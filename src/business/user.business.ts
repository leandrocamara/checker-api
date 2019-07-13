
import { AbstractBO } from './abstract.business'
import { User } from '../db/mongodb/user.model'

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

}

export const userBO = new UserBO()
