import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-button-ok',
  templateUrl: './button-ok.component.html',
  styleUrls: ['./button-ok.component.scss'],
})
export class ButtonOkComponent {
  @Input() value: string;
  @Output() onClick: EventEmitter<void> = new EventEmitter();

  constructor() {}
}
