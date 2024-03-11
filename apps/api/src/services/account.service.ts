import { ConflictError } from '@src/shared/errors/api-error'
import { createStripeCustomer } from '@src/shared/lib/stripe'
import { container } from 'tsyringe'
import { AccountRepository } from '@src/repositories/account.repository'
import { Account } from '@src/dtos/account.dto'

const accountRepository = container.resolve(AccountRepository)

export const listAccountService = async () => {
  return await accountRepository.list()
}
export const createAccountService = async (input: Account) => {
  const accountExists = await accountRepository.getByEmail(input.email)

  if (accountExists.length) {
    throw new ConflictError('Account already exists')
  }

  const stripeCustomer = await createStripeCustomer({
    name: input.name,
    email: input.email,
  })

  return await accountRepository.create({
    ...input,
    stripeCustomerId: stripeCustomer.id,
  })
}

export const updateAccountService = async (
  id: string,
  input: Partial<Account>,
) => {
  return await accountRepository.update(id, input)
}

export const deleteAccountService = async (id: string) => {
  await accountRepository.delete(id)
}

export const getAccountService = async (id: string) => {
  return await accountRepository.getById(id)
}

export const getAccountByEmailService = async (email: string) => {
  return await accountRepository.getByEmail(email)
}

export const getAccountByStripeCustomerIdService = async (
  stripeCustomerId: string,
) => {
  return (
    await accountRepository.getByStripeCustomerId(stripeCustomerId)
  ).shift()
}

export const getAccountByIdUnique = async (id: string) => {
  return await accountRepository.getById(id)
}
