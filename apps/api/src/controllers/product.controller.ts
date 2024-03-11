import {
  createProductService,
  deleteProductService,
  getProductService,
  listProductService,
  updateProductService,
} from '@src/services/product.service'
import { Request, Response } from 'express'

import httpStatus from 'http-status'

export const listProductController = async (req: Request, res: Response) => {
  const accountId = req.headers['x-tenant'] as string
  const users = await listProductService(accountId)
  return res.status(httpStatus.OK).json(users)
}

export const createProductController = async (req: Request, res: Response) => {
  const accountId = req.headers['x-tenant'] as string
  const user = await createProductService({
    ...req.body,
    accountId,
  })
  return res.status(httpStatus.CREATED).json(user)
}

export const updateProductController = async (req: Request, res: Response) => {
  const accountId = req.headers['x-tenant'] as string

  const { id } = req.params
  const updatedProduct = await updateProductService(id, {
    ...req.body,
    accountId,
  })
  return res.status(httpStatus.OK).json(updatedProduct)
}

export const deleteProductController = async (req: Request, res: Response) => {
  const { id } = req.params
  const accountId = req.headers['x-tenant'] as string

  await deleteProductService(id, accountId)

  return res.status(httpStatus.NO_CONTENT).send()
}

export const getProductController = async (req: Request, res: Response) => {
  const { id } = req.params
  const accountId = req.headers['x-tenant'] as string

  const user = await getProductService(id, accountId)
  return res.status(httpStatus.OK).json(user)
}
