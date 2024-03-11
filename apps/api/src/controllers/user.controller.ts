import { Request, Response } from 'express'
import {
  createUserService,
  updateUserService,
  deleteUserService,
  getUserService,
  listUserService,
} from '@src/services/user.service'
import httpStatus from 'http-status'

export const listUserController = async (req: Request, res: Response) => {
  const accountId = req.headers['x-tenant'] as string
  const users = await listUserService(accountId)
  return res.status(httpStatus.OK).json(users)
}

export const createUserController = async (req: Request, res: Response) => {
  const accountId = req.headers['x-tenant'] as string

  const user = await createUserService({
    ...req.body,
    accountId,
  })
  return res.status(httpStatus.CREATED).json(user)
}

export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params
  const accountId = req.headers['x-tenant'] as string

  const updatedUser = await updateUserService(id, {
    ...req.body,
    accountId,
  })
  return res.status(httpStatus.OK).json(updatedUser)
}

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params
  const accountId = req.headers['x-tenant'] as string
  await deleteUserService(id, accountId)

  return res.status(httpStatus.NO_CONTENT).send()
}

export const getUserController = async (req: Request, res: Response) => {
  const { id } = req.params
  const accountId = req.headers['x-tenant'] as string
  const user = await getUserService(id, accountId)
  return res.status(httpStatus.OK).json(user)
}
