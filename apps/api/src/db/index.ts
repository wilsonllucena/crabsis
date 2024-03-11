import env from 'config/env'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema.drizzle'

const connect = new Pool({
  connectionString: env.DATABASE_URL,
})

const db = drizzle(connect, {
  schema,
})

export default db
