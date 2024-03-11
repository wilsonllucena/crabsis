import { createCheckoutService } from '@src/services/checkout.service'
import { Request, Response } from 'express'
import httpStatus from 'http-status'

export const checkoutController = async (req: Request, res: Response) => {
  const accountId = req.headers['x-tenant'] as string

  const checkout = await createCheckoutService(accountId)

  return res.status(httpStatus.OK).json(checkout)
}
