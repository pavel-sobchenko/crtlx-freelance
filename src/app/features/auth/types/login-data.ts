import { LoginCredentials } from '@core/auth/types/credentials'

export type LoginData = LoginCredentials & { remember: boolean }
