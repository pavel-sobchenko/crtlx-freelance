import { ChangeDetectionStrategy, Component, inject, input, OnInit, output } from '@angular/core'

import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ValidationMessageComponent } from '@shared/components/validation-message/validation-message.component'
import { User } from '@core/auth/types/user'
import { COUNTRIES } from '../../constants/countries'
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component'
import { requiredFileTypeValidator } from '@shared/validators/requiredFileTypeValidator'
import { dimensionFileValidator } from '@shared/validators/dimensionFileValidator'

@Component({
  selector: 'settings-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ValidationMessageComponent,
    FileUploadComponent
  ],
  templateUrl: './settings-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsFormComponent implements OnInit {
  public user = input<User>()
  public readonly submitForm = output<FormData>()
  public countries = inject(COUNTRIES)
  public dimension = { width: 800, height: 600 }

  public form = this._fb.group({
    avatar: [
      null,
      [Validators.required, requiredFileTypeValidator(['jpg', 'jpeg'])],
      dimensionFileValidator(this.dimension),
      { updateOn: 'change' }
    ],
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    street: ['', [Validators.required]],
    city: ['', [Validators.required]],
    postCode: ['', [Validators.required]],
    country: ['', [Validators.required]]
  })

  constructor(private readonly _fb: NonNullableFormBuilder) {}

  public ngOnInit(): void {
    const { name, email, address } = this.user()
    const {
      street = '',
      city = '',
      postCode = '',
      country = ''
    } = address || {}

    this.form.patchValue({ name, email, street, city, postCode, country })
  }

  public submit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    const { name, street, city, postCode, country, avatar } = this.form.value
    const formData = new FormData()

    formData.append('avatar', avatar)
    formData.append('name', name)
    formData.append('address[street]', street)
    formData.append('address[city]', city)
    formData.append('address[postCode]', postCode)
    formData.append('address[country]', country)

    this.submitForm.emit(formData)
  }
}
