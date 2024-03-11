import { z } from 'zod'

const userSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  accountId: z.string(),
  password: z.string(),
  createdAt: z.string().optional(),
})

export type UserInput = z.infer<typeof userSchema>
