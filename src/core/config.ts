export interface IAppConfig {
  port: number;
  postgres: {
    host: string;
    port: number;
    username: string;
    password: string;
  };
}

export const appConfig = (): IAppConfig => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  postgres: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5488,
    username: process.env.POSTGRES_USERNAME || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
  },
});
