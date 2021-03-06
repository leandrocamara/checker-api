
// import * as fs from 'fs'
import * as restify from 'restify'
import * as mongoose from 'mongoose'
import * as corsMiddleware from 'restify-cors-middleware'

import { Router } from '../router/router'
import { handleError } from './error.handler'
import { environment } from '../config/environment'
import { tokenParser } from '../service/security/token.parser'

/**
 * Classe do Servidor.
 *
 * @author Leandro Câmara
 */
export class Server {

  public application: restify.Server

  /**
   * Retorna a instância do Servidor.
   *
   * @param routers
   */
  public bootstrap(routers: Router[] = []): Promise<Server>{
    return this.initializeDb().then(() =>
      this.initRoutes(routers).then(() => this))
  }

  /**
   * Inicializa a conexão com o banco de dados (MongoDB).
   */
  private initializeDb(): Promise<mongoose.Mongoose> {
    (<any> mongoose).Promise = global.Promise
    return mongoose.connect(environment.db.mongodb.url, {
      useNewUrlParser: true
    })
  }

  /**
   * Inicializa o Servidor e as Rotas da aplicação.
   *
   * @param routers
   */
  private initRoutes(routers: Router[]): Promise<any>{
    return new Promise((resolve, reject) => {
      try {
        this.createServer()
        this.applyMiddlewares()
        this.applyRoutersInServer(routers)

        // Define a porta em que o Servidor responderá às requisições.
        this.application.listen(environment.server.port, () => {
          resolve(this.application)
        })

        this.application.on('restifyError', handleError)
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   *  Cria o servidor Restify.
   */
  private createServer(): void {
    this.application = restify.createServer({
      name: 'checker-api',
      version: '1.0.0',
      // certificate: fs.readFileSync('../service/security/keys/cert.pem'),
      // key: fs.readFileSync('../service/security/keys/key.pem')
    })
  }

  /**
   * Instala plugins que serão utilizada por todas as rotas.
   */
  private applyMiddlewares(): void {
    const cors: corsMiddleware.CorsMiddleware = this.getCors()

    this.application.pre(cors.preflight)

    this.application.use(cors.actual)
    this.application.use(restify.plugins.queryParser())
    this.application.use(restify.plugins.bodyParser())
    this.application.use(tokenParser)
  }

  /**
   * Retorna a configuração do CORS.
   */
  private getCors(): corsMiddleware.CorsMiddleware {
    const corsOptions: corsMiddleware.Options = {
      origins: ['*'],
      allowHeaders: ['Authorization'],
      exposeHeaders: [],
    }
    return corsMiddleware(corsOptions)
  }

  /**
   * Aplica as rotas ao Servidor (application).
   *
   * @param routers
   */
  private applyRoutersInServer(routers: Router[]): void {
    for (let router of routers) {
      router.applyRoutes(this.application)
    }
  }

}
