import { Component, OnInit, EventEmitter, QueryList, ViewChildren} from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormItemComponent } from '../form-item/form-item.component';
import { GetDataService } from '../../services/get-data.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  // @ts-ignore
  @ViewChildren(FormItemComponent) formItems: QueryList<any>;

  isSubmitted = false;
  configsList = {
    databases: [
      {
        name: "",
        guid: ""
      }
    ],

    types: []
  };

  formList = [{id: 1}];
  amountOfForms = 0;
  updateSuccess: EventEmitter<any> = new EventEmitter();

  constructor(public getDataService: GetDataService) { }

  ngOnInit(): void {
    this.amountOfForms = this.formList.length;
    this.getDataService.getConfig().subscribe((config: any) => {
      this.configsList = config;
    });
  }

  addForm() {
    this.formList.push({id: Date.now()});
    this.amountOfForms = this.formList.length;

    setTimeout(() => {
      this.updateSuccess.emit(true);
    })

  }

  onSubmit(form: NgForm) {
    let body = {};

    // todo needs to prepare payload
    console.log(form);
    console.log(this.formItems);
    this.formItems.forEach(item => {
      console.log(item);
    });

    this.getDataService.saveConfig(body)//.then(data => {});
    this.isSubmitted = true;
  }

  backToForm() {
    this.isSubmitted = false;
  }
}
