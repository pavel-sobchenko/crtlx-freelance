import { Selector } from '@ngxs/store'
import { ProfileState, ProfileStateService } from '@core/profile/state/profile-state.service'
import { User } from '@core/auth/types/user'

export class ProfileStateSelectors {
  @Selector([ProfileStateService])
  public static user({ user }: ProfileState): User {
    return user
  }
}
