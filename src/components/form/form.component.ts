import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  formList = [{id: 1}]
  amountOfForms = 0;
  updateSuccess: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.amountOfForms = this.formList.length;
  }

  addForm() {
    this.formList.push({id: Date.now()});
    this.amountOfForms = this.formList.length;

    setTimeout(() => {
      this.updateSuccess.emit(true);
    })

  }
}
