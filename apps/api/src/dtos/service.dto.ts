import { z } from 'zod'

const serviceSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.string(),
  description: z.string().optional(),
  active: z.boolean().optional(),
  accountId: z.string(),
})

export type Service = z.infer<typeof serviceSchema>
