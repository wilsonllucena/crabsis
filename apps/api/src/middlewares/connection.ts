import { UserRepository } from '@src/repositories/user.repository'
import { BadRequestError } from '@src/shared/errors/api-error'
// import { getClientByTenant } from '@src/shared/lib/connection_client'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'
const userRepository = container.resolve(UserRepository)

export const connectionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const tenantId: string = req.headers['x-tenant'] as string
  const tenant = await userRepository.getById(tenantId)

  if (!tenant.length) {
    throw new BadRequestError(
      'Database connection tenant not found! Please check the tenant name!',
    )
  }

  try {
    // await getClientByTenant(tenant[0].email)
    next()
  } catch (e) {
    throw new Error('Oops! Something went wrong!')
  }
}
