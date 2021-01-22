declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    DATABASE_SCHEMA: string;
    PORT: string;
  }
}
