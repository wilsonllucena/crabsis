import db from '@src/db'
import { products } from '@src/db/schema.drizzle'
import { ProductInput } from '@src/dtos/product.dto'
import { NotFoundError } from '@src/shared/errors/api-error'
import { and, desc, eq } from 'drizzle-orm'

export class ProductRepository {
  private _db = db

  async create(data: ProductInput) {
    const user = await this._db
      .insert(products)
      .values({
        name: data.name,
        price: data.price,
        accountId: data.accountId,
        quantity: data.quantity,
      })
      .returning()

    return user.shift()
  }

  async getById(id: string, accountId: string) {
    const user = await this._db
      .select()
      .from(products)
      .where(and(eq(products.id, id), eq(products.accountId, accountId)))

    if (!user.length) {
      throw new NotFoundError('Product not found')
    }

    return user
  }

  async delete(id: string, accountId: string) {
    await this.getById(id, accountId)
    await this._db
      .delete(products)
      .where(and(eq(products.id, id), eq(products.accountId, accountId)))
  }

  async list(accountId: string) {
    return await this._db
      .select()
      .from(products)
      .where(eq(products.accountId, accountId))
      .orderBy(desc(products.createdAt))
  }

  async update(id: string, data: Partial<ProductInput>) {
    if (data.accountId === undefined) throw new Error('accountId is required')

    const { accountId } = data
    await this.getById(id, accountId)

    const product = await this._db
      .update(products)
      .set({
        name: data.name,
        price: data.price,
        accountId: data.accountId,
        quantity: data.quantity,
      })
      .where(and(eq(products.id, id), eq(products.accountId, accountId))).returning()
    return product.shift()
  }
}
