declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    POSTGRES_HOST: string;
    POSTGRES_PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DATABASE: string;
    POSTGRES_DATABASE_TEST: string;
    PGADMIN_DEFAULT_EMAIL: string;
    PGADMIN_DEFAULT_PASSWORD: string;
    JWT_SECRET: string;
    JWT_ALGORITHM: string;
  }
}
