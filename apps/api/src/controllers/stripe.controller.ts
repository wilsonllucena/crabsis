/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from '@src/shared/lib/logger'
import {
  handleProcessWebhookCheckout,
  handleProcessWebhookUpdateSubscription,
  stripe,
} from '@src/shared/lib/stripe'
import env from 'config/env'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import Stripe from 'stripe'

export const stripeWebhookController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  let event: Stripe.Event = req.body

  if (!env.STRIPE_WEBHOOK_SECRET) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send('STRIPE_WEBHOOK_SECRET not set')
  }

  const signature = req.headers['stripe-signature'] as string

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    )
  } catch (err: any) {
    logger.error(JSON.stringify(err))
    return res.sendStatus(httpStatus.BAD_REQUEST)
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        logger.info('checkout.session.completed')
        console.log(event.data)
        await handleProcessWebhookCheckout(event.data)
        break
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        logger.info('customer.subscription.updated')
        await handleProcessWebhookUpdateSubscription(event.data)
        break
      default:
        logger.info(`Unhandled event type ${event.type}`)
    }
  } catch (error) {
    logger.error(JSON.stringify(error))
  }

  res.sendStatus(httpStatus.OK)
}
