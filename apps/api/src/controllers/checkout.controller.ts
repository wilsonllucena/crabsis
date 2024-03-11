import { createCheckoutService } from '@src/services/checkout.service'
import { Request, Response } from 'express'
import httpStatus from 'http-status'

export const checkoutController = async (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string

  if (!userId) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Unauthorized' })
  }

  const checkout = await createCheckoutService(userId)

  return res.status(httpStatus.OK).json(checkout)
}
