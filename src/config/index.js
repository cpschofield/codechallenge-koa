import * as dotenv from 'dotenv';
import * as joi from 'joi';
import * as path from 'path';

// load up .env file from project root
dotenv.config({ path: path.join(__dirname, '../../.env') });

// define object information for environment variables
const envVarsSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .allow(['development', 'production', 'testing'])
      .default('development'),
    PORT: joi.number().default(8080),
  })
  .unknown()
  .required();

// perform validation of environment variables
const { error, value: envVars } = joi.validate(process.env, envVarsSchema);

// catch errors in validation
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// export validated environment variables for use
export const config = {
  app: {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
  },
};
