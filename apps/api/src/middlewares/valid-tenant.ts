/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccountRepository } from '@src/repositories/account.repository'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { container } from 'tsyringe'

const accountRepository = container.resolve(AccountRepository)
export const validTenantMiddleware = async(
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accountId = req.headers['x-tenant'] as string

  if (!accountId) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Tenant is required' })
  }

  const account = await accountRepository.getByIdOnly(accountId)

  if (!account.length) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Tenant not found' })
  }
  
  next()
}
