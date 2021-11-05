import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.css']
})
export class FormItemComponent implements OnInit {
  @Input() amountOfForms = 0;
  @Input() componentIndex: any;
  @Input() lastIndex = 1;
  @Input() updateSuccess: EventEmitter<any> | undefined;
  @Output() onAddFormItem: EventEmitter<any> = new EventEmitter<any>();

  isLast = false;

  constructor() { }

  ngOnInit(): void {
    this.isLast = this.amountOfForms - 1 === this.componentIndex;

    if (this.updateSuccess) {
      this.updateSuccess.subscribe(data => {
        this.isLast = this.amountOfForms - 1 === this.componentIndex;
      });
    }
  }

  addFormLine() {
    this.onAddFormItem.emit('1');
  }
}