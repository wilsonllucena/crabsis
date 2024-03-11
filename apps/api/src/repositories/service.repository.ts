import db from "@src/db";
import { services } from "@src/db/schema.drizzle";
import { ProductInput } from "@src/dtos/product.dto";
import { Service } from "@src/dtos/service.dto";
import { NotFoundError } from "@src/shared/errors/api-error";
import { and, desc, eq } from "drizzle-orm";

export class ServiceRepository {
  private _db = db;

  async create(data: Service) {
    const { name, price, accountId, description } = data;
    return await this._db
      .insert(services)
      .values({
        name,
        price,
        accountId,
        description,
      })
      .returning();
  }

  async getById(id: string, accountId: string) {
    const service = await this._db
      .select()
      .from(services)
      .where(and(eq(services.id, id), eq(services.accountId, accountId)));

    if (!service.length) {
      throw new NotFoundError("Product not found");
    }

    return service;
  }

  async delete(id: string, accountId: string) {
    await this.getById(id, accountId);
    await this._db
      .delete(services)
      .where(and(eq(services.id, id), eq(services.accountId, accountId)));
  }

  async list(accountId: string) {
    return await this._db
      .select()
      .from(services)
      .where(eq(services.accountId, accountId))
      .orderBy(desc(services.createdAt));
  }

  async update(id: string, data: Partial<Service>) {
    if (data.accountId === undefined) throw new Error("accountId is required");

    const { accountId } = data;
    await this.getById(id, accountId);

    const service = await this._db
      .update(services)
      .set({
        name: data.name,
        price: data.price,
        accountId: data.accountId,
        description: data.description,
      })
      .where(and(eq(services.id, id), eq(services.accountId, accountId)))
      .returning();
    return service.shift();
  }
}
