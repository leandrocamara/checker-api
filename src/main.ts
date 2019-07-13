
import { Server } from './server/server'
import { userRouter } from './router/user.router'
import { checkRouter } from './router/check.router'

const server = new Server()

// Instancia o Servidor.
server.bootstrap([
  userRouter,
  checkRouter,
]).then(server => {

  console.log('Servidor inicializado em: ', server.application.address())

}).catch(error => {

  console.log('Falha ao inicializar o Servidor!')
  console.error(error)
  process.exit(1)

})
