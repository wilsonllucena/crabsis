import { z } from 'zod'

// Define the schema for your configuration variables
const envSchema = z.object({
  API_KEY: z.string(),
  SECRET_KEY: z.string(),
  PORT: z.string(),
  DATABASE_URL: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_PRICE_ID: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  CLIENT_URL: z.string(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.coerce.number(),
})

// Validate and parse the environment variables
const env = envSchema.parse(process.env)

// Export the configuration variables
export default env
