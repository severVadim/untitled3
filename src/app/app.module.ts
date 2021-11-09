import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormComponent } from '../components/form/form.component';
import { FormItemComponent } from '../components/form-item/form-item.component';
import {GoogleChartsModule} from "angular-google-charts";
import {ChartComponent} from "../components/chart/chart.component";



@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FormItemComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    GoogleChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
