import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  JWT_SECRET: string;
  GEMINI_API_KEY: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().default(3000),
    DB_PASSWORD: joi.string().allow('').default(''),
    DB_NAME: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().default(3306),
    DB_USERNAME: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    GEMINI_API_KEY: joi.string().required(),
    SMTP_HOST: joi.string().allow('').default('smtp.gmail.com'),
    SMTP_PORT: joi.number().default(587),
    SMTP_USER: joi.string().allow('').default(''),
    SMTP_PASS: joi.string().allow('').default(''),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  dbPassword: envVars.DB_PASSWORD,
  dbName: envVars.DB_NAME,
  dbHost: envVars.DB_HOST,
  dbPort: envVars.DB_PORT,
  dbUser: envVars.DB_USERNAME,
  jwtSecret: envVars.JWT_SECRET,
  geminiApiKey: envVars.GEMINI_API_KEY,
  smtpHost: envVars.SMTP_HOST,
  smtpPort: envVars.SMTP_PORT,
  smtpUser: envVars.SMTP_USER,
  smtpPass: envVars.SMTP_PASS,
};

