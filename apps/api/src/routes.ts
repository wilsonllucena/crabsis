import { Router } from 'express'
import {
  createUserController,
  deleteUserController,
  getUserController,
  listUserController,
  updateUserController,
} from './controllers/user.controller'
import {
  createProductController,
  deleteProductController,
  getProductController,
  listProductController,
  updateProductController,
} from './controllers/product.controller'
import {
  createAccountController,
  deleteAccountController,
  getAccountController,
  listAccountController,
} from './controllers/account.controller'
import {
  createClientController,
  deleteClientController,
  getClientController,
  listClientController,
  updateClientController,
} from './controllers/client.controller'
import { checkoutController } from './controllers/checkout.controller'
import { createServiceController, deleteServiceController, getServiceController, listServiceController, updateServiceController } from './controllers/service.controller'
import { validTenantMiddleware } from './middlewares/valid-tenant'

const router = Router()
const routerAccount = Router()

// Routes for accounts
routerAccount.get('/accounts', listAccountController)
routerAccount.get('/account/:id', getAccountController)
routerAccount.patch('/account/:id', getAccountController)
routerAccount.delete('/account/:id', deleteAccountController)
routerAccount.post('/account', createAccountController)

router.use(validTenantMiddleware)

// Routes for users
router.get('/users', listUserController)
router.get('/user/:id', getUserController)
router.patch('/user/:id', updateUserController)
router.delete('/user/:id', deleteUserController)
router.post('/user', createUserController)

// Routes for clients
router.get('/clients', listClientController)
router.get('/client/:id', getClientController)
router.patch('/client/:id', updateClientController)
router.delete('/client/:id', deleteClientController)
router.post('/client', createClientController)

// Routes for products
router.get('/products', listProductController)
router.get('/product/:id', getProductController)
router.patch('/product/:id', updateProductController)
router.delete('/product/:id', deleteProductController)
router.post('/product', createProductController)

// Routes for services
router.get('/services', listServiceController)
router.get('/service/:id', getServiceController)
router.patch('/service/:id', updateServiceController)
router.delete('/service/:id', deleteServiceController)
router.post('/service', createServiceController)

// Routes for stripe
router.post('/checkout', checkoutController)


export { router, routerAccount };
