import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core'

import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ValidationMessageComponent } from '@shared/components/validation-message/validation-message.component'
import { User } from '@core/auth/types/user'
import { COUNTRIES } from '../../constants/countries'
import { NgIf, NgOptimizedImage } from '@angular/common'
import { AppButtonDirective } from '@shared/directives/app-button/app-button.directive'
import { FormInputDirective } from '@shared/directives/form-input/form-input.directive'
import { FormLabelDirective } from '@shared/directives/form-label/form-label.directive'
import { ImageUploadComponent } from '@shared/components/image-upload/image-upload.component'
import { fileExtensionValidator } from '@shared/validators/file-extension-validator'

@Component({
  selector: 'settings-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ValidationMessageComponent,
    FormInputDirective,
    FormLabelDirective,
    AppButtonDirective,
    NgOptimizedImage,
    ImageUploadComponent,
    NgIf
  ],
  templateUrl: './settings-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsFormComponent {
  public readonly accept = ['.png', '.jpg', '.jpeg']
  public readonly user = input<User>()
  public readonly submitForm = output<FormData>()
  public readonly countries = inject(COUNTRIES)
  public readonly _fb = inject(NonNullableFormBuilder)

  public form = this._fb.group({
    avatar: ['', [fileExtensionValidator(this.accept)]],
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    address: this._fb.group({
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postCode: ['', [Validators.required]],
      country: ['', [Validators.required]]
    })
  })

  constructor() {
    effect(() => {
      if (!this.user()) return

      const { name, email, address, avatar } = this.user()

      this.form.patchValue({ name, email, address })
      this.form.patchValue({ avatar })
    })
  }

  public update(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    const { name, address, avatar } = this.form.value
    const formData = new FormData()

    formData.append('avatar', avatar)
    formData.append('name', name)
    formData.append('address[street]', address.street)
    formData.append('address[city]', address.city)
    formData.append('address[postCode]', address.postCode)
    formData.append('address[country]', address.country)

    this.submitForm.emit(formData)
  }
}
