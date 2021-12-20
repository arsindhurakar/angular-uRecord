import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-cancel',
  templateUrl: './button-cancel.component.html',
  styleUrls: ['./button-cancel.component.scss'],
})
export class ButtonCancelComponent {
  @Input() value: string;
  @Output() onClick: EventEmitter<void> = new EventEmitter();

  constructor() {}
}
