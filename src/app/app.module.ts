import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { EmployeeSearchComponent } from './unishf/employee-search/employee-search.component';

import { DatepickerModule } from 'ng2-datepicker';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './unishf/not-found/not-found.component';
import { PhonePipe } from './unishf/phonepipe';
import { UrlSerializer } from '@angular/router';
import { LowerCaseUrlSerializer } from './LowerCaseUrlSerializer';

 

@NgModule({

  declarations: [

    AppComponent,

    EmployeeSearchComponent,
     NotFoundComponent,
     PhonePipe

  ],

  imports: [

    BrowserModule, DatepickerModule,

    AppRoutingModule,

    HttpClientModule,

    FormsModule  , ReactiveFormsModule

  ],

  providers: [{
    provide: UrlSerializer,
    useClass: LowerCaseUrlSerializer
}],

  bootstrap: [AppComponent]

})

export class AppModule { }