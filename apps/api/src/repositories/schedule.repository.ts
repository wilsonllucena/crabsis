import db from "@src/db";
import { accounts, clients, schedules, services, users } from "@src/db/schema.drizzle";
import { Schedule } from "@src/dtos/schedule.dto";
import { NotFoundError } from "@src/shared/errors/api-error";
import { and, desc, eq, like } from "drizzle-orm";

type ScheduleParam = {
  date: string;
  accountId: string;
  userId: string;
};
export class ScheduleRepository {
  private _db = db;

  async create(data: Schedule) {
    return await this._db
      .insert(schedules)
      .values({
        serviceId: data.serviceId,
        clientId: data.clientId,
        accountId: data.accountId,
        date: new Date(data.date),
        observation: data.observation,
        active: data.active,
        userId: data.userId,
      })
      .returning();
  }

  async getById(id: string) {
    const schedule = await this._db
      .select()
      .from(schedules)
      .where(eq(schedules.id, id));

    if (!schedule.length) {
      throw new NotFoundError("Schedule not found");
    }

    return schedule;
  }

  async delete(id: string) {
    await this.getById(id);
    await this._db.delete(schedules).where(eq(schedules.id, id));
  }

  async list() {
    return await this._db
      .select()
      .from(schedules)
      .orderBy(desc(schedules.createdAt));
  }

  async update(id: string, data: Partial<Schedule>) {
    await this.getById(id);
    return await this._db
      .update(schedules)
      .set({
        serviceId: data.serviceId,
        clientId: data.clientId,
        accountId: data.accountId,
        date: data.date ? new Date(data.date) : undefined,
        observation: data.observation,
        active: data.active,
        userId: data.userId,
      })
      .where(eq(schedules.id, id));
  }

  async getScheduleAvailable(param: ScheduleParam) {
    return await this._db
      .select()
      .from(schedules)
      .leftJoin(services, eq(services.id, schedules.serviceId))
      .leftJoin(accounts, eq(accounts.id, schedules.accountId))
      .leftJoin(users, eq(users.id, schedules.userId))
      .leftJoin(clients, eq(clients.id, schedules.clientId))
      .where(and(
        like(schedules.date, `%${param.date}%`), 
        eq(accounts.id, param.accountId),
        eq(users.id, param.userId)));
  }
}
