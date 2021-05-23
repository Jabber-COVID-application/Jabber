import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    DB_HOST: str(),
    DB_DB: str(),
    DB_USERNAME: str(),
    DB_PASSWORD: str(),
    API_SECRET: str(),
  });
};

export default validateEnv;
