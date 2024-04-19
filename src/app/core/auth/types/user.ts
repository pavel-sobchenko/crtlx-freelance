export type User = {
  id: string
  avatar: string
  name: string
  createdAt: Date
  updatedAt: Date
  address: Address
}

type Address = {
  street: string
  city: string
  postCode: string
  country: string
}
