import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, OnInit, output } from '@angular/core'

import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ValidationMessageComponent } from '@shared/components/validation-message/validation-message.component'
import { User } from '@core/auth/types/user'
import { COUNTRIES } from '../../constants/countries'
import { FormInputDirective } from '@shared/directives/form-input.directive'
import { FormLabelDirective } from '@shared/directives/form-label.directive'
import { AppButtonDirective } from '@shared/directives/app-button.directive'
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'settings-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ValidationMessageComponent,
    FormInputDirective,
    FormLabelDirective,
    AppButtonDirective,
    NgOptimizedImage
  ],
  templateUrl: './settings-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsFormComponent implements OnInit {
  public readonly user = input<User>()
  public readonly submitForm = output<FormData>()
  public readonly countries = inject(COUNTRIES)
  public url: string | ArrayBuffer = null

  public form = this._fb.group({
    avatar: [null],
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    address: this._fb.group({
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postCode: ['', [Validators.required]],
      country: ['', [Validators.required]]
    })
  })

  private _avatar: File

  constructor(
    private readonly _fb: NonNullableFormBuilder,
    private readonly _cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    const { name, email, address, avatar } = this.user()

    this.form.patchValue({ name, email, address })
    this.url = avatar
  }

  public submit(): void {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    const { name, address } = this.form.value
    const formData = new FormData()

    formData.append('avatar', this._avatar)
    formData.append('name', name)
    formData.append('address[street]', address.street)
    formData.append('address[city]', address.city)
    formData.append('address[postCode]', address.postCode)
    formData.append('address[country]', address.country)

    this.submitForm.emit(formData)
  }

  public onFileSelected(file: File): void {
    this._avatar = file
    if (!file) return

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
      this.url = reader.result
      this._cd.markForCheck()
    }
  }
}
