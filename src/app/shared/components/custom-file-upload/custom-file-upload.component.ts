import { ChangeDetectionStrategy, ChangeDetectorRef, Component, input, model, output } from '@angular/core'
import { NgOptimizedImage } from '@angular/common'
import { DragDropDirective } from '@shared/directives/drag-drop.directive'

@Component({
  selector: 'custom-file-upload',
  standalone: true,
  templateUrl: './custom-file-upload.component.html',
  imports: [NgOptimizedImage, DragDropDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomFileUploadComponent {
  public accept = input<string>('')
  public showDescription = input<boolean>(true)
  public url = model<string | ArrayBuffer>('')
  public file: File | null = null
  public readonly upload = output<File>()

  constructor(private readonly _cd: ChangeDetectorRef) {}

  public filesDropped(files: FileList): void {
    this.uploadFile(files)
  }

  public uploadFile(files: FileList): void {
    debugger
    this.file = files[0] || null
    if (!this.file) return

    const reader = new FileReader()

    reader.readAsDataURL(this.file)

    reader.onload = () => {
      this.url.set(reader.result)
      this._cd.markForCheck()
      this.upload.emit(this.file)
    }
  }
}
