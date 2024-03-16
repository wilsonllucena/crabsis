import { createSchedule, getSchedule } from "@src/services/schedules.services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export const listScheduleController = async (req: Request, res: Response) => {
  const lists = [{}];
  return res.status(httpStatus.OK).json(lists);
};

export const createScheduleController = async (req: Request, res: Response) => {
  const data = await createSchedule(req.body);
  return res.status(httpStatus.CREATED).json(data);
};

export const updateScheduleController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateAccount = {}
  return res.status(httpStatus.OK).json(updateAccount);
};

export const deleteScheduleController = async (req: Request, res: Response) => {
  const { id } = req.params;

  return res.status(httpStatus.NO_CONTENT).send();
};

export const getScheduleController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const schedule = await getSchedule(id);
  return res.status(httpStatus.OK).json(schedule);
};
