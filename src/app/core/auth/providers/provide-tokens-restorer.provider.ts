import {
  APP_INITIALIZER,
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders
} from '@angular/core'
import { Store } from '@ngxs/store'
import { TokensStorageService } from '../services/tokens-storage.service'
import { SetTokens } from '../state/auth.actions'

export function provideTokensRestorer(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      useFactory: restoreTokensFactory,
      multi: true
    }
  ])
}

function restoreTokensFactory(): () => void {
  const store = inject(Store)
  const tokenStorage = inject(TokensStorageService)

  return () => store.dispatch(new SetTokens(tokenStorage.get()))
}
