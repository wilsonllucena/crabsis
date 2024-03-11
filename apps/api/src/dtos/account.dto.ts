import { z } from 'zod'

const accountSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  stripeCustomerId: z.string().optional(),
  stripeSubscriptionId: z.string().optional(),
  stripeSubscriptionStatus: z.string().optional(),
  createdAt: z.string().optional(),
})

export type Account = z.infer<typeof accountSchema>
