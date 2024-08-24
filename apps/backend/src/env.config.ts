import * as Joi from 'joi';

export interface EnvironmentVariables {
  NODE_ENV: 'local' | 'development' | 'production';
  PORT: number;
  KEYCLOAK_BASE_URL: string;
  KEYCLOAK_REALM: string;
  KEYCLOAK_REALM_RSA_PUBLIC_KEY: string;
  KEYCLOAK_CLIENT_ID: string;
  KEYCLOAK_CLIENT_SECRET: string;
}

export const envVariablesSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().port().default(5000),
  KEYCLOAK_BASE_URL: Joi.string().required(),
  KEYCLOAK_REALM: Joi.string().required(),
  KEYCLOAK_REALM_RSA_PUBLIC_KEY: Joi.string().required(),
  KEYCLOAK_CLIENT_ID: Joi.string().required(),
  KEYCLOAK_CLIENT_SECRET: Joi.string().required(),
});
