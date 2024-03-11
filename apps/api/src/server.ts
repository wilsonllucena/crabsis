import 'reflect-metadata'
import 'dotenv/config'
import 'express-async-errors'

import express from 'express'
import bodyParser from 'body-parser'
import { router, routerAccount } from './routes'
import env from '../config/env'
import logger from './shared/lib/logger'
import { errorHandlerMiddleware } from './middlewares/error'
import { stripeWebhookController } from './controllers/stripe.controller'
// import { connectionMiddleware } from './middlewares/connection'
const port = env.PORT
const app = express()

app.use('/webhook', bodyParser.raw({ type: 'application/json' }))

router.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json3' }),
  stripeWebhookController,
)

app.use(express.json())
app.use(routerAccount)
app.use(router)
app.use(errorHandlerMiddleware)

app.listen(port, () => logger.info(`Server is running`))
