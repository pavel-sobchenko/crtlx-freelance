import { inject } from '@angular/core';
import { AuthState } from "@src/app/state/auth.state";
import { Store } from "@ngxs/store";

export const authGuard = (): boolean => {
  const store = inject(Store);
  return store.selectSnapshot(AuthState.isAuthenticated);
};
