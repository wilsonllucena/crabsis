import db from '@src/db'
import { users } from '@src/db/schema.drizzle'
import { UserInput } from '@src/dtos/user'
import { NotFoundError } from '@src/shared/errors/api-error'
import { and, desc, eq } from 'drizzle-orm'

export class UserRepository {
  private _db = db

  async create(data: UserInput) {
    const user = await this._db
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        password: data.password,
        accountId: data.accountId,
      })
      .returning()

    return user.shift()
  }

  async getById(id: string, accountId: string) {
    const user = await this._db
      .select()
      .from(users)
      .where(and(eq(users.id, id), eq(users.accountId, accountId)))

    if (!user.length) {
      throw new NotFoundError('User not found')
    }

    return user
  }

  async delete(id: string, accountId: string) {
    await this.getById(id, accountId)
    await this._db
      .delete(users)
      .where(and(eq(users.id, id), eq(users.accountId, accountId)))
  }

  async getByEmail(email: string, accountId: string) {
    const user = await this._db
      .select()
      .from(users)
      .where(and(eq(users.email, email), eq(users.accountId, accountId)))

    return user
  }

  async list(accountId: string) {
    return await this._db
      .select()
      .from(users)
      .where(eq(users.accountId, accountId))
      .orderBy(desc(users.createdAt))
  }

  async update(id: string, data: Partial<UserInput>) {
    if (data.accountId === undefined) throw new Error('accountId is required')
    const { accountId } = data
    await this.getById(id, accountId)
    const user = await this._db
      .update(users)
      .set({
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .where(and(eq(users.id, id), eq(users.accountId, accountId)))
    return user
  }
}
