import { UserRepository } from '@src/repositories/user.repository'
import { UserInput } from '@src/dtos/user'
import { ConflictError } from '@src/shared/errors/api-error'
import { container } from 'tsyringe'
import { generateHash } from '@src/shared/utils/bcryp-hash'
import { compare } from 'bcryptjs'

const userRepository = container.resolve(UserRepository)

export const listUserService = async (accountId: string) => {
  return await userRepository.list(accountId)
}
export const createUserService = async (input: UserInput) => {
  const { password, accountId } = input
  const userExists = await userRepository.getByEmail(input.email, accountId)

  if (userExists.length) {
    throw new ConflictError('User already exists')
  }

  const passwordHash = await generateHash(password)

  const user = userRepository.create({
    ...input,
    password: passwordHash,
  })

  return user
}

export const updateUserService = async (
  id: string,
  input: Partial<UserInput>,
) => {
  if (input.password && !(await compare(input.password, input.password))) {
    input.password = await generateHash(input.password)
  }
  const user = await userRepository.update(id, input)
  return user
}

export const deleteUserService = async (id: string, accountId: string) => {
  await userRepository.delete(id, accountId)
}

export const getUserService = async (id: string, accountId: string) => {
  const user = await userRepository.getById(id, accountId)
  return user
}

export const getUserByEmailService = async (
  email: string,
  accountId: string,
) => {
  const user = await userRepository.getByEmail(email, accountId)
  return user.shift()
}

export const getUserByIdUnique = async (id: string, accountId: string) => {
  const user = await userRepository.getById(id, accountId)
  return user.shift()
}
