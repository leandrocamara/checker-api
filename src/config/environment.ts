
/**
 * Objeto de configuração do servidor.
 *
 * @author Leandro Câmara
 */
export const environment = {
  server: { port: process.env.SERVER_PORT || 3000 },
  security: { saltRounds: process.env.SALT_ROUNDS || 10 },
  db: {
    mongodb: { url: process.env.MONGODB_URL || 'mongodb://localhost/checker' }
  }
}
