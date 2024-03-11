/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from 'stripe'
import env from '../../../config/env'
import logger from './logger'
import { ApiError, NotFoundError } from '../errors/api-error'
import httpStatus from 'http-status'
import {
  getAccountByIdUnique,
  getAccountByStripeCustomerIdService,
  updateAccountService,
} from '@src/services/account.service'

type CustomerInput = {
  userId?: string
  name?: string
  email: string
}
export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export const stripeWebhookSecret = env.STRIPE_WEBHOOK_SECRET

const getStripeCustomerByEmail = async (email: string) => {
  const customers = await stripe.customers.list({ email })
  return customers.data[0]
}

export const createStripeCustomer = async ({ name, email }: CustomerInput) => {
  const customer = await getStripeCustomerByEmail(email)

  if (customer) return customer

  return stripe.customers.create({
    name,
    email,
  })
}

export const createCheckoutSession = async (userId: string, email: string) => {
  try {
    const customer = await createStripeCustomer({ email })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription', // MODO DE ASSINATURA
      client_reference_id: userId,
      customer: customer.id,
      success_url: `${env.CLIENT_URL}/success`,
      cancel_url: `${env.CLIENT_URL}/cancel`,
      line_items: [
        {
          price: env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
    })

    return {
      url: session.url,
      stripeCustomerId: customer.id,
    }
  } catch (error: any) {
    logger.error('Error creating checkout session')
    logger.error(error.message)
    throw new ApiError(
      'Error creating checkout session',
      httpStatus.INTERNAL_SERVER_ERROR,
    )
  }
}

export const handleProcessWebhookCheckout = async (event: {
  object: Stripe.Checkout.Session
}) => {
  const clientReferenceId = event.object.client_reference_id as string
  const stripeCustomerId = event.object.customer as string
  const stripeSubscriptionId = event.object.subscription as string
  const checkoutStatus = event.object.status as string

  console.log('checkoutStatus: ', checkoutStatus)
  if (checkoutStatus !== 'complete') {
    console.log('Retun vazio')
    return
  }

  if (!stripeCustomerId || !stripeSubscriptionId || !clientReferenceId) {
    logger.error(`User not found in process webhook checkout`)
    throw new NotFoundError(
      `clientReferenceId,tripeSubscriptionId or stripeCustomerId not found`,
    )
  }

  const account = await getAccountByIdUnique(clientReferenceId)

  if (!account) {
    logger.error(`User not found in process webhook checkout`)
    throw new NotFoundError(`User not found`)
  }

  await updateAccountService(account[0].id, {
    stripeCustomerId,
    stripeSubscriptionId,
  })
}
export const handleProcessWebhookUpdateSubscription = async (event: {
  object: Stripe.Subscription
}) => {
  logger.info('handleWebhookUpdateSubscription')

  const stripeSubscriptionId = event.object.id as string
  const stripeCustomerId = event.object.customer as string
  const stripeSubscriptionStatus = event.object.status as string

  console.log('stripeSubscriptionStatus: ', stripeSubscriptionStatus)
  const user = await getAccountByStripeCustomerIdService(stripeCustomerId)

  if (!user) {
    throw new NotFoundError(`User stripeCustomerId not found`)
  }

  await updateAccountService(user.id, {
    stripeCustomerId,
    stripeSubscriptionId,
    stripeSubscriptionStatus,
  })
}
