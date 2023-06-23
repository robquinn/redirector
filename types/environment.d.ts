declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Server
      SERVER__PORT: string
      SERVER__HOSTNAME: string
      SERVER__GRAPHQL_PATHNAME: string
      SERVER__PRODUCTION_URL: string

      // Portal
      PORTAL__REDIRECT_URL: string
      PORTAL__PASSWORD: string

      // Database
      DATABASE__DB_URL: string
      DATABASE__SHAWDOW_DB_URL: string
    }
  }
}
export {}
