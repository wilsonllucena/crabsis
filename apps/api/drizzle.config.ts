import env from './config/env'
import type { Config } from 'drizzle-kit'
export default {
  schema: 'src/db/schema.drizzle.ts',
  out: 'src/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: String(env.DATABASE_URL),
  },
} satisfies Config
