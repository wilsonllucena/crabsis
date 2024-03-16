import { z } from "zod";

const scheduleSchema = z.object({
  id: z.string().optional(),
  clientId: z.string(),
  serviceId: z.string(),
  accountId: z.string(),
  userId: z.string().optional(),
  date: z.string(),
  observation: z.string().optional(),
  active: z.boolean().optional(),
  createdAt: z.string().optional(),
});

export type Schedule = z.infer<typeof scheduleSchema>;
