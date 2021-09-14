import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { EmployeeSearchComponent } from './unishf/employee-search/employee-search.component';

import { DatepickerModule } from 'ng2-datepicker';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './unishf/not-found/not-found.component';

 

@NgModule({

  declarations: [

    AppComponent,

    EmployeeSearchComponent,
     NotFoundComponent

  ],

  imports: [

    BrowserModule, DatepickerModule,

    AppRoutingModule,

    HttpClientModule,

    FormsModule  

  ],

  providers: [],

  bootstrap: [AppComponent]

})

export class AppModule { }