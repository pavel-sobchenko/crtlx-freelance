import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Injector,
  Input,
  OnInit
} from '@angular/core'
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl
} from '@angular/forms'
import { ValidationMessageComponent } from '@shared/components/validation-message/validation-message.component'
import { FormLabelDirective } from '@shared/directives/form-label/form-label.directive'
import { NgIf } from '@angular/common'

@Component({
  selector: 'image-upload',
  standalone: true,
  imports: [ValidationMessageComponent, FormLabelDirective, NgIf],
  templateUrl: './image-upload.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true
    }
  ]
})
export class ImageUploadComponent implements OnInit, ControlValueAccessor {
  @Input() public accept: string[] = ['.jpg', '.jpeg']
  @Input() public url: string | ArrayBuffer | Blob = null
  @Input() public label = 'Upload File'
  public formControl: FormControl

  constructor(
    private readonly _cd: ChangeDetectorRef,
    private readonly _injector: Injector
  ) {}

  public ngOnInit(): void {
    const ngControl = this._injector.get(NgControl)

    if (ngControl instanceof FormControlName) {
      this.formControl = this._injector
        .get(FormGroupDirective)
        .getControl(ngControl)
    } else {
      this.formControl = (ngControl as FormControlDirective).form
    }
  }

  public onChange: (file: File | null) => void = () => {}
  public onTouched: () => void = () => {}

  public onFileSelected(file: File): void {
    if (!file) return
    this.onTouched()

    this.onChange(file)
    this._updateImagePreview(file)
  }

  public writeValue(file: File | null): void {
    this._updateImagePreview(file)
  }

  public registerOnChange(fn: (file: File | null) => void): void {
    this.onChange = fn
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  private _updateImagePreview(file: File | null): void {
    if (!file) {
      this.url = null
      this._cd.markForCheck()

      return
    }

    if (!(file instanceof File)) {
      this.url = file
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
