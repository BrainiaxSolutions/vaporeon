export const config = Object.freeze({
  app: {
    port: Number(process.env.PORT),
    environment: process.env.APP_ENVIRONMENT,
  },
  db: {
    name: process.env.DB_NAME,
    url: process.env.DB_URL,
  },
  providers: {
    pidgey: {
      url: process.env.URL_PIDGEY,
      key: process.env.API_KEY_PIDGEY,
    },
  },
});
