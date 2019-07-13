
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

}

export const checkBO = new CheckBO()
