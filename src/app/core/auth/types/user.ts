export type User = {
  id?: string
  avatar?: string
  name?: string
  email?: string
  createdAt?: Date
  updatedAt?: Date
  address?: Address
}
export type Address = {
  street?: string
  city?: string
  postCode?: string
  country?: string
}
