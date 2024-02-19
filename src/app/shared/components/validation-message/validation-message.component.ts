import { Component, Inject, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ERROR_VALIDATION } from '../../../features/auth/constants/errors';

@Component({
  selector: 'validation-message',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './validation-message.component.html',
})
export class ValidationMessageComponent {

  @Input() public control!: AbstractControl;

  constructor(@Inject(ERROR_VALIDATION) public readonly _errorMessages: Record<string, string>) {}

  public get errorMessage(): string | null {
    if (!this.control.touched || !this.control?.errors) {
      return null;
    }

    const errors = this.control.errors;

    return this._errorMessages[Object.keys(errors)[0]] || this._getAsyncErrorMessage(this.control.errors);
  }

  private _getAsyncErrorMessage(errors: ValidationErrors): string | null {
    const errorMessages: string[] = [];

    Object.entries(errors).forEach(([key, value]) => {
      errorMessages.push(value as string);
    })

    return errorMessages[0] || null;
  }
}
