import { hash, compare } from 'bcryptjs'

export const generateHash = async (password: string) => {
  const saltRounds = 8
  return await hash(password, saltRounds)
}

export const compareHash = async (
  payload: string,
  hashed: string,
): Promise<boolean> => {
  return await compare(payload, hashed)
}
