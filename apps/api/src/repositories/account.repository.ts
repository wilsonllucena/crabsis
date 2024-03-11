import db from '@src/db'
import { accounts } from '@src/db/schema.drizzle'
import { Account } from '@src/dtos/account.dto'
import { NotFoundError } from '@src/shared/errors/api-error'
import { desc, eq } from 'drizzle-orm'

export class AccountRepository {
  private _db = db

  async create(data: Account) {
    const user = await this._db
      .insert(accounts)
      .values({
        name: data.name,
        email: data.email,
        password: data.password,
        stripeCustomerId: data.stripeCustomerId,
      })
      .returning()

    return user.shift()
  }

  async getById(id: string) {
    const user = await this._db
      .select()
      .from(accounts)
      .where(eq(accounts.id, id))

    if (!user.length) {
      throw new NotFoundError('Account not found')
    }

    return user
  }

  async delete(id: string) {
    await this.getById(id)
    await this._db.delete(accounts).where(eq(accounts.id, id))
  }

  async getByEmail(email: string) {
    return await this._db
      .select()
      .from(accounts)
      .where(eq(accounts.email, email))
  }

  async getByStripeCustomerId(stripeCustomerId: string) {
    return await this._db
      .select()
      .from(accounts)
      .where(eq(accounts.stripeCustomerId, stripeCustomerId))
  }

  async list() {
    return await this._db
      .select()
      .from(accounts)
      .orderBy(desc(accounts.createdAt))
  }

  async update(id: string, data: Partial<Account>) {
    const account = await this.getById(id)
    const user = await this._db
      .update(accounts)
      .set({
        name: data.name || account[0].name,
        email: data.email || account[0].email,
        password: data.password || account[0].password,
        stripeCustomerId: data.stripeCustomerId || account[0].stripeCustomerId,
        stripeSubscriptionId:
          data.stripeSubscriptionId || account[0].stripeSubscriptionId,
        stripeSubscriptionStatus:
          data.stripeSubscriptionStatus || account[0].stripeSubscriptionStatus,
      })
      .where(eq(accounts.id, id))
    return user
  }

  async getByStripeSubscriptionId(stripeSubscriptionId: string) {
    return await this._db
      .select()
      .from(accounts)
      .where(eq(accounts.stripeSubscriptionId, stripeSubscriptionId))
  }

  async getUserByStripeCustomerIdService(stripeCustomerId: string) {
    return await this._db
      .select()
      .from(accounts)
      .where(eq(accounts.stripeCustomerId, stripeCustomerId))
  }


  async getByIdOnly(id: string) {
    const user = await this._db
      .select({ id: accounts.id })
      .from(accounts)
      .where(eq(accounts.id, id))

    return user
  }
}
