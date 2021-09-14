import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { map } from "rxjs/operators"; 
import { Observable, of } from 'rxjs';
import { Employees,EmployeeFitler ,Country} from '../Model/EmployeeSearch';
import { Injectable, Inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EmployeeSearchService {

  EmployeeFilters:EmployeeFitler[] = [];
  CountryList:Country[]=[];
  constructor(private http: HttpClient) { 
  }

  private employeeURL = 'assets/data/employeeList.json';
  private employeefilterURL = 'assets/data/employeeFilter.json';
  private countriesURL = 'assets/data/countries.json';
  
  // Get product list
  GetEmployeeList() : Observable<any> {
   return this.http.get(this.employeeURL).pipe(map((response: Employees[]) => {
       // console.log(response);
        return response;
      }));
   }

   GetEmployeeFilters() : Observable<any> {
    return this.http.get(this.employeefilterURL).pipe(map((response: EmployeeFitler[]) => {
      //   console.log(response);
         this.EmployeeFilters = response;
         return response;
       }));
    }

    GetCountries(URL) : Observable<any> {

      return this.http.get(this.countriesURL).pipe(map((response: Country[]) => {
         //  console.log(response);
           this.CountryList = response;
           return response;
         }));
      }

}
