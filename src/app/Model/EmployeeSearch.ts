export interface Employees
{
    ID: number;
    Name: string;
    Phone: string;
    Email:string;
    Date:string;
    Country:string;
    Company:string;
    AlphaCode:string;
}
  
export interface EmployeeFitler
{

    title:string;
    type:string;
    api:string;
    multiple:boolean;
    countries:Country[];

}

export interface Country{

     Name:string;
     Alpha2Code :string;
     Alpha3Code :string;
     NativeName :string;
     Region:string;
     SubRegion :string;
     Latitude:string;
     Longitude:string;
     Area?:number;
     NumericCode?:number;
     NativeLanguage :string;
     CurrencyCode:string;
     CurrencyName:string;
     CurrencySymbol :string;
     Flag:string;
     FlagPng:string;
}