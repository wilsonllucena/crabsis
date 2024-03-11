import { z } from 'zod'

const productSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.string(),
  description: z.string().optional(),
  quantity: z.coerce.number(),
  active: z.boolean().optional(),
  accountId: z.string(),
})

export type ProductInput = z.infer<typeof productSchema>
