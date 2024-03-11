import {
  createAccountService,
  deleteAccountService,
  getAccountService,
  listAccountService,
  updateAccountService,
} from '@src/services/account.service'
import { Request, Response } from 'express'

import httpStatus from 'http-status'

export const listAccountController = async (req: Request, res: Response) => {
  const accounts = await listAccountService()
  return res.status(httpStatus.OK).json(accounts)
}

export const createAccountController = async (req: Request, res: Response) => {
  const account = await createAccountService(req.body)
  return res.status(httpStatus.CREATED).json(account)
}

export const updateAccountController = async (req: Request, res: Response) => {
  const { id } = req.params
  const updateAccount = await updateAccountService(id, req.body)
  return res.status(httpStatus.OK).json(updateAccount)
}

export const deleteAccountController = async (req: Request, res: Response) => {
  const { id } = req.params
  await deleteAccountService(id)

  return res.status(httpStatus.NO_CONTENT).send()
}

export const getAccountController = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await getAccountService(id)
  return res.status(httpStatus.OK).json(user)
}
