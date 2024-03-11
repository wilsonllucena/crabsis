import db from "@src/db";
import { clients } from "@src/db/schema.drizzle";
import { Client } from "@src/dtos/client.dto";
import { NotFoundError } from "@src/shared/errors/api-error";
import { and, desc, eq } from "drizzle-orm";

export class ClientRepository {
  private _db = db;

  async create(data: Client) {
    const { name, email, address, phone, accountId } = data;
    const client = await this._db
      .insert(clients)
      .values({
        name,
        email,
        address,
        phone,
        accountId,
      })
      .returning();

    return client.shift();
  }

  async getById(id: string, accountId: string) {
    const user = await this._db
      .select()
      .from(clients)
      .where(and(eq(clients.id, id), eq(clients.accountId, accountId)));

    if (!user.length) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  async delete(id: string, accountId: string) {
    await this.getById(id, accountId);
    await this._db
      .delete(clients)
      .where(and(eq(clients.id, id), eq(clients.accountId, accountId)));
  }

  async getByEmail(email: string, accountId: string) {
    return await this._db
      .select()
      .from(clients)
      .where(and(eq(clients.email, email), eq(clients.accountId, accountId)));
  }

  async list(accountId: string) {
    return await this._db
      .select()
      .from(clients)
      .where(eq(clients.accountId, accountId))
      .orderBy(desc(clients.createdAt));
  }

  async update(id: string, data: Partial<Client>) {
    if (data.accountId === undefined) throw new Error("accountId is required");
    const { name, email, accountId, phone, address } = data;
    await this.getById(id, accountId);
    const user = await this._db
      .update(clients)
      .set({
        name,
        email,
        address,
        phone,
      })
      .where(and(eq(clients.id, id), eq(clients.accountId, accountId)));
    return user;
  }
}
