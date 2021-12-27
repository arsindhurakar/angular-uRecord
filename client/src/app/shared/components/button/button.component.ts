import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() value: string;
  @Input() type: string;
  @Input() class: string;
  @Input() form: string;
  @Input() isProcessing: boolean;
  @Input() isInvalid: boolean;
  @Output() onClick: EventEmitter<void> = new EventEmitter();

  constructor() {}
}
