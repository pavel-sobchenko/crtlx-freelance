import {
  APP_INITIALIZER,
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders
} from '@angular/core'
import { Store } from '@ngxs/store'
import { TokensStorage } from '../services/tokens-storage.service'
import { SetTokens } from '../state/auth.state.actions'

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
  const tokensStorage = inject(TokensStorage)

  return () => store.dispatch(new SetTokens(tokensStorage.get()))
}
