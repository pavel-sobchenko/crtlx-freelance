import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core'
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms'
import { ValidationMessageComponent } from '@shared/components/validation-message/validation-message.component'
import { FormLabelDirective } from '@shared/directives/form-label/form-label.directive'
import { NgIf } from '@angular/common'

@Component({
  selector: 'file-upload',
  standalone: true,
  imports: [ValidationMessageComponent, FormLabelDirective, NgIf],
  templateUrl: './file-upload.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input() public allowedExtensions: string[] = ['.jpg', '.jpeg']
  @Input() public formControl: FormControl
  @Input() public url: string | ArrayBuffer = null
  @Input() public label = 'Upload File'
  @Output() public readonly fileSelected = new EventEmitter<File>()

  constructor(private readonly _cd: ChangeDetectorRef) {}

  public onChange: (file: File | null) => void = () => {}

  public onFileSelected(file: File): void {
    if (!file) return

    if (!this._validateFile(file)) {
      this.formControl.setErrors({ invalidFile: true })
      this.formControl.markAsTouched()
      this.onChange(null)
      this._cd.markForCheck()

      return
    }

    this.onChange(file)
    this.fileSelected.emit(file)
    this._updateImagePreview(file)
  }

  public writeValue(file: File | null): void {
    this._updateImagePreview(file)
  }

  public registerOnChange(fn: (file: File | null) => void): void {
    this.onChange = fn
  }

  public registerOnTouched(fn: () => void): void {}

  private _validateFile(file: File): boolean {
    const extension = file.name.split('.').pop()?.toLowerCase()

    return this.allowedExtensions.some(ext => ext.includes(extension))
  }

  private _updateImagePreview(file: File | null): void {
    if (!file) {
      this.url = null
      this._cd.markForCheck()

      return
    }

    const reader = new FileReader()

    reader.onload = e => {
      this.url = e.target.result
      this._cd.markForCheck()
    }
    reader.readAsDataURL(file)
  }
}
