import { Component, EventEmitter, OnInit, Output,NgModule } from '@angular/core';
import {
  NgModel,NgForm, 
  FormBuilder,
  FormGroup,
  Validators,
  AsyncValidatorFn,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Employees,EmployeeFitler } from 'src/app/Model/EmployeeSearch';
import { EmployeeSearchService } from '../employee-search.service';
import {PhonePipe} from '../phonepipe';


@Component({
  selector: 'employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit {

  EmployeeSearchList:Employees[] = [];
  EmployeeSearchOriginalList:Employees[] = [];
  EmployeeFilters:EmployeeFitler[] = [];
  date = new Date();
  SearchEmployeeForm: FormGroup;
  group =new Array();
  Emp = <Employees>{ };
  
  @Output() emitDetail = new EventEmitter();
  
  constructor( private employeeSearchService :EmployeeSearchService, private route:ActivatedRoute, private fb: FormBuilder) {
   }

  ngOnInit(): void {
debugger;
    this.SearchEmployeeForm = this.fb.group({
      ID:['']
    });

    this.route.queryParams
      .subscribe(params => {
        debugger;
        console.log(params);
        this.Emp.Name =  params.user_name !== undefined ? params.user_name : "";        
        this.Emp.Phone =  params.user_phone !== undefined ? params.user_phone : "";        
        this.Emp.Country =  params.country !== undefined ? params.country : "";
        this.Emp.Date = params.date !== undefined ? params.date : "";
        this.Emp.Email = params.email !== undefined ? params.email : "";
        this.Emp.Company = params.company !== undefined ? params.company : "";
      }
    );

    this.employeeSearchService.GetEmployeeList().subscribe((res)=>{
        this.EmployeeSearchList = res;
        this.EmployeeSearchOriginalList = res;
    });

    this.employeeSearchService.GetEmployeeFilters().subscribe((res)=>{
        this.EmployeeFilters = res;
      
        this.EmployeeFilters.forEach(element => {
        debugger;

        if(element.title.toLowerCase().includes('name'))
        {
          this.SearchEmployeeForm.addControl(element.title, new FormControl(this.Emp.Name));
        }
        else if(element.title.toLowerCase().includes('company'))
        {
          this.SearchEmployeeForm.addControl(element.title, new FormControl(this.Emp.Company));
        }
        else if(element.title.toLowerCase().includes('country'))
        {
          this.SearchEmployeeForm.addControl(element.title, new FormControl(this.Emp.Country.toUpperCase()));
        }
        else if(element.title.toLowerCase().includes('date'))
        {
          var dt = new Date(this.Emp.Date);
          this.SearchEmployeeForm.addControl(element.title, new FormControl(dt));
        }
        else if(element.title.toLowerCase().includes('phone'))
        {
          this.SearchEmployeeForm.addControl(element.title, new FormControl(this.Emp.Phone));
        }
        else if(element.title.toLowerCase().includes('mail'))
        {
          this.SearchEmployeeForm.addControl(element.title, new FormControl(this.Emp.Email));
        }
       
        if(element.type=="dropdown")
        {
            this.employeeSearchService.GetCountries(element.api).subscribe((response)=>{
              element.countries = response.Response;
            });
        }
        });
      });
  }

  SortByNameDesc()
  {
    const descending: any=  this.EmployeeSearchList.sort((a,b) => (a.Name > b.Name ? -1 : 1))
    this.EmployeeSearchList = descending;
  }

  SortByNameAsc()
  {
    const ascending: any= this.EmployeeSearchList.sort((a,b) =>  (a.Name > b.Name ? 1 : -1));
    this.EmployeeSearchList = ascending;
  }

  SortByCountryDesc()
  {
    const descending: any=  this.EmployeeSearchList.sort((a,b) => (a.Country > b.Country ? -1 : 1))
    this.EmployeeSearchList = descending;
  }

  SortByCountryAsc()
  {
    const ascending: any= this.EmployeeSearchList.sort((a,b) =>  (a.Country > b.Country ? 1 : -1));
    this.EmployeeSearchList = ascending;
  }

  SortByCompanyDesc()
  {
    const descending: any=  this.EmployeeSearchList.sort((a,b) => (a.Company > b.Company ? -1 : 1))
    this.EmployeeSearchList = descending;
  }

  SortByCompanyAsc()
  {
    const ascending: any= this.EmployeeSearchList.sort((a,b) =>  (a.Company > b.Company ? 1 : -1));
    this.EmployeeSearchList = ascending;
  }

  FilterHeroes()
  {
  
    var heroeObject = this.SearchEmployeeForm['value'];
    
    this.EmployeeFilters.forEach(element => {
      if(element.title.toLowerCase().includes('name'))
      {
         this.Emp.Name = heroeObject[element.title];
      }
      else if(element.title.toLowerCase().includes('company'))
      {
        this.Emp.Company = heroeObject[element.title];
      }
      else if(element.title.toLowerCase().includes('country'))
      {
        this.Emp.Country = heroeObject[element.title];
      }
      else if(element.title.toLowerCase().includes('date'))
      {
        this.Emp.Date = heroeObject[element.title];
      }
      else if(element.title.toLowerCase().includes('phone'))
      {
        this.Emp.Phone = heroeObject[element.title];
      }
      else if(element.title.toLowerCase().includes('mail'))
      {
        this.Emp.Email = heroeObject[element.title];
      }
    });
    debugger
    this.EmployeeSearchList = this.EmployeeSearchOriginalList;

    if(this.Emp.Name !== undefined && this.Emp.Name.trim() !== '' ) 
    {
      var res = this.EmployeeSearchList.filter(x => x.Name.toLowerCase() === this.Emp.Name.toLowerCase());
      this.EmployeeSearchList = res;
    }
    if (this.Emp.Date !== undefined && this.Emp.Date !== '')
    {
      var dt=new Date(this.Emp.Date);
      dt.setHours(12);

      var day =(dt.getDate() < 10 ? "0"+dt.getDate() : dt.getDate());
      var month =((Number(dt.getMonth())+1)) < 10 ? "0" + ((Number(dt.getMonth())+1)) : ((Number(dt.getMonth())+1));
      var st_dt = day +"-"+ month +"-" +dt.getFullYear();
      var res = this.EmployeeSearchList.filter(x => x.Date  === st_dt);
      this.EmployeeSearchList = res;
    }
    if (this.Emp.Email !== undefined && this.Emp.Email.trim() !== '') 
    {
      var res = this.EmployeeSearchList.filter(x => x.Email.toLowerCase() === this.Emp.Email.toLowerCase());
      this.EmployeeSearchList = res;
    }
    if (this.Emp.Company !== undefined && this.Emp.Company.trim() !== '')
    {
      var res = this.EmployeeSearchList.filter(x => x.Company.toLowerCase() === this.Emp.Company.toLowerCase());
      this.EmployeeSearchList = res;
    }
    if (this.Emp.Country !== undefined && this.Emp.Country.trim() !== '')
    {
      var res = this.EmployeeSearchList.filter(x => x.AlphaCode.toLowerCase() === this.Emp.Country.toLowerCase());
      this.EmployeeSearchList = res;
    }
    if (this.Emp.Phone !== undefined && this.Emp.Phone.trim() !== '') 
    {
      var res = this.EmployeeSearchList.filter(x => x.Phone.toLowerCase() === this.Emp.Phone.toLowerCase());
      this.EmployeeSearchList = res;
    }

    if( (this.Emp.Name !== undefined && this.Emp.Name.trim() !== '' ) 
       || (this.Emp.Date !== undefined && this.Emp.Date !== '')
       || (this.Emp.Email !== undefined && this.Emp.Email.trim() !== '') 
       || (this.Emp.Company !== undefined && this.Emp.Company.trim() !== '')
       || (this.Emp.Country !== undefined && this.Emp.Country.trim() !== '')
       || (this.Emp.Phone !== undefined && this.Emp.Phone.trim() !== '') )
          this.EmployeeSearchList = res;
      else
          this.EmployeeSearchList = this.EmployeeSearchOriginalList;
  }

}