import { Directive, EventEmitter, HostBinding, HostListener, Output, Sanitizer } from '@angular/core'

@Directive({
  selector: '[appDragDrop]',
  standalone: true
})
export class DragDropDirective {
  @Output() public readonly file = new EventEmitter<FileList>()
  @HostBinding('style.background') private _background = ''

  constructor(private readonly _sanitizer: Sanitizer) {}

  @HostListener('dragover', ['$event']) public onDragOver(
    event: DragEvent
  ): void {
    event.preventDefault()
    event.stopPropagation()
    this._background = '#999'
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(
    event: DragEvent
  ): void {
    event.preventDefault()
    event.stopPropagation()
    this._background = ''
  }

  @HostListener('drop', ['$event']) public onDrop(event: DragEvent): void {
    event.preventDefault()
    event.stopPropagation()

    const files = event.dataTransfer.files

    this._background = ''

    this.file.emit(files)
  }
}
