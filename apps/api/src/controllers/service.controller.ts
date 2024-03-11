import {
  createServiceService,
  deleteServiceService,
  getServiceService,
  listServiceService,
  updateServiceService,
} from '@src/services/services.service'
import { Request, Response } from 'express'

import httpStatus from 'http-status'

export const listServiceController = async (req: Request, res: Response) => {
  const accountId = req.headers['x-tenant'] as string
  const users = await listServiceService(accountId)
  return res.status(httpStatus.OK).json(users)
}

export const createServiceController = async (req: Request, res: Response) => {
  const accountId = req.headers['x-tenant'] as string
  const user = await createServiceService({
    ...req.body,
    accountId,
  })
  return res.status(httpStatus.CREATED).json(user)
}

export const updateServiceController = async (req: Request, res: Response) => {
  const accountId = req.headers['x-tenant'] as string

  const { id } = req.params
  const updatedService = await updateServiceService(id, {
    ...req.body,
    accountId,
  })
  return res.status(httpStatus.OK).json(updatedService)
}

export const deleteServiceController = async (req: Request, res: Response) => {
  const { id } = req.params
  const accountId = req.headers['x-tenant'] as string

  await deleteServiceService(id, accountId)

  return res.status(httpStatus.NO_CONTENT).send()
}

export const getServiceController = async (req: Request, res: Response) => {
  const { id } = req.params
  const accountId = req.headers['x-tenant'] as string

  const user = await getServiceService(id, accountId)
  return res.status(httpStatus.OK).json(user)
}
