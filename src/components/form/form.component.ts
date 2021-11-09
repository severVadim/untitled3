import {Component, OnInit, EventEmitter, QueryList, ViewChildren, Input, Directive} from '@angular/core';
import {FormItemComponent} from '../form-item/form-item.component';
import {GetDataService} from '../../services/get-data.service'
import {NgForm} from "@angular/forms";

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
  charts = [];

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
    let requestBody = {};

    let databases: string[] = [];
    let amount = form.controls['amount'].value;
    Object.keys(form.controls).forEach(key => {
      if (form.controls[key].value === true) {
        databases.push(key)
      }
    });
    let requestModels: any[] = [];
    this.formItems.forEach(item => {
      console.log(item);
      let column = {};
      Object.assign(column, {name: item.name});
      Object.assign(column, {type: item.type});
      Object.assign(column, {primaryKey: item.isPrimaryKey});
      let valueRange = {};
      Object.assign(valueRange, {fromValue: item.fromValue});
      Object.assign(valueRange, {toValue: item.toValue});
      Object.assign(valueRange, {values: item.values.split(";")});
      let requestModel = {};
      Object.assign(requestModel, {valueRange: valueRange});
      Object.assign(requestModel, {column: column});
      requestModels.push(requestModel)
    });
    Object.assign(requestBody, {databases: databases});
    Object.assign(requestBody, {requestModels: requestModels});
    console.log(requestBody);
    this.getDataService.saveConfig(amount, requestBody).subscribe((resp: any) => {
      this.charts = resp;
      console.log(this.charts)
    });
    this.isSubmitted = true;
  }

  backToForm() {
    this.isSubmitted = false;
  }
}
