
/**
 * Objeto de configuração do servidor.
 *
 * @author Leandro Câmara
 */
export const environment = {
  server: { port: process.env.SERVER_PORT || 3000 },
  security: {
    saltRounds: process.env.SALT_ROUNDS || 10,
    apiSecret: process.env.API_SECRET || 'checker-api-secret'
  },
  db: {
    mongodb: { url: process.env.MONGODB_URL || 'mongodb://localhost/checker' }
  }
}
