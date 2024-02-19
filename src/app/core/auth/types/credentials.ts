export type Credentials = {
  email: string
  password: string
  name: string
}

export type LoginCredentials = Omit<Credentials, 'name'>
