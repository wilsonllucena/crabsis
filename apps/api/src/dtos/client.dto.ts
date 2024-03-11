import { z } from 'zod'

const clientSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  address: z.string().optional(),
  phone: z.string(),
  active: z.boolean().optional(),
  accountId: z.string(),
  createdAt: z.string().optional(),
})

export type Client = z.infer<typeof clientSchema>
