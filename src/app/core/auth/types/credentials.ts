export type Credentials = {
  email: string
  password: string
}

export type RegisterData = { name: string } & Credentials
