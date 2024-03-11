import { ProductInput } from '@src/dtos/product.dto'
import { ProductRepository } from '@src/repositories/product.repository'
import { container } from 'tsyringe'

const productRepository = container.resolve(ProductRepository)

export const listProductService = async (userId: string) => {
  return await productRepository.list(userId)
}
export const createProductService = async (input: ProductInput) => {
  const product = productRepository.create({
    ...input,
  })

  return product
}

export const updateProductService = async (
  id: string,
  input: Partial<ProductInput>,
) => {
  const product = await productRepository.update(id, input)
  return product
}

export const deleteProductService = async (id: string, userId: string) => {
  await productRepository.delete(id, userId)
}

export const getProductService = async (id: string, accountId: string) => {
  const product = await productRepository.getById(id, accountId)
  return product
}
