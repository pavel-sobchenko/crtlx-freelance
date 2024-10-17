import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input } from '@angular/core'

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { DragDropDirective } from '@shared/directives/drag-drop.directive'
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'file-upload',
  standalone: true,
  imports: [DragDropDirective, NgOptimizedImage],
  templateUrl: './file-upload.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input() public url: string | ArrayBuffer | null = null
  @Input() public accept = ''
  @Input() public dimension: { width: number; height: number }

  public onChange: Function
  public onTouched: Function
  public file: File | null = null

  constructor(
    private readonly _host: ElementRef<HTMLInputElement>,
    private readonly _cd: ChangeDetectorRef
  ) {}

  @HostListener('change', ['$event.target.files']) public emitFiles(
    event: FileList
  ): void {
    this._readFile(event?.item(0))
  }

  public writeValue(): void {
    this._host.nativeElement.value = ''
    this.file = null
  }

  public registerOnChange(fn: Function): void {
    this.onChange = fn
  }

  public registerOnTouched(fn: Function): void {
    this.onTouched = fn
  }

  public filesDropped(fileList: FileList): void {
    this._readFile(fileList?.item(0))
  }

  private _readFile(file: File): void {
    if (!file) return
    this.onChange(file)
    this.onTouched()
    this.file = file

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
      this.url = reader.result

      this._cd.markForCheck()
    }
  }
}
