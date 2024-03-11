import { container } from 'tsyringe'
import { Service } from '@src/dtos/service.dto'
import { ServiceRepository } from '@src/repositories/service.repository'

const serviceRepository = container.resolve(ServiceRepository)

export const listServiceService = async (userId: string) => {
  return await serviceRepository.list(userId)
}
export const createServiceService = async (input: Service) => {
  const service = serviceRepository.create({
    ...input,
  })

  return service
}

export const updateServiceService = async (
  id: string,
  input: Partial<Service>,
) => {
  const service = await serviceRepository.update(id, input)
  return service
}

export const deleteServiceService = async (id: string, userId: string) => {
  await serviceRepository.delete(id, userId)
}

export const getServiceService = async (id: string, accountId: string) => {
  const service = await serviceRepository.getById(id, accountId)
  return service
}
