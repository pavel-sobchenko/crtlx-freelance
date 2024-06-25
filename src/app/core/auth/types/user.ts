import { Address } from '@core/shared/types/address'

export type User = {
  id: string
  avatar: string
  name: string
  email: string
  address: Address
}
