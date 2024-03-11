import { Request, Response } from 'express'
import {
  createClientService,
  updateClientService,
  deleteClientService,
  getClientService,
  listClientService,
} from '@src/services/client.service'
import httpStatus from 'http-status'

export const listClientController = async (req: Request, res: Response) => {
  const accountId = req.headers['x-tenant'] as string
  const users = await listClientService(accountId)
  return res.status(httpStatus.OK).json(users)
}

export const createClientController = async (req: Request, res: Response) => {
  const accountId = req.headers['x-tenant'] as string

  const user = await createClientService({
    ...req.body,
    accountId,
  })
  return res.status(httpStatus.CREATED).json(user)
}

export const updateClientController = async (req: Request, res: Response) => {
  const { id } = req.params
  const accountId = req.headers['x-tenant'] as string

  const updatedClient = await updateClientService(id, {
    ...req.body,
    accountId,
  })
  return res.status(httpStatus.OK).json(updatedClient)
}

export const deleteClientController = async (req: Request, res: Response) => {
  const { id } = req.params
  const accountId = req.headers['x-tenant'] as string
  await deleteClientService(id, accountId)

  return res.status(httpStatus.NO_CONTENT).send()
}

export const getClientController = async (req: Request, res: Response) => {
  const { id } = req.params
  const accountId = req.headers['x-tenant'] as string
  const user = await getClientService(id, accountId)
  return res.status(httpStatus.OK).json(user)
}
