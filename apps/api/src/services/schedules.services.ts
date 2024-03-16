import { Schedule } from "@src/dtos/schedule.dto";
import { ScheduleRepository } from "@src/repositories/schedule.repository";
import { container } from "tsyringe";

const schduleRepo = container.resolve(ScheduleRepository);
export const getSchedule = async (id: string) => {};

export const createSchedule = async (schedule: Schedule) => {
  return await schduleRepo.create(schedule);
};
