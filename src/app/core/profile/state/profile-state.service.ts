import { User } from '@core/auth/types/user'
import { Action, State, StateContext } from '@ngxs/store'
import { Injectable } from '@angular/core'
import { ProfileService } from '@core/profile/services/profile.service'
import { Observable, tap } from 'rxjs'
import { GetUserProfile, UpdateUserProfile } from '@core/profile/state/profile.actions'

export interface ProfileState {
  user?: User
}

const defaultState: ProfileState = {}

@State<ProfileState>({
  name: 'profile',
  defaults: defaultState
})
@Injectable()
export class ProfileStateService {
  constructor(private readonly _profileService: ProfileService) {}

  @Action(GetUserProfile)
  public getUserProfile({
    patchState
  }: StateContext<ProfileState>): Observable<User> {
    return this._profileService
      .getUserProfile()
      .pipe(tap(user => patchState({ user })))
  }

  @Action(UpdateUserProfile)
  public updateUserInfo(
    { patchState }: StateContext<ProfileState>,
    { user }: UpdateUserProfile
  ): Observable<User> {
    return this._profileService.updateUserInfo(user)
  }
}
