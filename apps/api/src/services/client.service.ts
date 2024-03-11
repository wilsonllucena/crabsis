import { container } from 'tsyringe'
import { ConflictError } from '@src/shared/errors/api-error'
import { ClientRepository } from '@src/repositories/client.repository'
import { Client } from '@src/dtos/client.dto'

const clientRepository = container.resolve(ClientRepository)

export const listClientService = async (accountId: string) => {
  return await clientRepository.list(accountId)
}
export const createClientService = async (input: Client) => {
  const { accountId } = input
  const userExists = await clientRepository.getByEmail(input.email, accountId)

  if (userExists.length) {
    throw new ConflictError('Client already exists in this account')
  }

  const user = clientRepository.create({
    ...input,
  })

  return user
}

export const updateClientService = async (
  id: string,
  input: Partial<Client>,
) => {
  const user = await clientRepository.update(id, input)
  return user
}

export const deleteClientService = async (id: string, accountId: string) => {
  await clientRepository.delete(id, accountId)
}

export const getClientService = async (id: string, accountId: string) => {
  const user = await clientRepository.getById(id, accountId)
  return user
}

export const getClientByEmailService = async (
  email: string,
  accountId: string,
) => {
  const user = await clientRepository.getByEmail(email, accountId)
  return user.shift()
}

export const getClientByIdUnique = async (id: string, accountId: string) => {
  const user = await clientRepository.getById(id, accountId)
  return user.shift()
}
