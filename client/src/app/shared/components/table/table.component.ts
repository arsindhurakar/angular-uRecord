import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() elements: object[];
  @Input() records: object[];
  @Input() isActions: boolean;
  @Input() searchTerm: string;
  @Input() isProcessing: boolean;
  @Output() onEdit: EventEmitter<void> = new EventEmitter();
  @Output() onRemove: EventEmitter<void> = new EventEmitter();

  pageCount: number = 1;
  itemsPerPage: number = 5;

  constructor() {}
}
