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
      functionName: process.env.PIDGEY_FUNCTION_NAME,
      url: process.env.URL_PIDGEY,
      key: process.env.API_KEY_PIDGEY,
    },
    maps: {
      url: process.env.URL_MAPS,
    },
  },
});
