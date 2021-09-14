import { Component, EventEmitter, OnInit, Output,NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Employees,EmployeeFitler } from 'src/app/Model/EmployeeSearch';
import { EmployeeSearchService } from '../employee-search.service';


@Component({
  selector: 'employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit {

  EmployeeSearchList:Employees[] = [];
  EmployeeFilters:EmployeeFitler[] = [];
  date = new Date();
  
  @Output() emitDetail = new EventEmitter();
  
  constructor( private employeeSearchService :EmployeeSearchService, private route:ActivatedRoute) {
   }

  ngOnInit(): void {
   
 
      // this.route.paramMap.subscribe((params: ParamMap) => {
      //   debugger;
      //   console.log(params);
      //   console.log( params.get('username'));

      // });


      this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
      }
    );

      this.employeeSearchService.GetEmployeeList().subscribe((res)=>{
          this.EmployeeSearchList = res;
      });

      this.employeeSearchService.GetEmployeeFilters().subscribe((res)=>{
        
        this.EmployeeFilters = res;
        this.EmployeeFilters.forEach(element => {
          
          if(element.type=="dropdown")
          {
              this.employeeSearchService.GetCountries('element.api').subscribe((response)=>{
          
                element.countries = response.Response;
              });
          }
        });
      });
  }
}
