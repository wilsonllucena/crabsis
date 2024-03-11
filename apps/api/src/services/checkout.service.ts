import { UserRepository } from '@src/repositories/user.repository'
import { createCheckoutSession } from '@src/shared/lib/stripe'
import { container } from 'tsyringe'
const userRepository = container.resolve(UserRepository)

export const createCheckoutService = async (userId: string) => {
  const user = await userRepository.getById(userId)

  if (!user.length) {
    throw new Error('User not found')
  }

  const checkout = await createCheckoutSession(userId, user[0].email)

  await userRepository.update(userId, {
    stripeCustomerId: checkout.stripeCustomerId,
  })

  return checkout
}
