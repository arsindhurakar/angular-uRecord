import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-submit',
  templateUrl: './button-submit.component.html',
  styleUrls: ['./button-submit.component.scss'],
})
export class ButtonSubmitComponent implements OnInit {
  @Input() value: string;
  @Input() form: string;
  @Input() isProcessing: boolean;

  constructor() {}

  ngOnInit(): void {}
}
