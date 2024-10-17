import { Address } from '@core/types/address'

export type User = {
  id: string
  avatar: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  address: Address
}
