import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() headElements: string[];
  @Input() keyElements: string[];
  @Input() records: object[];
  @Input() isActions: boolean;
  @Input() searchTerm: string;
  @Input() isProcessing: boolean;
  @Output() onEdit: EventEmitter<void> = new EventEmitter();
  @Output() onRemove: EventEmitter<void> = new EventEmitter();

  pageCount: number = 1;

  constructor() {}

  ngOnInit(): void {}
}
