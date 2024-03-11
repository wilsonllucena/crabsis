/* eslint-disable @typescript-eslint/no-explicit-any */
import env from 'config/env'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

export let client: any
export async function getClientByTenant(database: string): Promise<void> {
  const databaseUrl = env.DATABASE_URL?.replace('public', database)

  const connect = new Pool({
    connectionString: databaseUrl,
  })

  client = drizzle(connect)
}
